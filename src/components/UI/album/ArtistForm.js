'use client';

import { useState } from 'react';

import UploadFile from '@/components/upload/UploadFile';
import Label from '@/components/UI/form/Label';
import Input from '@/components/UI/form/Input';
import { genres } from '@/utils';

const ArtistForm = ({ onSubmit, onCancel }) => {
  const [artist, setArtist] = useState({
    name: '',
    genres: '',
    images: undefined,
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
        <span className="block text-sm font-medium mb-2">
          Genre <span className="text-red-500">*</span>
        </span>
        <select
          className={`border rounded-md px-3 py-2 w-full`}
          onChange={(e) => setAlbum({ ...album, genres: e.target.value })}
          required
        >
          <option value="">Choisir un genre</option>
          {genres.map((genre, id) => (
            <option
              key={`${genre}-${id}`}
              value={genre}
              selected={genre === album.genres}
            >
              {genre}
            </option>
          ))}
        </select>
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
