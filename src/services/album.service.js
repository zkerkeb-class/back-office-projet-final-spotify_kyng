export const getAlbums = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/album`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching albums', error);
    }
}