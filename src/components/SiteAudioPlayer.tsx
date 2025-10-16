import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function SiteAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(new Array(50).fill(0));

  // Démarrage automatique au chargement
  useEffect(() => {
    const startAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = volume;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Autoplay bloqué - l'utilisateur devra cliquer sur Play
          console.log('Cliquez sur Play pour démarrer la musique');
        }
      }
    };
    
    const timer = setTimeout(startAudio, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animation des ondes audio
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isMuted) {
      interval = setInterval(() => {
        setAudioData(prev => 
          prev.map(() => Math.random() * volume * 0.8 + 0.2)
        );
      }, 80);
    } else {
      setAudioData(new Array(50).fill(0.15));
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, volume, isMuted]);

  // Configurer le volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          // Signaler aux players de packs de se mettre en pause
          window.dispatchEvent(new CustomEvent('pausePackPlayer'));
          
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Erreur lecture:', error);
      }
    }
  };

  // Écouter quand un pack démarre pour se mettre en pause
  useEffect(() => {
    const handlePauseFromPack = () => {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('pauseSitePlayer', handlePauseFromPack);
    return () => window.removeEventListener('pauseSitePlayer', handlePauseFromPack);
  }, [isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary/98 backdrop-blur-neon border-t border-neon-violet/30 shadow-[0_-5px_40px_rgba(155,92,246,0.4)]">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center gap-6">
          {/* Info musique */}
          <div className="flex-shrink-0 w-48 hidden md:block">
            <p className="text-text-primary font-semibold text-sm truncate">
              🎵 Disco Lines - No Broke Boys
            </p>
            <p className="text-text-secondary text-xs truncate">Ambiance Ghost Remix</p>
          </div>

          {/* Visualisation ondes */}
          <div className="flex-1 flex items-center justify-center gap-0.5 h-10">
            {audioData.map((height, i) => (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-75 ease-out"
                style={{
                  height: `${height * 100}%`,
                  backgroundColor: i % 3 === 0 ? '#9B5CF6' : i % 3 === 1 ? '#00E5FF' : '#7B3CF6',
                  opacity: isPlaying && !isMuted ? 0.9 : 0.3,
                  boxShadow: isPlaying && !isMuted 
                    ? `0 0 ${height * 8}px ${i % 2 === 0 ? 'rgba(155,92,246,0.7)' : 'rgba(0,229,255,0.7)'}`
                    : 'none',
                }}
              />
            ))}
          </div>

          {/* Contrôles */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Bouton Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan flex items-center justify-center glow-violet hover:scale-110 hover:brightness-125 transition-all duration-300"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white ml-0.5" />
              )}
            </button>

            {/* Contrôle volume */}
            <div className="flex items-center gap-2 w-32">
              <button
                onClick={toggleMute}
                className="text-text-secondary hover:text-neon-violet transition-colors"
                title={isMuted ? 'Activer le son' : 'Couper le son'}
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
                className="flex-1 h-1 bg-bg-card rounded-full appearance-none cursor-pointer volume-slider"
                style={{
                  background: `linear-gradient(to right, #9B5CF6 0%, #00E5FF ${volume * 100}%, #141420 ${volume * 100}%, #141420 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/audio/music-site/Disco Lines - No Broke Boys ( REMIX ) .wav"
        loop
        preload="auto"
      />

      <style>{`
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9B5CF6, #00E5FF);
          cursor: pointer;
          box-shadow: 0 0 12px rgba(155, 92, 246, 0.8);
          transition: all 0.2s ease;
        }
        
        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(155, 92, 246, 1), 0 0 30px rgba(0, 229, 255, 0.6);
        }
        
        .volume-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9B5CF6, #00E5FF);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 12px rgba(155, 92, 246, 0.8);
          transition: all 0.2s ease;
        }
        
        .volume-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(155, 92, 246, 1), 0 0 30px rgba(0, 229, 255, 0.6);
        }
      `}</style>
    </div>
  );
}

