'use client';

import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Input from '@/components/UI/form/Input';
import Textarea from '@/components/UI/form/Textarea';
import UploadFile from '@/components/upload/UploadFile';
import CreditForm from './CreditForm';

function TrackForm({ tracks, onTracksChange }) {
  const [newTrack, setNewTrack] = useState({
    id: tracks.length + 1,
    title: '',
    duration: 0,
    isExplicit: false,
    lyrics: '',
    credits: [],
    numberOfListens: 0,
    popularity: 0,
    audioLink: '',
    trackNumber: tracks.length + 1,
  });
  const [isOpen, setIsOpen] = useState(false);

  const resetForm = () => {
    setIsOpen(false);
    setNewTrack({
      id: tracks.length + 1,
      title: '',
      duration: 0,
      albumId: albumId,
      artistId: artistId,
      isExplicit: false,
      lyrics: '',
      credits: [],
      numberOfListens: 0,
      popularity: 0,
      audioLink: '',
      trackNumber: tracks.length + 1,
    });
  };

  const addTrack = () => {
    if (newTrack.title && newTrack.audioLink) {
      console.log("Adding track");
      const updatedTracks = [...tracks, { ...newTrack, id: Date.now().toString() }];
      onTracksChange(updatedTracks);
      setNewTrack({
        id: updatedTracks.length + 1,
        title: '',
        duration: 0,
        isExplicit: false,
        lyrics: '',
        credits: [],
        collaborators: [],
        numberOfListens: 0,
        popularity: 0,
        audioLink: '',
        trackNumber: updatedTracks.length + 1,
      });
      setIsOpen(false);
    }
  };

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
        <div className="bg-opacity-70 bg-black fixed inset-0 w-screen p-12">
          <DialogPanel className="w-4xl h-full space-y-4 border bg-white p-12 overflow-y-scroll">
            <div className="space-y-4">
              <DialogTitle className="text-2xl font-semibold">Ajouter une piste audio</DialogTitle>
              <div className="flex flex-col gap-4">
                <Input
                  required
                  label="Titre de la piste"
                  id="trackTitle"
                  value={newTrack.title}
                  onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
                />
                <Input
                  required
                  label="Explicit"
                  id="trackExplicit"
                  type="checkbox"
                  checked={newTrack.isExplicit}
                  onChange={(e) => setNewTrack({ ...newTrack, isExplicit: e.target.checked })}
                />
              
                <div>
                  <span className="block text-sm font-medium">
                    Piste audio <span className="text-red-500">*</span>
                  </span>
                  <UploadFile getUploadedFiles={
                    (files) => setNewTrack({ ...newTrack, audioLink: files[0] })
                  } />
                </div>
                <CreditForm
                  credits={newTrack.credits}
                  onCreditsChange={(newCredits) =>
                    setNewTrack({ ...newTrack, credits: newCredits })
                  }
                />
                <Textarea
                  label="Paroles"
                  id="trackLyrics"
                  value={newTrack.lyrics}
                  onChange={(e) => setNewTrack({ ...newTrack, lyrics: e.target.value })}
                />
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="bg-black text-white p-2 h-min rounded-md"
                    onClick={addTrack}
                  >
                    Ajouter
                  </button>
                  <button onClick={resetForm}>Annuler</button>
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
