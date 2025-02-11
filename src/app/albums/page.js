'use client';

import DataTable from '@/components/ui/DataTable';
import { deleteAlbum, getAlbums } from '@/services/album.service';
import { formatDateLocale } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Albums = () => {
  // const albumData = [
  //   {
  //     title: 'Abbey Road',
  //     type: 'album',
  //     artist: 'The Beatles',
  //     releaseDate: '1969-09-26',
  //     genres: ['Rock'],
  //     tracks: [
  //       { title: 'Come Together', duration: 259 },
  //       { title: 'Something', duration: 182 },
  //     ],
  //     collaborators: ['George Martin'],
  //     artwork: 'https://via.placeholder.com/150',
  //     duration: 2580,
  //   },
  //   {
  //     title: 'Thriller',
  //     type: 'album',
  //     artist: 'Michael Jackson',
  //     releaseDate: '1982-11-30',
  //     genres: ['Pop', 'Rock', 'R&B'],
  //     tracks: [
  //       { title: 'Thriller', duration: 357 },
  //       { title: 'Beat It', duration: 258 },
  //     ],
  //     collaborators: ['Quincy Jones'],
  //     credits: ['Producer: Quincy Jones', 'Engineer: Bruce Swedien'],
  //     artwork: 'https://via.placeholder.com/150',
  //     duration: 4220,
  //   },
  //   {
  //     title: 'Back in Black',
  //     type: 'album',
  //     artist: 'AC/DC',
  //     releaseDate: '1980-07-25',
  //     genres: ['Hard Rock'],
  //     tracks: [
  //       { title: 'Hells Bells', duration: 312 },
  //       { title: 'Back in Black', duration: 255 },
  //     ],
  //     collaborators: ['Mutt Lange'],

  //     artwork: 'https://via.placeholder.com/150',
  //     duration: 2530,
  //   },
  //   {
  //     title: 'The Dark Side of the Moon',
  //     type: 'album',
  //     artist: 'Pink Floyd',
  //     releaseDate: '1973-03-01',
  //     genres: ['Progressive Rock'],
  //     tracks: [
  //       { title: 'Time', duration: 413 },
  //       { title: 'Money', duration: 382 },
  //     ],
  //     collaborators: ['Alan Parsons'],

  //     artwork: 'https://via.placeholder.com/150',
  //     duration: 2580,
  //   },
  //   {
  //     title: 'Rumours',
  //     type: 'album',
  //     artist: 'Fleetwood Mac',
  //     releaseDate: '1977-02-04',
  //     genres: ['Rock'],
  //     tracks: [
  //       { title: 'Go Your Own Way', duration: 217 },
  //       { title: 'Dreams', duration: 257 },
  //     ],
  //     collaborators: ['Ken Caillat', 'Richard Dashut'],
  //     artwork: 'https://via.placeholder.com/150',
  //     duration: 2580,
  //   },
  // ];

  const generateRandomString = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const [albumData, setAlbumData] = useState([]);
  const [meta, setMeta] = useState({
    limit: undefined,
    page: undefined,
    total: undefined,
    totalPages: undefined,
  });
  const fetchAlbums = async (page) => {
    const data = await getAlbums(page);
console.log(data);

    setAlbumData(data.albums);
    setMeta(data.meta);
  };
  useEffect(() => {
    fetchAlbums();
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
      cell: (info) => info.getValue().name,
    }),
    columnHelper.accessor('releaseDate', {
      header: 'Date de sortie',
      cell: (info) => info.getValue() ? formatDateLocale(info.getValue()) : 'Non renseigné',
    }),
    columnHelper.accessor('genre', {
      header: 'Genres',
      cell: (info) => <span>{info.getValue() ? info.getValue() : 'Non renseigné'}</span>,
    }),
    columnHelper.accessor('audioTracks', {
      header: 'Pistes',
      cell: (info) => info.getValue().length,
    }),
    columnHelper.accessor('collaborators', {
      header: 'Collaborateurs',
      cell: (info) => {
        if (info.getValue()) {
          return (
            <ul>
              {info.getValue().map((collaborator) => (
                <li
                  key={collaborator}
                  className="mr-2"
                >
                  {collaborator}
                </li>
              ))}
            </ul>
          );
        }
        return 'Aucun';
      },
    }),
    columnHelper.accessor('images', {
      header: 'Artwork',
      cell: (info) => (
        <img
          src={info.getValue()[0].path}
          alt="Artwork"
          className="w-10 h-10 object-cover"
        />
      ),
    }),
    columnHelper.accessor('Actions', {
      cell: (info) => (
        <div className="flex gap-1">
          <Link href={`/albums/update/${info.row.original._id}`} className="p-2 bg-green-500 text-white">
            <Pencil size={16} />
          </Link>
          <button
            className="p-2 bg-red-500 text-white"
            onClick={()=>handleDelete(info.row.original._id)}
          >
            <X size={16} />
          </button>
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
