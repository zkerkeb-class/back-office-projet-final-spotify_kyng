'use client';
import ArtistForm from '@/components/UI/album/ArtistForm';
import { getArtistById, updateArtist } from '@/services/artist.service';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const UpdateArtist = () => {
    const { id } = useParams();
    const [artistData, setArtistData] = useState(undefined);
    const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSubmit = (artist) => {
    updateArtist(artist,id).then((data) => {
      if (data.error) {
        alert("Erreur lors de la modification de l'artiste");
        return;
      }

      alert('Artiste modifié avec succès');
      router.push('/artists');
    });
  };

  const fetchArtist = async () => {
    try {
      const artistData = await getArtistById(id);
      setArtistData(artistData);
    } catch (err) {
      setError('Erreur lors du chargement des données.');
    } finally {
      setLoading(false);
    }
  }




  useEffect(() => {
    if (!id) return;
fetchArtist();
  }, [id]);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1 className="font-bold text-6xl">Modification d'un(e) artiste</h1>
      <ArtistForm
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isEditing={true}
        artistData={{
          name: artistData?.name,
          genres: artistData?.genres,
          images: artistData?.imageUrls,
        }}
      />
    </>
  );
};

export default UpdateArtist;
