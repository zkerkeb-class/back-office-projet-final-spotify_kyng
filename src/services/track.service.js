export const createTrack = async (trackData, albumId, artistId) => {
  try {
    const formData = new FormData();
    formData.append('title', trackData.title);
    formData.append('duration', trackData.duration);
    formData.append('isExplicit', trackData.isExplicit);
    formData.append('lyrics', trackData.lyrics|| "Lyrics not available");
    formData.append('numberOfListens', trackData.numberOfListens);
    formData.append('popularity', trackData.popularity);
    formData.append('files', trackData.audioLink);
    formData.append('trackNumber', trackData.trackNumber);
    formData.append('albumId', albumId);
    formData.append('artistId', artistId);
    formData.append("releaseYear", trackData.releaseYear||2021);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/track/${albumId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating track', error);
  }
};

export const getTracksByAlbum = async (albumId) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/track/album/${albumId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching artist by ID', error);
  }
};
