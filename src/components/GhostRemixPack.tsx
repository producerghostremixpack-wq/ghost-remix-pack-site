import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Crown, Users, Award, Lock, Quote, Star } from 'lucide-react';
import Newsletter from './Newsletter';
import PaymentSection from './PaymentSection';
import SecurePayment from './SecurePayment';
import Logo from './Logo';
import SiteAudioPlayer from './SiteAudioPlayer';
import PackAudioPlayer from './PackAudioPlayer';
import PartnersScroll from './PartnersScroll';
import CartIcon from './CartIcon';
import CartSidebar from './CartSidebar';
import Toast, { useToast } from './Toast';
import VideoIntro from './VideoIntro';
import { useCart } from '@/context/CartContext';

export default function GhostRemixPack() {
  const [showLightning, setShowLightning] = useState(false);
  const [packLightning, setPackLightning] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('house');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();
  const { toast, showToast, hideToast } = useToast();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showToast(`${product.name} ajouté au panier !`);
    setIsCartOpen(true); // Ouvre le panier latéral
  };

  // Effet éclair toutes les 10 secondes sur le titre
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 500);
    }, 10000);
    
    const initialTimer = setTimeout(() => {
      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 500);
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  // Effet éclair sur les packs toutes les 10 secondes
  useEffect(() => {
    const triggerPackLightning = (packIndex: number) => {
      setPackLightning(packIndex);
      setTimeout(() => setPackLightning(null), 600);
    };
    
    // Nombre de packs selon la catégorie (4 pour services, 6 pour les autres)
    const packsCount = activeCategory === 'services' ? 4 : 6;
    const intervals: NodeJS.Timeout[] = [];
    const timeouts: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < packsCount; i++) {
      intervals.push(setInterval(() => triggerPackLightning(i), 10000));
      timeouts.push(setTimeout(() => triggerPackLightning(i), 4000 + i * 700));
    }
    
    return () => {
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [activeCategory]);

  const allPacks = [
    // ========== SERVICES DJ (4 services) ==========
    {
      name: 'JINGLE DJ PERSO',
      price: 'Sur mesure',
      desc: 'Jingle DJ unique, avec votre nom, votre signature. Production studio pro.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Exemple Jingle DJ',
      playerColor: 'violet' as const,
      category: 'services',
    },
    {
      name: 'INTRO PERSONNALISÉE',
      price: 'Sur mesure',
      desc: 'Intro cinématographique sur mesure, voix pro, effets premium. Impact garanti.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Exemple Intro Pro',
      playerColor: 'cyan' as const,
      category: 'services',
    },
    {
      name: 'REMIX SUR COMMANDE',
      price: 'Devis gratuit',
      desc: 'Remix exclusif de votre choix. Nous adaptons à votre style et vos besoins.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Exemple Remix Custom',
      playerColor: 'pink' as const,
      category: 'services',
    },
    {
      name: 'CONDITIONS SPÉCIALES',
      price: 'Nous contacter',
      desc: 'Packs multiples, partenariats, projets spéciaux. Conditions préférentielles disponibles.',
      audio: null,
      trackTitle: null,
      playerColor: 'green' as const,
      category: 'services',
    },

    // ========== HOUSE (6 packs) ==========
    {
      name: 'PHANTOM HOUSE',
      price: '200€',
      desc: 'Deep House atmosphérique avec bassline hypnotique. Testé en club, efficacité 92%.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Phantom Groove - Deep Mix',
      playerColor: 'cyan' as const,
      category: 'house',
    },
    {
      name: 'NEON VIBES',
      price: '200€',
      desc: 'Progressive House énergique, mélodies électrisantes, perfect pour peak time.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Neon Lights - Progressive Edit',
      playerColor: 'violet' as const,
      category: 'house',
    },
    {
      name: 'MIDNIGHT GROOVE',
      price: '200€',
      desc: 'Tech House minimal, kick puissant, bassline roulante. Ambiance underground.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Midnight Session - Tech Mix',
      playerColor: 'pink' as const,
      category: 'house',
    },
    {
      name: 'CRYSTAL WAVES',
      price: '200€',
      desc: 'Melodic House cristallin, pads aériens, build-up émotionnel.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Crystal Dreams - Melodic Edit',
      playerColor: 'green' as const,
      category: 'house',
    },
    {
      name: 'BASS TEMPLE',
      price: '200€',
      desc: 'Bass House explosif, sub-bass massif, drop devastateur. Crowd killer.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Temple Bass - Heavy Mix',
      playerColor: 'red' as const,
      category: 'house',
    },
    {
      name: 'STELLAR HOUSE',
      price: '200€',
      desc: 'Future House spatial, synthés cosmiques, groove futuriste.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Stellar Journey - Future Mix',
      playerColor: 'cyan' as const,
      category: 'house',
    },

    // ========== AFRO (6 packs) ==========
    {
      name: 'TRIBAL FUSION',
      price: '200€',
      desc: 'Afro House authentique, percussions organiques, voix tribales samplées.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Tribal Spirit - Afro Mix',
      playerColor: 'pink' as const,
      category: 'afro',
    },
    {
      name: 'AMAPIANO GOLD',
      price: '200€',
      desc: 'Amapiano premium, log drum signature, piano mélodique, groove irrésistible.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Golden Piano - Amapiano Edit',
      playerColor: 'green' as const,
      category: 'afro',
    },
    {
      name: 'AFRO TECH',
      price: '200€',
      desc: 'Fusion Afro-Tech moderne, kicks techno + percussions africaines.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Afro Technology - Fusion Mix',
      playerColor: 'violet' as const,
      category: 'afro',
    },
    {
      name: 'JUNGLE HEAT',
      price: '200€',
      desc: 'Afrobeat énergique, cuivres puissants, rythme entraînant, summer vibes.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Jungle Fever - Afrobeat Mix',
      playerColor: 'cyan' as const,
      category: 'afro',
    },
    {
      name: 'SAHARA NIGHTS',
      price: '200€',
      desc: 'Afro House mystique, atmosphère désertique, instruments ethniques.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Sahara Dreams - Night Mix',
      playerColor: 'red' as const,
      category: 'afro',
    },
    {
      name: 'AFRICAN RHYTHM',
      price: '200€',
      desc: 'Afrobeat moderne, percussions complexes, vibe festival, energy maximale.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'African Spirit - Festival Mix',
      playerColor: 'violet' as const,
      category: 'afro',
    },

    // ========== RAP FR (6 packs) ==========
    {
      name: 'DRILL PHANTOM',
      price: '200€',
      desc: 'Drill français sombre, 808 percutantes, hi-hats rapides, ambiance street.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Phantom Streets - Drill Mix',
      playerColor: 'red' as const,
      category: 'rap',
    },
    {
      name: 'TRAP ELITE',
      price: '200€',
      desc: 'Trap français premium, kicks lourds, snares claquantes, flow puissant.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Elite Flow - Trap Edit',
      playerColor: 'cyan' as const,
      category: 'rap',
    },
    {
      name: 'BOOM BAP 2.0',
      price: '200€',
      desc: 'Boom Bap modernisé, drums vintages, samples jazz, kicks profonds.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'New School Boom - Classic Mix',
      playerColor: 'violet' as const,
      category: 'rap',
    },
    {
      name: 'CLOUD RAP',
      price: '200€',
      desc: 'Rap atmosphérique, pads éthérés, 808 mélodiques, vibe planant.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Cloud Nine - Atmospheric Mix',
      playerColor: 'pink' as const,
      category: 'rap',
    },
    {
      name: 'HARDCORE FR',
      price: '200€',
      desc: 'Rap hardcore énergique, kicks agressifs, drops percutants, street energy.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Hardcore Streets - Raw Mix',
      playerColor: 'green' as const,
      category: 'rap',
    },
    {
      name: 'PHONK URBAIN',
      price: '200€',
      desc: 'Phonk français moderne, 808 distordues, samples Memphis, vibe sombre.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Urban Phonk - Dark Mix',
      playerColor: 'pink' as const,
      category: 'rap',
    },

    // ========== AUTRE (6 packs) ==========
    {
      name: 'ELECTRO STORM',
      price: '200€',
      desc: 'Electro House explosif, synthés puissants, drop massif, festival ready.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Storm Rising - Electro Mix',
      playerColor: 'violet' as const,
      category: 'autre',
    },
    {
      name: 'DUBSTEP GHOST',
      price: '200€',
      desc: 'Dubstep lourd, wobble bass dévastateur, half-time puissant.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Ghost Wobble - Dubstep Mix',
      playerColor: 'pink' as const,
      category: 'autre',
    },
    {
      name: 'TECHNO NOIR',
      price: '200€',
      desc: 'Techno sombre et hypnotique, kicks profonds, ambiance industrielle.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Noir Factory - Techno Mix',
      playerColor: 'cyan' as const,
      category: 'autre',
    },
    {
      name: 'FUTURE BASS',
      price: '200€',
      desc: 'Future Bass coloré, synthés brillants, chord stabs émotionnels.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Future Feels - Bass Mix',
      playerColor: 'green' as const,
      category: 'autre',
    },
    {
      name: 'HARDSTYLE RAVE',
      price: '200€',
      desc: 'Hardstyle agressif, kicks reverse, screeches, melody euphoric.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Rave Anthem - Hardstyle Mix',
      playerColor: 'red' as const,
      category: 'autre',
    },
    {
      name: 'DRUM & BASS',
      price: '200€',
      desc: 'DnB liquide, breaks rapides 174 BPM, bassline roulante, vibe énergique.',
      audio: '/audio/pack-solo/DJ Snake - Paradise (VIP House Edit).mp3',
      trackTitle: 'Liquid Motion - DnB Mix',
      playerColor: 'green' as const,
      category: 'autre',
    },
  ];

  const packs = allPacks.filter(pack => pack.category === activeCategory);

  return (
    <div className="min-h-screen bg-bg-primary text-white font-poppins">
      {/* Logo centré en haut */}
      <div className="bg-bg-primary/95 backdrop-blur-neon border-b border-neon-violet/20 py-8">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-neon border-b border-neon-violet/20 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-12 text-text-secondary">
            <a href="#packs" className="hover:text-neon-violet hover:text-glow-violet transition-all duration-300 font-medium">
              Packs
            </a>
            <a href="#about" className="hover:text-neon-violet hover:text-glow-violet transition-all duration-300 font-medium">
              À propos
            </a>
            <a href="/contact" className="hover:text-neon-violet hover:text-glow-violet transition-all duration-300 font-medium">
              Contact
            </a>
          </div>
          
          {/* Icône panier */}
          <CartIcon onClick={() => setIsCartOpen(true)} />
        </div>
      </nav>

      {/* Section Héro */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-6 overflow-hidden">
        {/* Fond avec gradient et halo violet néon */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-card to-bg-primary"></div>
        <div className="absolute inset-0 radial-glow-violet"></div>
        
        {/* Contenu */}
        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            className="relative text-6xl md:text-7xl font-light tracking-widest text-text-primary drop-shadow-[0_0_15px_rgba(155,92,246,0.8)] mb-6"
          >
            {/* Éclairs animés */}
            {showLightning && (
              <>
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.5, ease: "linear" }}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(155,92,246,0.8) 45%, rgba(0,229,255,1) 50%, rgba(155,92,246,0.8) 55%, transparent 100%)',
                    filter: 'blur(2px)',
                  }}
                />
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.5, ease: "linear", delay: 0.1 }}
                  className="absolute inset-0 w-2 h-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent, rgba(0,229,255,1), transparent)',
                    boxShadow: '0 0 20px rgba(0,229,255,1), 0 0 40px rgba(155,92,246,0.8)',
                  }}
                />
              </>
            )}
            
            <span className={showLightning ? 'text-glow-cyan' : ''}>
              Remixes d'exception, signature anonyme.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-text-secondary max-w-2xl mb-10 text-lg leading-relaxed mx-auto"
          >
            Des packs exclusifs créés pour ceux qui veulent exploser sans se montrer.<br />
            Un univers sonore inspiré, premium et 100% anonyme.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Button size="lg" className="text-lg font-semibold shadow-xl">
              Découvrir les Packs
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Packs */}
      <section id="packs" className="px-6 py-24 bg-black overflow-hidden">
        {/* Titre avec effet de relief ultra violet */}
        <h3 
          className="text-center text-5xl font-bold mb-8 text-text-primary"
          style={{
            textShadow: `
              0 0 10px rgba(155, 92, 246, 1),
              0 0 20px rgba(155, 92, 246, 0.8),
              0 0 30px rgba(155, 92, 246, 0.6),
              2px 2px 0px rgba(155, 92, 246, 0.5),
              4px 4px 0px rgba(123, 72, 206, 0.4),
              6px 6px 0px rgba(91, 52, 166, 0.3),
              8px 8px 10px rgba(0, 0, 0, 0.5)
            `,
            color: '#F5F5F7',
            letterSpacing: '0.05em'
          }}
        >
          Nos Packs Exclusifs
        </h3>

        {/* Catégories / Filtres */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveCategory('house')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              activeCategory === 'house'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_20px_rgba(0,229,255,0.6)] scale-110'
                : 'bg-bg-card border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]'
            }`}
          >
            🏠 Remix House
          </button>
          <button
            onClick={() => setActiveCategory('afro')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              activeCategory === 'afro'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-110'
                : 'bg-bg-card border border-pink-500/30 text-pink-400 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]'
            }`}
          >
            🌍 Remix Afro
          </button>
          <button
            onClick={() => setActiveCategory('rap')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              activeCategory === 'rap'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] scale-110'
                : 'bg-bg-card border border-red-500/30 text-red-400 hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]'
            }`}
          >
            🎤 Remix Rap FR
          </button>
          <button
            onClick={() => setActiveCategory('autre')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              activeCategory === 'autre'
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] scale-110'
                : 'bg-bg-card border border-violet-500/30 text-violet-400 hover:border-violet-400 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]'
            }`}
          >
            ⚡ Remix Autre
          </button>
          <button
            onClick={() => setActiveCategory('services')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              activeCategory === 'services'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-[0_0_20px_rgba(234,179,8,0.6)] scale-110'
                : 'bg-bg-card border border-yellow-500/30 text-yellow-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]'
            }`}
          >
            🎧 Services DJ
          </button>
        </div>
        
        {/* Zone avec INTRO VIDÉO ANIMÉE - avec logo et effets lumineux */}
        <div className="relative">
          {/* Intro vidéo animée avec logo Ghost Remix Pack */}
          <VideoIntro />
          
          {/* Cartes par-dessus la vidéo */}
          <div className="relative" style={{ zIndex: 10 }}>
          
          {/* Grille de packs - 3 colonnes pour afficher 5 packs */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packs.map((pack, idx) => {
            // Couleurs adaptées selon la catégorie
            const packColors = activeCategory === 'services' ? [
              { border: 'border-violet-500/40 hover:border-violet-400', glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,1),0_0_80px_rgba(139,92,246,0.8),0_0_120px_rgba(139,92,246,0.6)]', lightningColor: 'rgba(139,92,246,1)' }, // 1 - Violet
              { border: 'border-cyan-500/40 hover:border-cyan-400', glow: 'hover:shadow-[0_0_40px_rgba(0,229,255,1),0_0_80px_rgba(0,229,255,0.8),0_0_120px_rgba(0,229,255,0.6)]', lightningColor: 'rgba(0,229,255,1)' }, // 2 - Cyan
              { border: 'border-pink-500/40 hover:border-pink-400', glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,1),0_0_80px_rgba(236,72,153,0.8),0_0_120px_rgba(236,72,153,0.6)]', lightningColor: 'rgba(236,72,153,1)' }, // 3 - Rose
              { border: 'border-green-500/40 hover:border-green-400', glow: 'hover:shadow-[0_0_40px_rgba(34,197,94,1),0_0_80px_rgba(34,197,94,0.8),0_0_120px_rgba(34,197,94,0.6)]', lightningColor: 'rgba(34,197,94,1)' }, // 4 - Vert
            ] : [
              { border: 'border-cyan-500/40 hover:border-cyan-400', glow: 'hover:shadow-[0_0_40px_rgba(0,229,255,1),0_0_80px_rgba(0,229,255,0.8),0_0_120px_rgba(0,229,255,0.6)]', lightningColor: 'rgba(0,229,255,1)' }, // 1 - Cyan
              { border: 'border-violet-500/40 hover:border-violet-400', glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,1),0_0_80px_rgba(139,92,246,0.8),0_0_120px_rgba(139,92,246,0.6)]', lightningColor: 'rgba(139,92,246,1)' }, // 2 - Violet
              { border: 'border-pink-500/40 hover:border-pink-400', glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,1),0_0_80px_rgba(236,72,153,0.8),0_0_120px_rgba(236,72,153,0.6)]', lightningColor: 'rgba(236,72,153,1)' }, // 3 - Rose
              { border: 'border-green-500/40 hover:border-green-400', glow: 'hover:shadow-[0_0_40px_rgba(34,197,94,1),0_0_80px_rgba(34,197,94,0.8),0_0_120px_rgba(34,197,94,0.6)]', lightningColor: 'rgba(34,197,94,1)' }, // 4 - Vert
              { border: 'border-red-500/40 hover:border-red-400', glow: 'hover:shadow-[0_0_40px_rgba(239,68,68,1),0_0_80px_rgba(239,68,68,0.8),0_0_120px_rgba(239,68,68,0.6)]', lightningColor: 'rgba(239,68,68,1)' }, // 5 - Rouge
              { border: 'border-orange-500/40 hover:border-orange-400', glow: 'hover:shadow-[0_0_40px_rgba(249,115,22,1),0_0_80px_rgba(249,115,22,0.8),0_0_120px_rgba(249,115,22,0.6)]', lightningColor: 'rgba(249,115,22,1)' }, // 6 - Orange
            ];
            
            const isLightning = packLightning === idx;
            
            return (
            <Card 
              key={idx} 
              className={`bg-bg-card border-[2px] ${packColors[idx].border} ${packColors[idx].glow} hover:scale-105 hover:-translate-y-1 transition-all duration-500 rounded-lg shadow-lg cursor-pointer group relative overflow-visible ${
                isLightning ? 'animate-glow-pulse-intense scale-105' : ''
              }`}
              style={isLightning ? {
                boxShadow: `0 0 50px ${packColors[idx].lightningColor}, 0 0 100px ${packColors[idx].lightningColor}, 0 0 150px ${packColors[idx].lightningColor}`,
              } : {}}
            >
              <CardContent className="p-4 text-center relative">
                {/* Éclair qui fait le tour de la carte */}
                {isLightning && (
                  <>
                    {/* Flash global instantané */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.8, 0] }}
                      transition={{ duration: 0.2 }}
                      className="absolute -inset-2 rounded-2xl pointer-events-none z-20"
                      style={{
                        boxShadow: `0 0 80px ${packColors[idx].lightningColor}, inset 0 0 50px ${packColors[idx].lightningColor}`,
                      }}
                    />
                    
                    {/* Ligne d'éclair qui trace le contour */}
                    <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none z-20" style={{ left: '-8px', top: '-8px' }}>
                      <motion.rect
                        x="4"
                        y="4"
                        width="calc(100% - 8px)"
                        height="calc(100% - 8px)"
                        rx="16"
                        fill="none"
                        stroke={packColors[idx].lightningColor}
                        strokeWidth="6"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: [0, 1],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{
                          filter: `drop-shadow(0 0 20px ${packColors[idx].lightningColor}) drop-shadow(0 0 40px ${packColors[idx].lightningColor})`,
                        }}
                      />
                    </svg>
                  </>
                )}
                
                {/* Halo lumineux qui pulse au hover */}
                <div className="absolute -inset-4 bg-gradient-to-r from-neon-violet/0 via-neon-violet/20 to-neon-cyan/0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                
                {/* Badge EXCLUSIF */}
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-neon-violet to-neon-cyan px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-[0_0_15px_rgba(155,92,246,0.8)] animate-glow-pulse group-hover:scale-110 transition-transform duration-300">
                  🔥
                </div>
                
                <h4 className="text-lg mb-1 font-semibold text-text-primary group-hover:text-neon-violet group-hover:text-glow-violet transition-all duration-300">{pack.name}</h4>
                <p className="text-neon-violet text-xl font-bold mb-2 drop-shadow-[0_0_10px_rgba(155,92,246,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(155,92,246,1)] transition-all duration-300">{pack.price}</p>
                <p className="text-text-secondary text-xs mb-3 group-hover:text-text-primary transition-colors">{pack.desc}</p>
                
                {/* Lecteur audio stylé */}
                {pack.audio && pack.trackTitle && pack.playerColor && (
                  <div className="mb-3">
                    <PackAudioPlayer 
                      audioUrl={pack.audio}
                      trackTitle={pack.trackTitle}
                      color={pack.playerColor}
                    />
                  </div>
                )}
                
                {pack.category === 'services' ? (
                  <a href={`mailto:contact@ghostremixpack.com?subject=Demande de devis - ${pack.name}`} className="block">
                    <Button size="sm" className="w-full shadow-md text-xs group-hover:shadow-[0_0_20px_rgba(234,179,8,0.8)] group-hover:scale-105 group-hover:brightness-125 transition-all bg-gradient-to-r from-yellow-500 to-orange-500">
                      📧 Nous contacter
                    </Button>
                  </a>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => handleAddToCart({
                      id: `${pack.category}-${idx}`,
                      name: pack.name,
                      price: pack.price,
                      description: pack.desc,
                      category: pack.category,
                      audio: pack.audio,
                      trackTitle: pack.trackTitle,
                      playerColor: pack.playerColor
                    })}
                    className="w-full shadow-md text-xs group-hover:shadow-[0_0_20px_rgba(0,229,255,0.8)] group-hover:scale-105 group-hover:brightness-125 transition-all"
                  >
                    🛒 Ajouter au panier
                  </Button>
                )}
              </CardContent>
            </Card>
          );
          })}
          </div>
          {/* Fin de la zone avec cartes */}
          </div>
          {/* Fin de la zone avec vidéo */}
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className="py-24 px-8 bg-gradient-to-b from-bg-card to-bg-primary">
        <div className="max-w-6xl mx-auto">
          {/* Titre et intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-text-primary mb-6">
              Pourquoi <span className="text-neon-violet">Ghost Remix</span> ?
            </h3>
            <p className="max-w-3xl mx-auto text-text-secondary text-lg leading-relaxed mb-8">
              Ghost Remix, c'est une équipe de <strong className="text-neon-violet">producteurs fantômes</strong> au service de votre réussite.<br />
              Nous travaillons déjà avec des artistes, DJs, influenceurs et festivals reconnus à travers l'Europe.<br />
              Chaque pack est <strong className="text-neon-cyan">unique, exclusif</strong> et livré anonymement. Vous gardez <strong>100% des droits d'exploitation</strong>.
            </p>
          </motion.div>

          {/* Statistiques clés */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-bg-card p-6 rounded-xl border border-neon-violet/20 hover:border-neon-violet/40 hover:glow-violet transition-all duration-300"
            >
              <div className="text-4xl font-bold text-neon-violet mb-1">85%</div>
              <div className="text-text-primary font-semibold text-sm mb-1">Taux d'efficacité</div>
              <div className="text-text-secondary text-xs">En club et festivals</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-bg-card p-6 rounded-xl border border-neon-cyan/20 hover:border-neon-cyan/40 hover:glow-cyan transition-all duration-300"
            >
              <div className="text-4xl font-bold text-neon-cyan mb-1">48h</div>
              <div className="text-text-primary font-semibold text-sm mb-1">Livraison express</div>
              <div className="text-text-secondary text-xs">Après validation paiement</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-bg-card p-6 rounded-xl border border-neon-violet/20 hover:border-neon-violet/40 hover:glow-violet transition-all duration-300"
            >
              <div className="text-4xl font-bold text-neon-violet mb-1">100%</div>
              <div className="text-text-primary font-semibold text-sm mb-1">Droits exclusifs</div>
              <div className="text-text-secondary text-xs">Vous gardez tout</div>
            </motion.div>
          </div>

          {/* Avantages en grille */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-bg-card p-4 rounded-lg border border-transparent hover:border-neon-violet/30 hover:glow-violet transition-all duration-300"
            >
              <Shield className="w-8 h-8 text-neon-violet mb-3 mx-auto" />
              <h4 className="text-text-primary font-semibold text-base mb-1">Anonymat garanti</h4>
              <p className="text-text-secondary text-xs">
                Identité strictement confidentielle
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-bg-card p-4 rounded-lg border border-transparent hover:border-neon-cyan/30 hover:glow-cyan transition-all duration-300"
            >
              <Zap className="w-8 h-8 text-neon-cyan mb-3 mx-auto" />
              <h4 className="text-text-primary font-semibold text-base mb-1">Qualité professionnelle</h4>
              <p className="text-text-secondary text-xs">
                DJs actifs, testé en club
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-bg-card p-4 rounded-lg border border-transparent hover:border-neon-violet/30 hover:glow-violet transition-all duration-300"
            >
              <Crown className="w-8 h-8 text-neon-violet mb-3 mx-auto" />
              <h4 className="text-text-primary font-semibold text-base mb-1">Exclusivité totale</h4>
              <p className="text-text-secondary text-xs">
                Un pack = une seule vente
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-bg-card p-4 rounded-lg border border-transparent hover:border-neon-cyan/30 hover:glow-cyan transition-all duration-300"
            >
              <Users className="w-8 h-8 text-neon-cyan mb-3 mx-auto" />
              <h4 className="text-text-primary font-semibold text-base mb-1">Clients reconnus</h4>
              <p className="text-text-secondary text-xs">
                Artistes & festivals européens
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-bg-card p-4 rounded-lg border border-transparent hover:border-neon-violet/30 hover:glow-violet transition-all duration-300"
            >
              <Award className="w-8 h-8 text-neon-violet mb-3 mx-auto" />
              <h4 className="text-text-primary font-semibold text-base mb-1">Hits européens</h4>
              <p className="text-text-secondary text-xs">
                Production haut de gamme
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-bg-card p-4 rounded-lg border border-transparent hover:border-neon-cyan/30 hover:glow-cyan transition-all duration-300"
            >
              <Lock className="w-8 h-8 text-neon-cyan mb-3 mx-auto" />
              <h4 className="text-text-primary font-semibold text-base mb-1">Sans tag ni signature</h4>
              <p className="text-text-secondary text-xs">
                Fichiers WAV prêts à diffuser
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-24 px-8 bg-bg-primary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-text-primary mb-4">
              Ils nous font <span className="text-neon-violet">confiance</span>
            </h3>
            <p className="text-text-secondary">
              Découvrez les retours de DJs, artistes et créateurs qui utilisent nos packs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Témoignage 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-bg-card p-6 rounded-2xl border border-neon-violet/20 hover:border-neon-violet/40 hover:glow-violet transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 text-neon-violet/20" size={40} />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-neon-violet text-neon-violet" />
                ))}
              </div>
              
              <p className="text-text-secondary text-sm mb-6 leading-relaxed italic">
                "J'ai acheté le Pack Pro et honnêtement, la qualité est dingue. Les remixes sont testés en club, ça s'entend direct. Et l'anonymat total me permet de les utiliser sans partager les crédits. Top !"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-violet to-neon-cyan flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <div className="text-text-primary font-semibold">Maxime L.</div>
                  <div className="text-text-secondary text-xs">DJ Resident • Paris</div>
                </div>
              </div>
            </motion.div>

            {/* Témoignage 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-bg-card p-6 rounded-2xl border border-neon-cyan/20 hover:border-neon-cyan/40 hover:glow-cyan transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 text-neon-cyan/20" size={40} />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-neon-cyan text-neon-cyan" />
                ))}
              </div>
              
              <p className="text-text-secondary text-sm mb-6 leading-relaxed italic">
                "Le concept est génial. J'ai pris le Pack Ultra pour mon set de festival et le résultat a été incroyable. Les gens pensaient que c'était mes productions ! Livraison rapide, fichiers WAV nickel."
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <div className="text-text-primary font-semibold">Sarah D.</div>
                  <div className="text-text-secondary text-xs">Producer • Lyon</div>
                </div>
              </div>
            </motion.div>

            {/* Témoignage 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-bg-card p-6 rounded-2xl border border-neon-violet/20 hover:border-neon-violet/40 hover:glow-violet transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 text-neon-violet/20" size={40} />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-neon-violet text-neon-violet" />
                ))}
              </div>
              
              <p className="text-text-secondary text-sm mb-6 leading-relaxed italic">
                "Exactement ce que je cherchais : du contenu exclusif sans avoir à créditer qui que ce soit. Parfait pour booster mon catalogue tout en gardant mon identité. Je recommande à 100%."
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-violet to-neon-cyan flex items-center justify-center text-white font-bold">
                  T
                </div>
                <div>
                  <div className="text-text-primary font-semibold">Thomas K.</div>
                  <div className="text-text-secondary text-xs">Content Creator • Marseille</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-text-secondary mb-4">
              Rejoignez les <span className="text-neon-violet font-bold">150+ DJs</span> qui utilisent déjà nos remixes
            </p>
            <Button size="lg" onClick={() => window.location.href = '#packs'}>
              Découvrir les Packs Disponibles
            </Button>
          </motion.div>
        </div>
      </section>


      {/* Pied de page */}
      <footer className="border-t border-neon-violet/20 bg-bg-primary py-12 text-center">
        <div className="max-w-6xl mx-auto px-6">
          {/* Logo / Titre */}
          <h2 className="text-xl font-extralight tracking-[0.3em] text-text-primary mb-4">
            GHOST REMIX PACK
          </h2>
          
          {/* Description */}
          <p className="text-text-secondary mb-6 text-sm">
            © 2025 Ghost Remix Pack — Remixes d'exception, signature anonyme.
          </p>
          
          {/* Newsletter Form */}
          <Newsletter variant="default" className="max-w-2xl mx-auto" />
          
          {/* Infos légales */}
          <p className="text-text-secondary/70 text-xs mb-6 max-w-2xl mx-auto mt-8">
            Tous les remixes sont livrés sous licence anonyme. Utilisation libre et confidentielle.
          </p>
          
          {/* Liens */}
          <div className="flex justify-center gap-6 mb-4">
            <a 
              href="/mentions-legales" 
              className="text-text-secondary hover:text-neon-violet hover:text-glow-violet transition-all duration-300 text-sm font-medium"
            >
              Mentions légales & CGV
            </a>
            <span className="text-text-secondary/40">•</span>
            <a 
              href="/contact" 
              className="text-text-secondary hover:text-neon-violet hover:text-glow-violet transition-all duration-300 text-sm font-medium"
            >
              Contact
            </a>
          </div>
          
          {/* Signature subtile */}
          <p className="text-text-secondary/40 text-xs mt-6">
            Designed with <span className="text-neon-violet">♥</span> for DJs
          </p>
        </div>

        {/* Partenaires défilants */}
        <PartnersScroll />
      </footer>

      {/* Lecteur audio du site */}
      <SiteAudioPlayer />

      {/* Notification toast */}
      <Toast 
        message={toast.message} 
        show={toast.show} 
        onClose={hideToast} 
      />

      {/* Panier latéral */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
}


