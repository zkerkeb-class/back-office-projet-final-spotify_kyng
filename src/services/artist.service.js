export const getArtists = async (page, limit = 10) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist?page=${page || 1}&limit=${limit}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching artists', error);
    }
}

export const deleteArtist = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting artist', error);
    }
}

export const createArtist = async (artist) => {
    try {
        const formData = new FormData();
        formData.append('name', artist.name);
        formData.append('genres', artist.genres);
        formData.append('image', artist.images);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating artist', error);
    }
}