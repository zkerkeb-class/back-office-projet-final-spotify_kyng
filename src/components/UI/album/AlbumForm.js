'use client';

import { use, useEffect, useState } from 'react';
import AlbumPreview from './AlbumPreview';
import { formatDuration } from '@/utils';
import TrackForm from './TrackForm';
import Input from '@/components/UI/form/Input';
import ImagePreview from '@/components/upload/ImagePreview';
import { getArtists } from '@/services/artist.service';
import { createAlbum, updateAlbum } from '@/services/album.service';
import { useRouter } from 'next/navigation';

function AlbumForm({ onCancel, albumData, isEditing }) {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);
  const [album, setAlbum] = useState({
    title: '' || albumData?.title,
    artistId: '' || albumData?.artistId._id,
    releaseDate: '' || albumData?.releaseDate,
    genre: '' || albumData?.genre,
    audioTracks: [] || albumData?.audioTracks,
    image: albumData?.image ,
    duration: 0,
  });

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        setArtists(data.artists);
      } catch (error) {
        console.error('Error fetching artists', error);
      }
    };
    fetchArtists();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    createAlbum(album);
    alert('Album créé avec succès');
    // router.push('/albums');
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire de mise à jour
    updateAlbum({ ...album, _id: albumData._id });
    alert('Album mis à jour avec succès');
    router.push('/albums');
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
  console.log({album,albumData});
  

  return (
    <form
      onSubmit={isEditing ? handleUpdateSubmit : handleSubmit}
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
        <select
          className={`border rounded-md px-3 py-2 w-full`}
          onChange={(e) => setAlbum({ ...album, artistId: e.target.value })}
          required
        >
          <option value="">Choisir un artiste</option>
          {artists.length > 0 &&
            artists.map((artist) => (
              <option
                key={artist._id}
                value={artist._id}
                selected={artist._id === album.artistId}
              >
                {artist.name}
              </option>
            ))}
        </select>
        <Input
          label="Date de sortie"
          id="releaseDate"
          type="date"
          value={album.releaseDate ? album.releaseDate.split('T')[0] : ''}
          onChange={(e) => setAlbum({ ...album, releaseDate: e.target.value })}
          required
        />

        <Input
          label="Genre"
          id="genre"
          value={album.genre}
          onChange={(e) => setAlbum({ ...album, genre: e.target.value })}
        />

        <div className="flex items-center gap-1">
          <span className="block text-sm font-medium">Duration :</span>
          <span>{formatDuration(album.duration)}</span>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Liste des pistes</h3>
        <ul className="space-y-2">
          {album.audioTracks.map((track, index) => (
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

      <TrackForm
        tracks={album.audioTracks}
        onTracksChange={(tracks) => setAlbum({ ...album, audioTracks: tracks })}
      />

      <div className="flex flex-col items-start space-y-4">
        <span className="block text-sm font-medium">
          Couverture de l'album <span className="text-red-500">*</span>
        </span>
        {/* <UploadFile getUploadedFiles={(files) =>
          setAlbum({ ...album, artwork: files })
        } /> */}
        <input
          type="file"
          name="image"
        
          onChange={(e) => setAlbum({ ...album, image: e.target.files[0] })}
        />
        {!isEditing && album.image && (
          <ImagePreview
            src={URL.createObjectURL(album.image)}
            name={album.image.name}
            size={12}
          />
        )}
        {
          isEditing && album.image && (
            <ImagePreview
              src={albumData.image.path}
              name={`Artwork - ${albumData.title}`}
              size={12}
            />
          )
        }
      </div>

      <div className="flex justify-end space-x-4 p-4">
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
        <button type="submit">{isEditing ? 'Modifier' : 'Enregistrer'}</button>
      </div>
    </form>
  );
}

export default AlbumForm;
