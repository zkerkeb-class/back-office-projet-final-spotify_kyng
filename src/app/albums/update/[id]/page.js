'use client';
import AlbumForm from '@/components/UI/album/AlbumForm';
import { getAlbumById } from '@/services/album.service';
import { getTracksByAlbum } from '@/services/track.service';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const UpdateAlbum = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [album, setAlbum] = useState(undefined);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    if (!id) return;

    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const albumData = await getAlbumById(id);
        setAlbum(albumData);
        console.log(albumData);

        const response = await getTracksByAlbum(id);
        setTracks(response.tracks || []);
      } catch (err) {
        setError('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <span className="text-xl animate-spin">Chargement...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl py-4">{error}</div>;
  }

  if (!album) {
    return <div className="text-gray-400 text-center text-xl py-4">Album introuvable.</div>;
  }

  return (
    <>
      <h1 className="font-bold text-6xl">Modification d'un album</h1>
      <AlbumForm
        isEditing
        albumData={{
          title: album.title || '',
          artistId: album.artistId || '',
          releaseDate: album.releaseDate || '',
          genre: album.genre || '',
          image: album.images[0] || undefined,
          duration: album.duration || 0,
          audioTracks: tracks || [],
        }}
        onCancel={() => router.back()}
      />
    </>
  );
};

export default UpdateAlbum;
