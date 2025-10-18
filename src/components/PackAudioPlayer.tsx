import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface PackAudioPlayerProps {
  audioUrl: string;
  trackTitle: string;
  color: 'cyan' | 'white' | 'red' | 'violet' | 'pink' | 'green';
}

export default function PackAudioPlayer({ audioUrl, trackTitle, color }: PackAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveform, setWaveform] = useState<number[]>(new Array(30).fill(0));

  // Couleurs par pack
  const colors = {
    cyan: {
      primary: '#00E5FF',
      shadow: 'rgba(0, 229, 255, 0.6)',
      gradient: 'from-cyan-500 to-blue-500',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500',
    },
    white: {
      primary: '#FFFFFF',
      shadow: 'rgba(255, 255, 255, 0.6)',
      gradient: 'from-white to-gray-200',
      text: 'text-white',
      bg: 'bg-white',
    },
    red: {
      primary: '#EF4444',
      shadow: 'rgba(239, 68, 68, 0.6)',
      gradient: 'from-red-500 to-orange-500',
      text: 'text-red-400',
      bg: 'bg-red-500',
    },
    violet: {
      primary: '#8B5CF6',
      shadow: 'rgba(139, 92, 246, 0.6)',
      gradient: 'from-violet-500 to-purple-500',
      text: 'text-violet-400',
      bg: 'bg-violet-500',
    },
    pink: {
      primary: '#EC4899',
      shadow: 'rgba(236, 72, 153, 0.6)',
      gradient: 'from-pink-500 to-rose-500',
      text: 'text-pink-400',
      bg: 'bg-pink-500',
    },
    green: {
      primary: '#22C55E',
      shadow: 'rgba(34, 197, 94, 0.6)',
      gradient: 'from-green-500 to-emerald-500',
      text: 'text-green-400',
      bg: 'bg-green-500',
    },
  };

  const currentColor = colors[color];

  // Animation waveform
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setWaveform(prev => prev.map(() => Math.random() * 0.7 + 0.3));
      }, 100);
    } else {
      setWaveform(new Array(30).fill(0.2));
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Mise à jour du temps
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          // Signaler au player du site ET aux autres packs de se mettre en pause
          window.dispatchEvent(new CustomEvent('pauseSitePlayer'));
          window.dispatchEvent(new CustomEvent('pausePackPlayer'));
          
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Erreur lecture:', error);
      }
    }
  };

  // Écouter quand un autre pack démarre
  useEffect(() => {
    const handlePauseOtherPacks = () => {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('pausePackPlayer', handlePauseOtherPacks);
    return () => window.removeEventListener('pausePackPlayer', handlePauseOtherPacks);
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-bg-card/80 backdrop-blur-sm rounded-xl p-4 border-2 border-transparent hover:border-opacity-50 transition-all duration-300"
      style={{ borderColor: `${currentColor.primary}40` }}
    >
      {/* Titre */}
      <div className="flex items-center gap-2 mb-3">
        <Volume2 size={16} className={currentColor.text} />
        <p className={`${currentColor.text} text-xs font-semibold truncate`}>
          {trackTitle}
        </p>
      </div>

      {/* Waveform visualization */}
      <div className="flex items-center justify-center gap-0.5 h-12 mb-3">
        {waveform.map((height, i) => (
          <div
            key={i}
            className="w-1 rounded-full transition-all duration-100"
            style={{
              height: `${height * 100}%`,
              backgroundColor: currentColor.primary,
              opacity: isPlaying ? 0.9 : 0.3,
              boxShadow: isPlaying ? `0 0 8px ${currentColor.shadow}` : 'none',
            }}
          />
        ))}
      </div>

      {/* Contrôles */}
      <div className="flex items-center gap-3">
        {/* Bouton Play/Pause */}
        <button
          onClick={togglePlay}
          className={`w-10 h-10 rounded-full bg-gradient-to-r ${currentColor.gradient} flex items-center justify-center flex-shrink-0 hover:scale-110 transition-all duration-300`}
          style={{
            boxShadow: `0 0 20px ${currentColor.shadow}`,
          }}
          aria-label={isPlaying ? 'Mettre en pause' : 'Lire le remix'}
        >
          {isPlaying ? (
            <Pause size={16} className="text-bg-primary" />
          ) : (
            <Play size={16} className="text-bg-primary ml-0.5" />
          )}
        </button>

        {/* Timeline */}
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${currentColor.primary} 0%, ${currentColor.primary} ${progress}%, #141420 ${progress}%, #141420 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${currentColor.primary};
          cursor: pointer;
          box-shadow: 0 0 10px ${currentColor.shadow};
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${currentColor.primary};
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px ${currentColor.shadow};
        }
      `}</style>
    </div>
  );
}

