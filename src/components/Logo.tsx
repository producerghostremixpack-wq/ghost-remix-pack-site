import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-3"
    >
      {/* Triangle + Texte combinés */}
      <div className="flex items-center gap-4">
        {/* Triangle SVG avec effet néon - Rotation continue */}
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 48 48" 
          className="animate-glow-pulse animate-spin-slow"
          style={{ animationDuration: '8s' }}
        >
          <defs>
            <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#9B5CF6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#00E5FF', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="triangleGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path 
            d="M24 8 L40 36 L8 36 Z" 
            fill="url(#triangleGradient)" 
            filter="url(#triangleGlow)"
            className="drop-shadow-[0_0_10px_rgba(155,92,246,0.8)]"
          />
        </svg>

        {/* Texte du logo */}
        <div className="text-left">
          <h1 className="text-3xl font-extralight tracking-[0.25em] text-text-primary leading-none mb-1">
            GHOST
          </h1>
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-neon-violet to-neon-cyan"></div>
            <span className="text-sm font-light tracking-[0.3em] text-neon-violet">REMIX PACK</span>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-text-secondary text-xs tracking-wider">
        Remixes d'exception, signature anonyme
      </p>
    </motion.div>
  );
}

