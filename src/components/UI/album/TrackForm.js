'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Input from '@/components/UI/form/Input';
import Textarea from '@/components/UI/form/Textarea';
import CreditForm from './CreditForm';
import AudioPreview from '@/components/upload/AudioPreview';
import { Pencil } from 'lucide-react';
import { capitalize } from '@/utils';
import { streamTrack, updateTrack } from '@/services/track.service';
function TrackForm({ isEditing, currentTrack, tracks, onTracksChange }) {
  const [newTrack, setNewTrack] = useState({
    id: tracks.length + 1,
    title: '',
    duration: 0,
    isExplicit: false,
    lyrics: '',
    credits: [],
    numberOfListens: 0,
    popularity: 0,
    audioLink: undefined,
    trackNumber: tracks.length + 1,
  });
  const [updatedTrack, setUpdatedTrack] = useState(currentTrack || undefined);
  const [audioUrl, setAudioUrl] = useState(undefined);
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
      audioLink: undefined,
      trackNumber: tracks.length + 1,
    });
  };

  const addTrack = () => {
    if (newTrack.title && newTrack.audioLink) {
      console.log('Adding track');
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

  const handleUpdateTrack = async () => {
    try {
      console.log('Updating track');
      await updateTrack(updatedTrack, updatedTrack._id);
      alert('Piste audio modifiée avec succès');
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating track', error);
      alert('Une erreur est survenue lors de la modification de la piste audio');
    }
  };
  const transformCredits = (credits) => {
    return Object.entries(credits).map(([role, name]) => ({ role: capitalize(role), name }));
  };
  console.log({ updatedTrack });
const fetchAudioUrl = async () => {
  const url = await streamTrack(currentTrack.audioLink);
  console.log({ url });
  
  setAudioUrl(url);
}
  useEffect(() => {
    if (isEditing) {
      setUpdatedTrack(currentTrack);
      fetchAudioUrl();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <>
        <button
          type="button"
          className="p-2 bg-blue-500 text-white"
          onClick={() => setIsOpen(true)}
        >
          <Pencil size={16} />
        </button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="bg-opacity-70 bg-black fixed inset-0 w-screen flex items-center justify-center p-12">
            <DialogPanel className="w-3/5 h-full space-y-4 border bg-white p-12 overflow-y-auto">
              <div className="space-y-4">
                <DialogTitle className="text-2xl font-semibold">
                  Ajouter une piste audio
                </DialogTitle>
                <div className="flex flex-col gap-4">
                  <Input
                    required
                    label="Titre de la piste"
                    id="trackTitle"
                    defaultValue={updatedTrack.title}
                    onChange={(e) => setUpdatedTrack({ ...updatedTrack, title: e.target.value })}
                  />
                  <Input
                    required
                    label="Explicit"
                    id="trackExplicit"
                    type="checkbox"
                    defaultChecked={updatedTrack.isExplicit}
                    onChange={(e) =>
                      setUpdatedTrack({ ...updatedTrack, isExplicit: e.target.checked })
                    }
                  />

                  <div className="flex flex-col items-start w-fit space-y-4"></div>
                  
                <div className="flex flex-col items-start w-fit space-y-4">
                  <span className="block text-sm font-medium">
                    Piste audio <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="file"
                    name=""
                    onChange={(e) => setUpdatedTrack({ ...updatedTrack, audioLink: e.target.files[0] })}
                  />
                  {(updatedTrack.audioLink !== currentTrack.audioLink) ? (
                    <AudioPreview src={URL.createObjectURL(updatedTrack.audioLink)} />
                  ) : 
                  <AudioPreview src={audioUrl} />
                  }
                </div>
                  <CreditForm
                    credits={transformCredits(updatedTrack.credits)}
                    onCreditsChange={(newCredits) =>
                      setUpdatedTrack({ ...updatedTrack, credits: newCredits })
                    }
                  />
                  <Textarea
                    label="Paroles"
                    id="trackLyrics"
                    defaultValue={updatedTrack.lyrics}
                    onChange={(e) => setUpdatedTrack({ ...updatedTrack, lyrics: e.target.value })}
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="bg-black text-white p-2 h-min rounded-md"
                      onClick={handleUpdateTrack}
                    >
                      Modifier
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
        <div className="bg-opacity-70 bg-black fixed inset-0 w-screen flex items-center justify-center p-12">
          <DialogPanel className="w-3/5 h-full space-y-4 border bg-white p-12 overflow-y-auto">
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

                <div className="flex flex-col items-start w-fit space-y-4">
                  <span className="block text-sm font-medium">
                    Piste audio <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="file"
                    name=""
                    onChange={(e) => setNewTrack({ ...newTrack, audioLink: e.target.files[0] })}
                  />
                  {newTrack.audioLink && (
                    <AudioPreview src={URL.createObjectURL(newTrack.audioLink)} />
                  )}
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
                <div className="flex justify-end gap-4">
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
