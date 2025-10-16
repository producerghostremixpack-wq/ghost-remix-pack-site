import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(new Array(40).fill(0));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Gestion du chargement et des erreurs
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleCanPlay = () => {
      setIsLoading(false);
      console.log('✅ Audio chargé et prêt');
    };
    
    const handleError = (e: Event) => {
      setIsLoading(false);
      setError('Impossible de charger le fichier audio');
      console.error('❌ Erreur chargement audio:', e);
    };
    
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Configurer le volume initial
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Animation de l'onde audio
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioData(prev => 
          prev.map(() => Math.random() * (isMuted ? 0.2 : volume) + 0.1)
        );
      }, 100);
    } else {
      setAudioData(new Array(40).fill(0.1));
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, volume, isMuted]);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.volume = volume;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Erreur de lecture audio:', error);
        alert('Impossible de lire la musique. Vérifiez que le fichier existe.');
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-neon border-t border-neon-violet/30 shadow-[0_-5px_30px_rgba(155,92,246,0.3)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-6">
          {/* Info track */}
          <div className="flex-shrink-0 hidden md:block">
            <p className="text-text-primary font-semibold text-sm">
              {isLoading ? '⏳ Chargement...' : error ? '❌ Erreur' : '🎵 Ambiance Ghost Remix'}
            </p>
            <p className="text-text-secondary text-xs">Disco Lines - No Broke Boys</p>
          </div>

          {/* Visualisation onde audio */}
          <div className="flex-1 flex items-center justify-center gap-1 h-12">
            {audioData.map((height, i) => (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-100 ease-out"
                style={{
                  height: `${height * 100}%`,
                  backgroundColor: i % 2 === 0 ? '#9B5CF6' : '#00E5FF',
                  opacity: isPlaying ? 0.8 : 0.3,
                  boxShadow: isPlaying ? `0 0 ${height * 10}px ${i % 2 === 0 ? 'rgba(155,92,246,0.6)' : 'rgba(0,229,255,0.6)'}` : 'none',
                }}
              />
            ))}
          </div>

          {/* Contrôles */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Bouton Play/Pause */}
            <button
              onClick={togglePlay}
              disabled={isLoading || !!error}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan flex items-center justify-center glow-violet hover:scale-110 hover:brightness-125 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title={isLoading ? 'Chargement...' : error ? error : 'Lecture/Pause'}
            >
              {isPlaying ? (
                <Pause size={18} className="text-white" />
              ) : (
                <Play size={18} className="text-white ml-0.5" />
              )}
            </button>

            {/* Volume */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-text-secondary hover:text-neon-violet transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={20} />
                ) : (
                  <Volume2 size={20} />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-bg-card rounded-full appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #9B5CF6 0%, #9B5CF6 ${volume * 100}%, #141420 ${volume * 100}%, #141420 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/audio/Disco Lines - No Broke Boys  (exclusivité Ghost remix pack )  .wav"
        loop
        preload="metadata"
      />

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9B5CF6, #00E5FF);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(155, 92, 246, 0.6);
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9B5CF6, #00E5FF);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(155, 92, 246, 0.6);
        }
      `}</style>
    </div>
  );
}

