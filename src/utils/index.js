export const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return `${hours ? `${hours} h` : ``}  ${minutes} m`;
};

export const formatReleaseDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateLocale = (date) => new Date(date).toLocaleDateString();

export const formatLongText = (text, maxLength = 100) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export const getImageUrl = (image) => {
  if (typeof image !== 'string' || image.split('/').pop() === 'undefined')
    return 'https://placehold.co/200x200/jpeg';
  return `${process.env.NEXT_PUBLIC_API_URL}/images/image/${image.split('/').pop()}`;
};
