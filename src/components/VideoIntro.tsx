import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function VideoIntro() {
  const [showText, setShowText] = useState(false);
  const [glowPulse, setGlowPulse] = useState(false);

  useEffect(() => {
    // Séquence d'animation
    const textTimer = setTimeout(() => setShowText(true), 1000);
    
    // Pulse lumineux toutes les 3 secondes
    const pulseInterval = setInterval(() => {
      setGlowPulse(true);
      setTimeout(() => setGlowPulse(false), 800);
    }, 3000);

    return () => {
      clearTimeout(textTimer);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black overflow-hidden">
      {/* Particules lumineuses flottantes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-violet rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * 800,
                Math.random() * 800,
              ],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              boxShadow: '0 0 10px rgba(155, 92, 246, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Rayons lumineux */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-96 origin-bottom"
            style={{
              background: `linear-gradient(to top, rgba(155, 92, 246, 0.3), transparent)`,
              transform: `rotate(${i * 45}deg) translateY(-50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Logo Triangle Central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ 
            scale: 1, 
            rotate: 0, 
            opacity: 1,
          }}
          transition={{ 
            duration: 1.5,
            type: 'spring',
            bounce: 0.4,
          }}
          className="relative"
        >
          {/* Triangle avec rotation continue */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg 
              width="200" 
              height="200" 
              viewBox="0 0 200 200"
              className={`${glowPulse ? 'drop-shadow-[0_0_60px_rgba(155,92,246,1)]' : 'drop-shadow-[0_0_30px_rgba(155,92,246,0.8)]'} transition-all duration-300`}
            >
              <defs>
                <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9B5CF6" />
                  <stop offset="50%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#9B5CF6" />
                </linearGradient>
              </defs>
              <polygon 
                points="100,20 180,170 20,170" 
                fill="url(#triangleGradient)"
                stroke="url(#triangleGradient)"
                strokeWidth="3"
              />
            </svg>
          </motion.div>

          {/* Cercles lumineux qui pulsent */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-2 border-neon-violet/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-neon-cyan/20"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
        </motion.div>
      </div>

      {/* Textes qui tournent autour du logo - Élégants et raffinés */}
      {showText && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* GHOST en haut */}
          <motion.div
            className="absolute top-[-180px] left-1/2 -translate-x-1/2"
            style={{ rotate: 0 }}
          >
            <h1
              className="text-7xl tracking-[0.5em]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 300,
                fontStyle: 'italic',
                textShadow: `
                  0 0 20px rgba(155, 92, 246, 0.9),
                  0 0 40px rgba(155, 92, 246, 0.7),
                  0 0 60px rgba(155, 92, 246, 0.5),
                  1px 1px 2px rgba(0, 0, 0, 0.8)
                `,
                color: '#F5F5F7',
                letterSpacing: '0.5em',
              }}
            >
              GHOST
            </h1>
          </motion.div>

          {/* REMIX PACK en bas */}
          <motion.div
            className="absolute bottom-[-180px] left-1/2 -translate-x-1/2"
            style={{ rotate: 0 }}
          >
            <h2
              className="text-5xl tracking-[0.6em]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 300,
                fontStyle: 'italic',
                textShadow: `
                  0 0 20px rgba(0, 229, 255, 0.9),
                  0 0 40px rgba(0, 229, 255, 0.7),
                  0 0 60px rgba(0, 229, 255, 0.5),
                  1px 1px 2px rgba(0, 0, 0, 0.8)
                `,
                color: '#00E5FF',
                letterSpacing: '0.6em',
              }}
            >
              REMIX PACK
            </h2>
          </motion.div>
        </motion.div>
      )}

      {/* Vague lumineuse en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neon-violet/20 to-transparent" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-96 h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent blur-sm" />
      </motion.div>
    </div>
  );
}

