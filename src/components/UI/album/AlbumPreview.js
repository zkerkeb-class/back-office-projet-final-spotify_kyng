'use client';

import DataTable from '@/components/UI/DataTable';
import { formatDuration, formatLongText } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, X } from 'lucide-react';
import Image from 'next/image';

const AlbumPreview = ({ album, onBack, onPublish }) => {
  const columnHelper = createColumnHelper();

  const tracksColumns = [
    columnHelper.accessor('trackNumber', {
      header: 'N°',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('title', {
      header: 'Titre',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('isExplicit', {
      header: 'Explicite',
      cell: (info) => (
        <input
          type="checkbox"
          checked={info.getValue()}
          readOnly
        />
      ),
    }),
    columnHelper.accessor('lyrics', {
      header: 'Paroles',
      cell: (info) => formatLongText(info.getValue()),
    }),
    columnHelper.accessor('credits', {
      header: 'Crédits',
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
    columnHelper.accessor('numberOfListens', {
      header: 'Nombre d\'écoutes',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('popularity', {
      header: 'Popularité',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('audioLink', {
      header: 'Lien audio',
      cell: (info) => (
        info.getValue()
      ),
    }),
    columnHelper.accessor('Actions', {
      cell: (info) => (
        <div className="flex gap-1">
          <button className="p-2 bg-blue-500 text-white">
            <Pencil size={16} />
          </button>
          <button className="p-2 bg-red-500 text-white">
            <X size={16} />
          </button>
        </div>
      ),
    }),
  ];

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Prévisualisation de l'album</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p>
            <strong>Titre:</strong> {album.title}
          </p>
          <p>
            <strong>Artiste:</strong> {album.artist}
          </p>
          <p>
            <strong>Date de sortie:</strong> {album.releaseDate}
          </p>
          <p>
            album.genre
            {/* <strong>Genres:</strong> {album.genres.join(', ')} */}
          </p>
          <p>
            <strong>Collaborateurs: </strong>
            {album.collaborators ? album.collaborators.join(', ') : 'Aucun'}
          </p>
          <div>
            <strong>Artwork:</strong>
            {album.artwork && (
              <Image
                src={`http://localhost:3000${album.artwork[0]}`}
                alt="Album Artwork"
                width={200}
                height={200}
              />
            )}{' '}
          </div>
          <p>
            <strong>Durée:</strong> {formatDuration(album.duration)}
          </p>
        </div>
        {album.audioTracks && (
          <div>
            <h4 className="text-xl font-semibold mb-2">Titres</h4>
            <DataTable
              data={album.audioTracks}
              columns={tracksColumns}
            />
          </div>
        )}
        <div className="flex justify-end space-x-4 p-4">
          <button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            Retour à l'édition
          </button>
          <button
            type="button"
            onClick={onPublish}
          >
            Publier l'album
          </button>
        </div>
      </div>
    </>
  );
};

export default AlbumPreview;
