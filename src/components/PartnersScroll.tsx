import { motion } from 'framer-motion';

export default function PartnersScroll() {
  const partners = [
    { name: 'NEON STAGE', color: '#9B5CF6' },
    { name: 'PHANTOM Records', color: '#FFFFFF' },
    { name: 'PULSE Booking', color: '#00E5FF' },
    { name: 'VOLTAGE Club', color: '#FFD700' },
    { name: 'UNDERGROUND Collective', color: '#FF3366' },
  ];

  // Dupliquer pour effet de boucle infinie
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden py-8 border-t border-gray-800/50">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-transparent to-[#0B0B0F] z-10 pointer-events-none"></div>
      
      <div className="mb-3 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          Ils nous font confiance
        </p>
      </div>

      <motion.div
        className="flex gap-12 items-center"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
      >
        {duplicatedPartners.map((partner, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 px-6 py-3 rounded-full border border-gray-800 bg-black/40 backdrop-blur-sm hover:border-opacity-100 transition-all duration-300 group cursor-pointer"
            style={{
              borderColor: `${partner.color}20`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = partner.color;
              e.currentTarget.style.boxShadow = `0 0 20px ${partner.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${partner.color}20`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span
              className="text-sm font-semibold tracking-wider whitespace-nowrap transition-all duration-300"
              style={{
                color: '#B0B0C0',
              }}
            >
              {partner.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}


