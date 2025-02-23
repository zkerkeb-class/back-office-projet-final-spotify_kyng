'use client';
import ArtistForm from '@/components/UI/album/ArtistForm';
import { createArtist } from '@/services/artist.service';
import { useRouter } from 'next/navigation';

const CreateArtist = () => {
  const router = useRouter();
  const handleSubmit = (artist) => {
    createArtist(artist).then((data) => {
      if (data.error) {
        alert("Erreur lors de la création de l'artiste");
        return;
      }

      alert('Artist créé avec succès');
      router.push('/artists');
    });
  };
  return (
    <>
      <h1 className="font-bold text-6xl">Création d'un(e) artiste</h1>
      <ArtistForm
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default CreateArtist;
