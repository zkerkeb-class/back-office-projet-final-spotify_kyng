'use client';

import DataTable from '@/components/UI/DataTable';
import ImagePreview from '@/components/upload/ImagePreview';
import { capitalize, formatDuration, formatLongText, getImageUrl } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, Play, X } from 'lucide-react';
import Image from 'next/image';
import ConfirmDeleteModal from '../form/ConfirmDeleteModal';
import TrackForm from './TrackForm';
import { deleteTrack } from '@/services/track.service';

const AlbumPreview = ({ album,setAlbum, onBack, onPublish, isEditing }) => {
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
            const credits = info.getValue();
            delete credits._id;
            return (
            <ul>
              {Object.entries(credits).map(([role, name]) => (
              <li key={role} className="mr-2">
              <strong>{capitalize(role)}:</strong> {name}
              </li>
              ))}
            </ul>
            );
        }
        return 'Aucun';
      },
    }),
    columnHelper.accessor('numberOfListens', {
      header: "Nombre d'écoutes",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('popularity', {
      header: 'Popularité',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('Actions', {
      cell: (info) => (
        <div className="flex gap-1">
      
          <TrackForm
      isEditing={true}
      currentTrack={info.row.original}
      tracks={album.audioTracks}
      
        onTracksChange={(tracks) => setAlbum({ ...album, audioTracks: tracks })}
      />
          <ConfirmDeleteModal
            title={`Vous êtes sur le point de supprimer le titre "${info.row.original.title}" de l'album ${album.title? `"${album.title}"` : "Non défini"}`}
            onConfirm={() => handleDelete(info.row.original)}
          />
        </div>
      ),
    }),
  ];

  const handleDelete = (track) => {
    if (isEditing){
      deleteTrack(track._id);
      return;
    }
    setAlbum({
      ...album,
      audioTracks: album.audioTracks.filter((t) => t.trackNumber !== track.trackNumber),
    });
  }
  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Prévisualisation de l'album</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p>
            <strong>Titre:</strong> {album.title || 'Non défini'}
          </p>
          <p>
            <strong>Artiste:</strong> {album.artistName || 'Non défini'}
          </p>
          <p>
            <strong>Date de sortie:</strong> {album.releaseDate || 'Non défini'}
          </p>
          <p>
            <strong>Collaborateurs: </strong>
            {album.collaborators ? album.collaborators.join(', ') : 'Aucun'}
          </p>
          <div className="flex flex-col items-start space-y-4">
            <strong>Artwork:</strong>
            {album.artwork && (
              <Image
                src={`${album.artwork[0]}`}
                alt="Album Artwork"
                width={200}
                height={200}
              />
            )}
            {!isEditing && album.image && (
              <ImagePreview
                src={URL.createObjectURL(album.image)}
                name={album.image.name}
                size={200}
              />
            )}
            {isEditing && album.image && (
              <ImagePreview
                src={getImageUrl(album.image.path)}
                name={`Artwork - ${album.title}`}
                size={200}
              />
            )}
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
