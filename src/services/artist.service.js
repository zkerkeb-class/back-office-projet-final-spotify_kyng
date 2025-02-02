export const getArtists = async (page, limit = 10) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist?page=${page || 1}&limit=${limit}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching artists', error);
    }
}