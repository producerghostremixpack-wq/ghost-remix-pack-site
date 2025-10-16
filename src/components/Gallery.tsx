import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

// Types
interface Photo {
  id: string;
  url: string;
  category: 'live' | 'crowd' | 'studio' | 'process';
  title: string;
  height: 'short' | 'medium' | 'tall';
}

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // 32 photos organisées par catégorie avec hauteurs variées (Masonry effect)
  const allPhotos: Photo[] = [
    // ========== LIVE DJ SETS (8 photos) ==========
    { id: 'live-1', url: 'https://images.unsplash.com/photo-1571266028243-d220c6844e1d?w=800', category: 'live', title: 'DJ Live Mixing', height: 'tall' },
    { id: 'live-2', url: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800', category: 'live', title: 'DJ Booth Performance', height: 'medium' },
    { id: 'live-3', url: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800', category: 'live', title: 'Turntables Live', height: 'short' },
    { id: 'live-4', url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800', category: 'live', title: 'Club DJ Set', height: 'tall' },
    { id: 'live-5', url: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800', category: 'live', title: 'Controller Action', height: 'medium' },
    { id: 'live-6', url: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=800', category: 'live', title: 'Vinyl Performance', height: 'short' },
    { id: 'live-7', url: 'https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=800', category: 'live', title: 'DJ Equipment Live', height: 'tall' },
    { id: 'live-8', url: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800', category: 'live', title: 'Mixer Live Session', height: 'medium' },
    
    // ========== CROWD ENERGY (8 photos) ==========
    { id: 'crowd-1', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', category: 'crowd', title: 'Festival Crowd', height: 'medium' },
    { id: 'crowd-2', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', category: 'crowd', title: 'Concert Energy', height: 'tall' },
    { id: 'crowd-3', url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800', category: 'crowd', title: 'Festival Lights', height: 'short' },
    { id: 'crowd-4', url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', category: 'crowd', title: 'Stage Atmosphere', height: 'tall' },
    { id: 'crowd-5', url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800', category: 'crowd', title: 'Dancing Crowd', height: 'medium' },
    { id: 'crowd-6', url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800', category: 'crowd', title: 'Festival Sunset', height: 'short' },
    { id: 'crowd-7', url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800', category: 'crowd', title: 'EDM Festival', height: 'tall' },
    { id: 'crowd-8', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', category: 'crowd', title: 'Electronic Party', height: 'medium' },
    
    // ========== STUDIO SESSIONS (8 photos) ==========
    { id: 'studio-1', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800', category: 'studio', title: 'Studio Setup', height: 'short' },
    { id: 'studio-2', url: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=800', category: 'studio', title: 'Recording Studio', height: 'tall' },
    { id: 'studio-3', url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800', category: 'studio', title: 'Music Production', height: 'medium' },
    { id: 'studio-4', url: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=800', category: 'studio', title: 'Studio Headphones', height: 'short' },
    { id: 'studio-5', url: 'https://images.unsplash.com/photo-1519508234439-4f23643125c1?w=800', category: 'studio', title: 'Production Room', height: 'tall' },
    { id: 'studio-6', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', category: 'studio', title: 'Studio Lights', height: 'medium' },
    { id: 'studio-7', url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800', category: 'studio', title: 'Mixing Console', height: 'short' },
    { id: 'studio-8', url: 'https://images.unsplash.com/photo-1485120750507-a3bf477acd63?w=800', category: 'studio', title: 'Studio Gear', height: 'tall' },
    
    // ========== CREATIVE PROCESS (8 photos) ==========
    { id: 'process-1', url: 'https://images.unsplash.com/photo-1567443024551-f3e3cc2be870?w=800', category: 'process', title: 'Producer at Work', height: 'medium' },
    { id: 'process-2', url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', category: 'process', title: 'Creative Session', height: 'tall' },
    { id: 'process-3', url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800', category: 'process', title: 'Music Creation', height: 'short' },
    { id: 'process-4', url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', category: 'process', title: 'Production Flow', height: 'tall' },
    { id: 'process-5', url: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800', category: 'process', title: 'DAW Screen', height: 'medium' },
    { id: 'process-6', url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800', category: 'process', title: 'Laptop Production', height: 'short' },
    { id: 'process-7', url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800', category: 'process', title: 'Audio Editing', height: 'tall' },
    { id: 'process-8', url: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=800', category: 'process', title: 'Sound Design', height: 'medium' },
  ];

  // Navigation clavier dans le lightbox
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex]);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedImageIndex(prev => 
        prev === 0 ? allPhotos.length - 1 : (prev || 0) - 1
      );
    } else {
      setSelectedImageIndex(prev => 
        prev === allPhotos.length - 1 ? 0 : (prev || 0) + 1
      );
    }
  };

  // Hauteurs pour effet Masonry
  const heightClasses = {
    short: 'h-48',
    medium: 'h-64',
    tall: 'h-80',
  };

  return (
    <>
      <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-bg-primary to-bg-card">
        <div className="max-w-7xl mx-auto">
          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 
              className="text-4xl font-bold mb-4 text-text-primary"
              style={{
                textShadow: `
                  0 0 10px rgba(155, 92, 246, 0.8),
                  0 0 20px rgba(155, 92, 246, 0.6),
                  2px 2px 0px rgba(155, 92, 246, 0.4)
                `
              }}
            >
              📸 L'Univers Ghost Remix
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Festivals • DJ Live • Studios • Électro • Urbain • Afro<br />
              <span className="text-neon-violet">Plongez dans l'ambiance où nos remixes prennent vie</span>
            </p>
          </motion.div>

          {/* Grille Masonry de photos - Toutes les photos affichées */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="wait">
              {allPhotos.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className={`relative group cursor-pointer overflow-hidden rounded-lg ${heightClasses[photo.height]}`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                  />
                  
                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-semibold mb-1">{photo.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-300 capitalize">{photo.category}</span>
                        <Expand size={16} className="text-neon-violet" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_30px_rgba(155,92,246,0.4)]"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox plein écran avec navigation */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-lg flex items-center justify-center p-6"
          >
            {/* Bouton fermer */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(null);
              }}
              className="absolute top-6 right-6 text-white hover:text-neon-violet transition-all hover:scale-110 z-10"
            >
              <X size={40} />
            </button>

            {/* Bouton navigation gauche */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-neon-cyan transition-all hover:scale-125 bg-black/50 rounded-full p-3 hover:bg-black/70"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Bouton navigation droite */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-neon-cyan transition-all hover:scale-125 bg-black/50 rounded-full p-3 hover:bg-black/70"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image et infos */}
            <div className="max-w-6xl max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={allPhotos[selectedImageIndex]?.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={allPhotos[selectedImageIndex]?.url}
                alt={allPhotos[selectedImageIndex]?.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-[0_0_50px_rgba(155,92,246,0.5)]"
              />
              
              {/* Infos photo */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <h3 className="text-white text-xl font-bold mb-2">
                  {allPhotos[selectedImageIndex]?.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2 capitalize">
                  {allPhotos[selectedImageIndex]?.category}
                </p>
                <p className="text-neon-violet text-sm font-semibold">
                  {selectedImageIndex + 1} / {allPhotos.length}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

