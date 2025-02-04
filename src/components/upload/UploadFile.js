import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import io from 'socket.io-client';
import ProgressBar from '../UI/ProgressBar';
import AudioPreview from '../upload/AudioPreview';
import ImagePreview from '../upload/ImagePreview';

const socket = io('http://localhost:3000');

const UploadFile = ({getUploadedFiles}) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionStatus, setConversionStatus] = useState(''); // Statut de la conversion
  const [conversionFileName, setConversionFileName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [startTime, setStartTime] = useState(null); // Temps de début de l'upload
  const [lastUploaded, setLastUploaded] = useState(0); // Dernier point de données téléchargées
  const [totalSize, setTotalSize] = useState(0); // Taille totale des fichiers à uploader

  // Fonction pour obtenir la taille d'image
  const getImageSize = (filePath) => {
    if (filePath.includes('thumbnail')) {
      return 'Thumbnail';
    } else if (filePath.includes('large')) {
      return 'Large';
    } else if (filePath.includes('medium')) {
      return 'Medium';
    }
    return 'Unknown Size';
  };

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: 'image/*,audio/*',
    onDrop: () => {
      setUploadError(null);
      setValidationErrors([]);
    }
  });

  const handleUpload = async () => {
    if (acceptedFiles.length === 0) {
      setUploadError('Aucun fichier sélectionné');
      return;
    }

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
      setTotalSize((prevSize) => prevSize + file.size); // Ajout de la taille totale des fichiers
    });

    try {
      setUploading(true);
      setProgress(0);
      setStartTime(Date.now()); // Enregistrer le temps de début de l'upload

      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);

          // Calculer la vitesse de téléchargement et estimer le temps restant
          const elapsedTime = (Date.now() - startTime) / 1000; // Temps écoulé en secondes
          if (elapsedTime <= 0) return; // Si le temps écoulé est trop court (évite les divisions par 0)

          const bytesUploaded = progressEvent.loaded;
          const uploadSpeed = bytesUploaded / elapsedTime; // Vitesse en bytes par seconde
          const remainingBytes = totalSize - bytesUploaded;
          const remainingTimeEstimate = remainingBytes / uploadSpeed; // Temps restant en secondes
          
          // Ne pas afficher de temps négatif
          if (remainingTimeEstimate > 0) {
            setRemainingTime(remainingTimeEstimate); // Mettre à jour le temps restant estimé
          } else {
            setRemainingTime(0); // Si le temps restant est négatif, afficher 0
          }

          setLastUploaded(bytesUploaded); // Sauvegarder la dernière quantité téléchargée
        },
      });

      setUploadedFiles(response.data.files);
      getUploadedFiles(response.data.files);
      setProgress(100); // Upload terminé
      setUploadError(null); // Réinitialiser l'erreur en cas de succès
      setValidationErrors([]); // Réinitialiser les erreurs de validation
      console.log('Fichiers téléchargés avec succès:', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      if (error.response && error.response.status === 400) {
        const errors = error.response.data.errors || [];
        setUploadError(`Erreur d'upload : ${errors.join(', ')}`);
        setValidationErrors(errors);
      } else {
        setUploadError('Erreur inconnue lors de l\'upload.');
      }
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    socket.on('conversion-progress', (data) => {
      console.log(`Progression de la conversion pour ${data.fileName}: ${data.progress}%`);
      if (data.progress <= 100) {
        setConversionProgress(data.progress);
        setConversionFileName(data.fileName);
      }
    });

    socket.on('conversion-status', (data) => {
      console.log(`Statut de la conversion pour ${data.fileName}: ${data.status}`);
      setConversionStatus(data.status); // Mettre à jour le statut de la conversion
    });

    socket.on('upload-progress', (data) => {
      console.log(`Progression de l'upload: ${data.progress}%`);
      setProgress(data.progress);
    });

    return () => {
      socket.off('conversion-progress');
      socket.off('conversion-status'); // Désactiver l'écouteur de statut de conversion
      socket.off('upload-progress');
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-8">
      <div {...getRootProps()} className="p-8 bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl hover:bg-gray-700 transition-all cursor-pointer shadow-lg">
        <input {...getInputProps()} />
        <p className="text-center text-gray-400">Glissez et déposez des fichiers ici, ou cliquez pour sélectionner des fichiers</p>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-lg">Fichiers sélectionnés :</h4>
          <ul className="list-disc pl-6 text-gray-300">
            {acceptedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Erreur d'upload */}
      {uploadError && (
        <div className="mt-4 p-4 bg-red-600 text-white rounded-md">
          <h4 className="font-semibold">Erreur :</h4>
          <p>{uploadError}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-6 py-2 px-6 bg-blue-600 text-white rounded-lg disabled:bg-gray-500"
      >
        {uploading ? `Téléchargement (${progress}%)` : 'Télécharger'}
      </button>

      {/* Affichage de la barre de progression */}
      {uploading && <ProgressBar progress={progress} />}

      {/* Affichage du temps restant estimé */}
      {remainingTime !== null && (
        <div className="mt-4 text-gray-300">
          <p>Temps restant estimé : {Math.floor(remainingTime / 60)}m {Math.floor(remainingTime % 60)}s</p>
        </div>
      )}

      {/* Affichage du statut de la conversion */}
      {conversionStatus && (
        <div className="mt-4 text-gray-300 conversion-status">
          <p>Statut de la conversion : {conversionStatus}</p>
        </div>
      )}

      {/* Affichage des fichiers téléchargés */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {uploadedFiles.map((file, index) => (
            <div key={index}>
              {file.includes('/audio/') ? (
                <AudioPreview src={`http://localhost:3000${file}`} />
              ) : (
                <ImagePreview 
                  src={`http://localhost:3000${file}`} 
                  name={file.split('/').pop()} // Prendre le nom du fichier dans le chemin
                  size={getImageSize(file)} // Passer la taille (utilise une fonction pour obtenir la taille)
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadFile;
