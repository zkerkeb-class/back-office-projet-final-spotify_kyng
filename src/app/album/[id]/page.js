'use client';

import { useParams } from 'next/navigation';
import { fakeData } from '../../search-and-filter/page';

const AlbumPage = () => {
  const params = useParams();
  const id = params?.id;
  const album = fakeData.find((item) => item.id.toString() === id);

  if (!album) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500">Album introuvable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">{album.title}</h1>
        <div className="space-y-4 text-gray-600">
          <p><span className="font-medium">Artiste :</span> {album.artist}</p>
          <p><span className="font-medium">Album :</span> {album.album}</p>
          <p><span className="font-medium">Genre :</span> {album.genre}</p>
          <p><span className="font-medium">Année :</span> {album.year}</p>
          <p><span className="font-medium">Durée :</span> {album.duration} secondes</p>
          <p><span className="font-medium">Popularité :</span> {album.popularity}</p>
          <p><span className="font-medium">Playlist :</span> {album.playlist}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
