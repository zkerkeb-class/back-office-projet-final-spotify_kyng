import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioPreview = ({ src }) => {
  const waveformRef = useRef(null);
  const waveSurferInstance = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // État pour le contrôle de lecture
  const [volume, setVolume] = useState(0.5); // État du volume initial
  const [duration, setDuration] = useState(0); // Durée de l'audio
  const [currentTime, setCurrentTime] = useState(0); // Temps actuel de lecture

  useEffect(() => {
    if (!waveformRef.current) return;

    waveSurferInstance.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4CAF50', // Couleur de la vague
      progressColor: '#81C784', // Couleur de la progression
      responsive: true,
      backend: 'WebAudio',
      height: 100,
      barWidth: 2,
      cursorColor: '#4CAF50', // Couleur du curseur
    });

    waveSurferInstance.current.load(src);

    waveSurferInstance.current.on('ready', () => {
      setDuration(waveSurferInstance.current.getDuration()); // Initialiser la durée de l'audio
    });

    waveSurferInstance.current.on('audioprocess', () => {
      setCurrentTime(waveSurferInstance.current.getCurrentTime()); // Mettre à jour le temps actuel
    });

    waveSurferInstance.current.on('error', (err) => {
      console.error('Erreur Wavesurfer:', err);
    });

    return () => {
      if (waveSurferInstance.current) {
        waveSurferInstance.current.destroy();
      }
    };
  }, [src]);

  const handlePlayPause = () => {
    if (isPlaying) {
      waveSurferInstance.current.pause();
    } else {
      waveSurferInstance.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    waveSurferInstance.current.setVolume(newVolume);
    setVolume(newVolume);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div ref={waveformRef} className="mb-4"></div>

      <div className="flex items-center justify-between mb-4">
        {/* Bouton play/pause */}
        <button
          onClick={handlePlayPause}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
        >
          {isPlaying ? 'Pause' : 'Lire'}
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        {/* Affichage de la progression */}
        <p className="text-sm text-gray-300">{`${Math.floor(currentTime)}s / ${Math.floor(duration)}s`}</p>
      </div>

      {/* Barre de volume */}
      <div className="flex items-center mb-4">
        <label className="text-sm text-gray-300 mr-2">Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-600 rounded-full"
        />
      </div>
    </div>
  );
};

export default AudioPreview;
