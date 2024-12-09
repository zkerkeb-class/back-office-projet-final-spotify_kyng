"use client";

import { useState } from "react";
import Input from "@/components/UI/form/Input";
import Textarea from "@/components/UI/form/Textarea";

function TrackList({ albumId, artistId, tracks, onTracksChange }) {
  const [newTrack, setNewTrack] = useState({
    id: tracks.length + 1,
    title: "",
    duration: 0,
    albumId: albumId,
    artistId: artistId,
    explicit: false,
    lyrics: "",
    credit: [],
    streams: 0,
    popularity: 0,
    audio: "",
    trackNumber: tracks.length + 1,
  });

  const addTrack = () => {
    if (newTrack.title && newTrack.lyrics) {
      const updatedTracks = [
        ...tracks,
        { ...newTrack, id: Date.now().toString() },
      ];
      onTracksChange(updatedTracks);
      setNewTrack({
        id: updatedTracks.length + 1,
        title: "",
        duration: 0,
        albumId: albumId,
        artistId: artistId,
        explicit: false,
        lyrics: "",
        credit: [],
        streams: 0,
        popularity: 0,
        audio: "",
        trackNumber: updatedTracks.length + 1,
      });
    }
  };

  console.log({ newTrack });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Ajouter une piste audio</h3>
      <div className="space-y-2">
        <Input
          label="Titre de la piste"
          value={newTrack.title}
          onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
        />
        <Textarea
          label="Paroles"
          value={newTrack.lyrics}
          onChange={(e) => setNewTrack({ ...newTrack, lyrics: e.target.value })}
        />
        <Input
          label="Explicit"
          id="trackExplicit"
          type="checkbox"
          checked={newTrack.explicit}
          onChange={(e) =>
            setNewTrack({ ...newTrack, explicit: e.target.checked })
          }
        />

        <button
          type="button"
          className="bg-black text-white p-2 h-min rounded-md"
          onClick={addTrack}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default TrackList;
