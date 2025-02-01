export const getAlbums = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/album`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching albums', error);
    }
}

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
}