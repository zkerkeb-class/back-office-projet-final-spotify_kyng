'use client';

import DataTable from '@/components/UI/DataTable';
import { deleteAlbum, getAlbums, getAlbumsByArtist } from '@/services/album.service';
import { formatDateLocale, getImageUrl } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ConfirmDeleteModal from '@/components/UI/form/ConfirmDeleteModal';
import { getTracksByAlbum } from '@/services/track.service';
import { decodeJWT } from '@/utils';
const Albums = () => {
 const [userRole, setUserRole] = useState('');
  const generateRandomString = () =>
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const [albumData, setAlbumData] = useState(undefined);
  const [meta, setMeta] = useState({
    limit: undefined,
    page: undefined,
    total: undefined,
    totalPages: undefined,
  });
  const fetchAlbums = async (page) => {
    try {
      const data = await getAlbums(page);
      const albumWithTracks = await Promise.all(data.albums.map(async (album) => {
        const tracks = await getTracksByAlbum(album._id);
        album.totalTracks = tracks.meta.total;
        return album;
      }))
      setAlbumData(albumWithTracks);
      setMeta(data.meta);
      
    } catch (error) {
      console.error('Error fetching albums', error);
    }
  };

  const fetchAlbumsByArtist = async (artistId) => {
    try {
      const data = await getAlbumsByArtist(artistId);
      const albumWithTracks = await Promise.all(data.albums.map(async (album) => {
        const tracks = await getTracksByAlbum(album._id);
        album.totalTracks = tracks.meta.total;
        return album;
      }))
      setAlbumData(albumWithTracks);
      setMeta(data.meta);
    } catch (error) {
      console.error('Error fetching albums', error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const decoded = decodeJWT(token);
    setUserRole(decoded.role);
    if (decoded.role === 'admin') {
      fetchAlbums();
    } 
    fetchAlbumsByArtist(decoded.id);
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await deleteAlbum(id);
      console.log(data);
      fetchAlbums();
      console.log('Deleting album with id : ', id);
    } catch (error) {
      console.error('Error deleting album', error);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('title', {
      header: 'Titre',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('artistId', {
      header: 'Artiste',
      cell: (info) => info.getValue()?.name || 'Artist Spotify',
    }),
    columnHelper.accessor('releaseDate', {
      header: 'Date de sortie',
      cell: (info) => (info.getValue() ? formatDateLocale(info.getValue()) : 'Non renseigné'),
    }),
    columnHelper.accessor('totalTracks', {
      header: 'Pistes',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('images', {
      header: 'Artwork',
      cell: (info) => {
        return (
          <Image
            src={getImageUrl(info.getValue()[0].path)}
            alt="Artwork"
            className="w-10 h-10 object-cover"
            width={40}
            height={40}
          />
        );
      },
    }),
    columnHelper.accessor('Actions', {
      cell: (info) => (
        <div className="flex gap-1">
          <Link
            href={`/albums/update/${info.row.original._id}`}
            className="p-2 bg-green-500 text-white"
          >
            <Pencil size={16} />
          </Link>
          <ConfirmDeleteModal
            title={`Vous êtes sur le point de supprimer l'album "${info.row.original.title}" de ${info.row.original.artistId?.name||'Artist Spotify'}`}
            onConfirm={() => handleDelete(info.row.original._id)}
          />
        </div>
      ),
    }),
  ];

  const handlePrevious = () => {
    setMeta((prev) => {
      fetchAlbums(prev.page - 1);
      return { ...prev, page: prev.page - 1 };
    });
  };

  const handleNext = () => {
    setMeta((prev) => {
      fetchAlbums(prev.page + 1);
      return { ...prev, page: prev.page + 1 };
    });
  };

  if (albumData === undefined) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-6xl">Gestion des albums</h1>
        <Link
          href="/albums/create"
          className="bg-black text-white p-2 h-min rounded-md"
        >
          Ajouter un album
        </Link>
      </div>
      {albumData.length === 0 && (
        <p className="text-center text-xl">Aucun album trouvé</p>
      )}
      <DataTable
        data={albumData}
        columns={columns}
      />

      <div className="flex justify-center mt-4">
        <button
          className="p-2 bg-gray-300 rounded-l-md disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={meta.page === 1}
        >
          Précédent
        </button>
        <span className="p-2">{meta.page}</span>
        <button
          className="p-2 bg-gray-300 rounded-r-md disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={meta.page === meta.totalPages}
        >
          Suivant
        </button>
      </div>
    </>
  );
};

export default Albums;
