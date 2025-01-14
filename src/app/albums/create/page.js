"use client";
import AlbumForm from "@/components/UI/album/AlbumForm";
import { useRouter } from "next/navigation";

const CreateAlbum = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="font-bold text-6xl">Création d'un album</h1>
      <AlbumForm onCancel={() => router.back()} />
    </>
  );
};

export default CreateAlbum;
