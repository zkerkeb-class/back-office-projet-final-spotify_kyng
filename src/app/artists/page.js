"use client"
import DataTable from '@/components/ui/DataTable';
import { getArtists } from '@/services/artist.service';
import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Artists =  () => {
const [artistsData, setArtistsData] = React.useState([]);
React.useEffect(() => {
  const fetchArtists = async () => {
    const data = await getArtists();
    console.log(data);
    
    setArtistsData(data.artists);
  }
  fetchArtists();
}, []);
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Nom',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('genres', {
      header: 'Genres',
      cell: (info) => (
        <span>{info.getValue() ? info.getValue(): "Non renseigné"}</span>
      ),
    }),
    columnHelper.accessor('images', {
      header: 'Images',
      cell: (info) => (
        <ul>
          {info.getValue().map((image) => (
            <li key={image}>
              <img
                src={image}
                alt="Artwork"
                className="w-10 h-10 object-cover"
              />
            </li>
          ))}
        </ul>
      ),
    }),
    columnHelper.accessor('Actions', {
        cell: (info) => (
          <div className="flex gap-1">
            <button className="p-2 bg-green-500 text-white">
              <Pencil size={16} />
            </button>
            <button className="p-2 bg-red-500 text-white">
              <X size={16} />
            </button>
          </div>
        ),
      }),];
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
  )
};

export default Artists;
