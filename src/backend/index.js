const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const http = require('http');
const socketIo = require('socket.io');
const mm = require('music-metadata'); // Pour métadonnées audio
const { imageSize } = require('image-size'); // Pour métadonnées d'images

// Spécifie explicitement le chemin de ffmpeg
ffmpeg.setFfmpegPath('C:\\ffmpeg\\ffmpeg-master-latest-win64-lgpl\\bin\\ffmpeg.exe');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Configuration de Multer pour le stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads', file.mimetype.startsWith('image') ? 'images' : 'audio');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtrage des fichiers acceptés
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'audio/mpeg', 'audio/wav', 'audio/m4a'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Fichier non supporté'), false);
  }
};

// Limite de taille des fichiers
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50 Mo
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Permet d'accéder aux fichiers dans le dossier "uploads"

// Fonction de validation des dimensions d'image
const validateImageDimensions = (file) => {
  const { width, height } = imageSize(file.path);
  console.log('Dimensions de l\'image :', { width, height });
  const minWidth = 800;
  const minHeight = 600;

  if (width < minWidth || height < minHeight) {
    return `Dimensions insuffisantes. La largeur et la hauteur doivent être au moins de ${minWidth}px et ${minHeight}px.`;
  }
  return null; // Pas d'erreur si les dimensions sont suffisantes
};

// Route d'upload
app.post('/upload', upload.array('file', 10), async (req, res) => {
  try {
    const files = req.files;
    const convertedFiles = [];
    const validationErrors = [];

    // Traitement de chaque fichier uploadé
    for (const file of files) {
      let isValid = true;

      // Validation des images
      if (file.mimetype.startsWith('image')) {
        const errorMessage = validateImageDimensions(file);
        if (errorMessage) {
          validationErrors.push(`${file.originalname} : ${errorMessage}`);
          isValid = false;
        }
      }

      // Validation des fichiers audio
      if (file.mimetype.startsWith('audio')) {
        const metadata = await mm.parseFile(file.path);
        console.log('Métadonnées audio :', metadata);

        if (metadata.format.duration > 300) { // Exemple : durée maximale de 5 minutes
          validationErrors.push(`${file.originalname} : Durée trop longue (${Math.round(metadata.format.duration)} secondes).`);
          isValid = false;
        }
      }

      if (!isValid) {
        fs.unlinkSync(file.path); // Supprime les fichiers invalides
        continue; // Passe au fichier suivant
      }

      // Traitement des fichiers valides
      if (file.mimetype.startsWith('image')) {
        const filePath = file.path;
        const outputFormats = ['webp', 'jpeg', 'avif'];
        const sizes = { thumbnail: 100, medium: 300, large: 600 };

        for (const size in sizes) {
          for (const format of outputFormats) {
            const outputFileName = `${path.basename(file.filename, path.extname(file.filename))}_${size}.${format}`;
            const outputFilePath = path.join(path.dirname(filePath), outputFileName);

            await sharp(filePath)
              .resize(sizes[size])
              .toFormat(format)
              .toFile(outputFilePath);

            convertedFiles.push(`/uploads/images/${outputFileName}`);
          }
        }
      } else if (file.mimetype.startsWith('audio')) {
        const outputFileName = `${path.basename(file.filename, path.extname(file.filename))}.wav`;
        const outputFilePath = path.join(__dirname, 'uploads', 'audio', outputFileName);

        await new Promise((resolve, reject) => {
          ffmpeg(file.path)
            .toFormat('wav')
            .on('progress', (progress) => {
              const percentage = Math.round(progress.percent || 0);
              io.emit('conversion-progress', { fileName: file.filename, progress: percentage });
            })
            .on('end', () => {
              io.emit('conversion-status', { fileName: file.filename, status: 'Conversion terminée' });
              resolve();
            })
            .on('error', (err) => {
              io.emit('conversion-status', { fileName: file.filename, status: 'Erreur dans la conversion' });
              reject(err);
            })
            .save(outputFilePath);
        });

        convertedFiles.push(`/uploads/audio/${outputFileName}`);
      }
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Certaines erreurs de validation sont survenues.',
        errors: validationErrors,  // Renvoie les erreurs spécifiques
        files: convertedFiles,
      });
    }

    res.json({
      message: 'Fichiers téléchargés et convertis avec succès.',
      files: convertedFiles,
    });
  } catch (error) {
    console.error('Erreur pendant l\'upload :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
});

io.on('connection', (socket) => {
  socket.emit('conversion-status', { fileName: 'file.mp3', status: 'Connexion établie' });

  // Logique de réception des événements et de gestion du statut
  socket.on('start-conversion', (fileName) => {
    socket.emit('conversion-status', { fileName: fileName, status: 'Conversion en cours' });
  });
});

// Démarrer le serveur
server.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
