'use client';
import DataTable from '@/components/ui/DataTable';
import ConfirmDeleteModal from '@/components/UI/form/ConfirmDeleteModal';
import { deleteArtist, getArtists } from '@/services/artist.service';
import { getImageUrl } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Artists = () => {
  const [artistsData, setArtistsData] = React.useState([]);
  const fetchArtists = async () => {
    const data = await getArtists();
    setArtistsData(data.artists);
  };
  React.useEffect(() => {
    fetchArtists();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await deleteArtist(id);
      console.log(data);
      fetchArtists();
      console.log('Deleting artist with id : ', id);
    } catch (error) {
      console.error('Error deleting artist', error);
    }
  };

  console.log({ artistsData });

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Nom',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('genres', {
      header: 'Genres',
      cell: (info) => <span>{info.getValue() ? info.getValue() : 'Non renseigné'}</span>,
    }),
    columnHelper.accessor('images', {
      header: 'Images',
      cell: (info) => (
        <Image
          src={getImageUrl(info.getValue()[0].path)}
          alt="Artwork"
          className="w-10 h-10 object-cover"
          width={40}
          height={40}
        />
      ),
    }),
    columnHelper.accessor('Actions', {
      cell: (info) => (
        <div className="flex gap-1">
          <Link
            href={`/artists/update/${info.row.original._id}`}
            className="p-2 bg-green-500 text-white"
          >
            <Pencil size={16} />
          </Link>
          <ConfirmDeleteModal
            title={`Vous êtes sur le point de supprimer l'artiste ${info.row.original.name}`}
            onConfirm={() => handleDelete(info.row.original._id)}
          />
        </div>
      ),
    }),
  ];
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-6xl">Gestion des artistes</h1>
        <Link
          href="/artists/create"
          className="bg-black text-white p-2 h-min rounded-md"
        >
          Ajouter un(e) artiste
        </Link>
      </div>
      <DataTable
        data={artistsData}
        columns={columns}
      />
    </>
  );
};

export default Artists;
