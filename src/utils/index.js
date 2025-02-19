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

export const genres = [
  'Classical',
  'Opera',
  'Jazz',
  'Blues',
  'Country',
  'Rock',
  'Hard Rock',
  'Soft Rock',
  'Alternative',
  'Indie',
  'Grunge',
  'Metal',
  'Heavy Metal',
  'Pop',
  'Synthpop',
  'K-Pop',
  'J-Pop',
  'C-Pop',
  'Hip Hop',
  'Rap',
  'Trap',
  'Lo-fi',
  'R&B',
  'Soul',
  'Funk',
  'Reggae',
  'Dancehall',
  'Electronic',
  'EDM',
  'House',
  'Techno',
  'Trance',
  'Dubstep',
  'Ambient',
  'World',
  'Afrobeat',
  'Latin',
  'Salsa',
  'Merengue',
  'Reggaeton',
  'Bachata',
  'Flamenco',
  'Bollywood',
  'Traditional',
  'Gospel',
  'Spiritual',
  'Choral',
  'New Age',
  'Raï',
  'Chaâbi',
  'Tarab',
  'Mawal',
  'Andalous',
  'Gnawa',
  'Khaliji',
  'Shaabi',
  'Dabke',
  'Zaffa',
  'Taqsim',
  'Arabesque',
  'Maghreb Fusion',
  'Mizmar',
  'Mijwiz',
  'Nubian',
  'Bedouin',
  'Sufi',
  'Mouwachah',
  'Samai',
  'Qasida',
  'Malhoun',
  'Zajal',
  'Baladi',
];
