"use client"
import DataTable from '@/components/UI/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Artists = () => {
  const artistsData = [
    { name: 'The Beatles', genres: ['Rock'], images: ['https://via.placeholder.com/150'] },
    { name: 'Michael Jackson', genres: ['Pop', 'Rock', 'R&B'], images: ['https://via.placeholder.com/150'] },
    { name: 'AC/DC', genres: ['Hard Rock'], images: ['https://via.placeholder.com/150'] },
    { name: 'Pink Floyd', genres: ['Progressive Rock'], images: ['https://via.placeholder.com/150'] },
  ];

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Nom',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('genres', {
      header: 'Genres',
      cell: (info) => (
        <ul>
          {info.getValue().map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
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
        href="/albums/create"
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
