export const getAlbums = async (page, limit = 10) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/album?page=${page || 1}&limit=${limit}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching albums', error);
  }
};

export const createAlbum = async (album) => {
  try {
    //convert album object to FormData
    const formData = new FormData();
    formData.append('title', album.title);
    formData.append('artistId', album.artistId);
    formData.append('releaseDate', album.releaseDate);
    formData.append('genre', album.genre);
    formData.append('duration', album.duration);
    formData.append('image', album.image);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/album/${album.artistId}`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating album', error);
  }
};

export const deleteAlbum = async (albumId) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/album/${albumId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting album', error);
  }
};

export const updateAlbum = async (album) => {
  try {
    const formData = new FormData();
    formData.append('title', album.title);
    formData.append('artistId', album.artistId);
    formData.append('releaseDate', album.releaseDate);
    formData.append('genre', album.genre);
    formData.append('duration', album.duration);
    formData.append('image', album.image);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/album/${album.id}`, {
      method: 'PUT',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating album', error);
  }
};

export const getAlbumById = async (id) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/album/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching album by id', error);
  }
};