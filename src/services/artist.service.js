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
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting artist', error);
    }
}