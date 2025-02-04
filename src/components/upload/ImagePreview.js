const ImagePreview = ({ src, name, size }) => {
  // Vérification si 'name' est défini avant d'exécuter la méthode 'split'
  const fileExtension = name ? name.split('.').pop() : 'unknown';

  return (
    <div className="flex flex-col items-center">
      <img src={src} alt={name} className={`w-${size} h-${size} object-cover`} />
      <p className="text-sm text-gray-500">{name}</p>
      <p className="text-sm text-gray-400">Extension : {fileExtension}</p>
    </div>
  );
};

export default ImagePreview;
