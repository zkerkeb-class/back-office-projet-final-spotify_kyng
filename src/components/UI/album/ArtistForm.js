'use client';

import { useState } from 'react';

import UploadFile from '@/components/upload/UploadFile';
import Label from '@/components/UI/form/Label';
import Input from '@/components/UI/form/Input';
import Select from '../form/Select';

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

const ArtistForm = ({ onSubmit, onCancel }) => {
  const [artist, setArtist] = useState({
    name: '',
    genres: [],
    images: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(artist);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <Input
          id="name"
          label="Nom de l'artiste"
          value={artist.name}
          onChange={(e) => setArtist({ ...artist, name: e.target.value })}
          required
        />
      </div>
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
      <div>
        <Label title="Images de l'artiste" />
        <UploadFile />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Annuler
        </button>
        <button type="submit">Créer l'artiste</button>
      </div>
    </form>
  );
};

export default ArtistForm;
