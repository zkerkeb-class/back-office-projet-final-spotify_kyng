'use client';

import { useState } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Input from '@/components/UI/form/Input';
import Textarea from '@/components/UI/form/Textarea';

function TrackForm({ albumId, artistId, tracks, onTracksChange }) {
  const [newTrack, setNewTrack] = useState({
    id: tracks.length + 1,
    title: '',
    duration: 0,
    albumId: albumId,
    artistId: artistId,
    isExplicit: false,
    lyrics: '',
    credit: [],
    numberOfListens: 0,
    popularity: 0,
    audioLink: '',
    trackNumber: tracks.length + 1,
  });
  const [isOpen, setIsOpen] = useState(false);

  const addTrack = () => {
    if (newTrack.title && newTrack.lyrics) {
      const updatedTracks = [...tracks, { ...newTrack, id: Date.now().toString() }];
      onTracksChange(updatedTracks);
      setNewTrack({
        id: updatedTracks.length + 1,
        title: '',
        duration: 0,
        albumId: albumId,
        artistId: artistId,
        isExplicit: false,
        lyrics: '',
        credit: [],
        collaborators: [],
        numberOfListens: 0,
        popularity: 0,
        audioLink: '',
        trackNumber: updatedTracks.length + 1,
      });
    }
  };

  console.log({ newTrack });

  return (
    <>
      <button
        type="button"
        className="bg-black text-white p-2 h-min rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Ajouter une piste
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="bg-opacity-70 bg-black fixed inset-0 w-screen p-10">
          <DialogPanel className="w-4xl space-y-4 border bg-white p-12">
            <div className="space-y-4">
              <DialogTitle className="text-lg font-semibold">Ajouter une piste audioLink</DialogTitle>
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
                  checked={newTrack.isExplicit}
                  onChange={(e) => setNewTrack({ ...newTrack, isExplicit: e.target.checked })}
                />

                <div className="flex gap-4">
                  <button
                    type="button"
                    className="bg-black text-white p-2 h-min rounded-md"
                    onClick={addTrack}
                  >
                    Ajouter
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setNewTrack({
                        id: tracks.length + 1,
                        title: '',
                        duration: 0,
                        albumId: albumId,
                        artistId: artistId,
                        isExplicit: false,
                        lyrics: '',
                        credit: [],
                        numberOfListens: 0,
                        popularity: 0,
                        audioLink: '',
                        trackNumber: tracks.length + 1,
                      });
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default TrackForm;
