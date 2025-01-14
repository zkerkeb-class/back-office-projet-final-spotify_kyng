"use client";
import ArtistForm from "@/components/UI/album/ArtistForm";
import { useRouter } from "next/navigation";

const CreateArtist = () => {
  const router = useRouter();
  const handleSubmit = (artist) => {
    console.log(artist);
  };
  return (
    <>
      <h1 className="font-bold text-6xl">Création d'un(e) artiste</h1>
      <ArtistForm onSubmit={handleSubmit} onCancel={() => router.back()} />
    </>
  );
};

export default CreateArtist;
