export const getArtists = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching top artists', error);
    }
}