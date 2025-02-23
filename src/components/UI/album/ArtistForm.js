'use client';

import { useState } from 'react';
import Label from '@/components/UI/form/Label';
import Input from '@/components/UI/form/Input';
import { genres } from '@/utils';
import ImagePreview from '@/components/upload/ImagePreview';

const ArtistForm = ({ onSubmit, onCancel ,isEditing,artistData}) => {
  const [artist, setArtist] = useState({
    name: '',
    genres: '',
    images: undefined,
  });

  console.log({artist});
  

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
          onChange={(e) => setArtist({ ...artist, genres: e.target.value })}
          required
        >
          <option value="">Choisir un genre</option>
          {genres.map((genre, id) => (
            <option
              key={`${genre}-${id}`}
              value={genre}
              selected={genre === artist.genres}
            >
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label title="Photo de profil" />
        <input
          type="file"
          name="image"
          onChange={(e) => setArtist({ ...artist, images: e.target.files[0] })}
        />
        {!isEditing && artist.images && (
          <ImagePreview
            src={URL.createObjectURL(artist.images)}
            name={`Profile - ${artist.name}`}
            size={200}
          />
        )}
        {isEditing && artist.images && (
          <ImagePreview
            src={getImageUrl(artistData.image.path)}
            name={`Profile - ${artistData.name}`}
            size={200}
          />
        )}
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
