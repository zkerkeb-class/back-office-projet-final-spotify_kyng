'use client';

import DataTable from '@/components/UI/DataTable';
import { formatDuration } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { FileAudio, Pencil, X } from 'lucide-react';

const AlbumPreview = ({ album }) => {
  const columnHelper = createColumnHelper();

  const tracksColumns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('titre', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('duree', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('id_Album', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('explicit', {
      cell: (info) => (
        <input
          type="checkbox"
          checked={info.getValue()}
          readOnly
        />
      ),
    }),
    columnHelper.accessor('paroles', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('id_Artiste', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('credit', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('nb_ecoute', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('popularite', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('audio', {
      cell: (info) => (
        <audio
          src={info.getValue()}
          className="flex gap-1"
        >
          <FileAudio size={16} /> Ecouter
        </audio>
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
        <div>
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
            <strong>Genres:</strong> {album.genres.join(', ')}
          </p>
          <p>
            <strong>Collaborateurs: </strong>
            {album.collaborators.length ? album.collaborators.join(', ') : 'Aucun'}
          </p>
          <div>
            <strong>Artwork:</strong>
          </div>
          <p>
            <strong>Durée:</strong> {formatDuration(album.duration)}
          </p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-2">Titres</h4>
          {album.audioData && (
            <DataTable
              data={album.audioData}
              columns={tracksColumns}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AlbumPreview;
