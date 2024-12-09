'use client';

import { useState } from 'react';
import AlbumPreview from './AlbumPreview';
import { formatDuration } from '@/utils';
import TrackList from './TrackList';
import Input from '@/components/UI/form/Input';
import Select from '../form/Select';

function AlbumForm({ onCancel }) {
  const [isPreview, setIsPreview] = useState(false);
  const [album, setAlbum] = useState({
    title: '',
    type: 'album',
    artist: '',
    releaseDate: '',
    genres: [],
    tracks: [],
    collaborators: [],
    credits: [],
    artwork: null,
    duration: 0,
  });
  const genres = [
    'Rock',
    'Pop',
    'Rap',
    'Jazz',
    'Blues',
    'Reggae',
    'Classique',
    'Electro',
    'RnB',
    'Metal',
    'Folk',
    'Country',
    'Disco',
    'Funk',
    'Soul',
    'Punk',
    'Hip-Hop',
    'Techno',
    'House',
    'Dance',
    'Trance',
    'Dubstep',
    'Drum & Bass',
    'Chill',
    'Ambient',
    'Reggaeton',
    'Ska',
    'Gospel',
    'Indie',
    'Alternative',
    'Grunge',
    'Hardcore',
    'Emo',
    'Screamo',
    'Post-Rock',
    'Post-Punk',
    'Post-Hardcore',
    'Metalcore',
    'Deathcore',
    'Mathcore',
    'Doom',
    'Stoner',
    'Sludge',
    'Thrash',
    'Black Metal',
    'Death Metal',
    'Power Metal',
    'Progressive Metal',
    'Symphonic Metal',
    'Folk Metal',
    'Viking Metal',
    'Pagan Metal',
    'Gothic Metal',
    'Industrial Metal',
    'Nu Metal',
    'Rap Metal',
    'Rapcore',
    'Grindcore',
    'Metalcore',
    'Deathcore',
    'Math',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    console.log('Album soumis:', { album });
  };
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const newTracks = [...album.tracks];
    const [removed] = newTracks.splice(sourceIndex, 1);
    newTracks.splice(targetIndex, 0, removed);
    // reset trackNumber
    newTracks.forEach((track, index) => {
      track.trackNumber = index + 1;
    });
    setAlbum({ ...album, tracks: newTracks });
  };

  if (isPreview) {
    return (
      <AlbumPreview
        album={album}
        onBack={() => setIsPreview(false)}
        onPublish={handleSubmit}
      />
    );
  }

  console.log({ album });

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="space-y-4">
        <Input
          label="Titre de l'album"
          id="title"
          value={album.title}
          onChange={(e) => setAlbum({ ...album, title: e.target.value })}
          required
        />
        <Input
          label="Artiste"
          id="artist"
          value={album.artist}
          onChange={(e) => setAlbum({ ...album, artist: e.target.value })}
          required
        />
        <Input
          label="Date de sortie"
          id="releaseDate"
          type="date"
          value={album.releaseDate}
          onChange={(e) => setAlbum({ ...album, releaseDate: e.target.value })}
          required
        />

        <div>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="genre"
          >
            Genres
          </label>
          <Select
            options={genres}
            onChange={(genres) => setAlbum({ ...album, genres })}
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="block text-sm font-medium">Duration :</span>
          <span>{formatDuration(album.duration)}</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Liste des pistes</h3>
          <button
            type="button"
            className="bg-black text-white p-2 h-min rounded-md"
          >
            Ajouter une piste
          </button>
        </div>
        <ul className="space-y-2">
          {album.tracks.map((track, index) => (
            <li
              key={track.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
              className="flex hover:bg-gray-100 items-center space-x-2 p-2 bg-secondary rounded cursor-move"
            >
              <span>{index + 1}.</span>
              <span>{track.title}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <TrackList
        tracks={album.tracks}
        onTracksChange={(tracks) => setAlbum({ ...album, tracks })}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={() => setIsPreview(true)}
        >
          Prévisualiser
        </button>
        <button type="submit">Enregistrer</button>
      </div>
    </form>
  );
}

export default AlbumForm;
