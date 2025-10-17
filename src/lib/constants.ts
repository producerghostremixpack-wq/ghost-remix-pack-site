/**
 * 🎵 GHOST REMIX PACK - CONSTANTES GLOBALES
 * Centralisation de toutes les constantes pour éviter la répétition
 */

// 🎨 Couleurs du thème Ghost Remix Pack
export const COLORS = {
  neonViolet: '#9B5CF6',
  neonCyan: '#00E5FF',
  bgPrimary: '#0B0B0F',
  bgCard: '#141420',
  textPrimary: '#F5F5F7',
  textSecondary: '#B0B0C0',
} as const;

// 🎨 Couleurs pour les packs par catégorie
export const PACK_COLORS = {
  house: {
    border: 'border-cyan-500/40 hover:border-cyan-400',
    glow: 'hover:shadow-[0_0_40px_rgba(0,229,255,1),0_0_80px_rgba(0,229,255,0.8),0_0_120px_rgba(0,229,255,0.6)]',
    lightningColor: 'rgba(0,229,255,1)',
    focusRing: 'focus:ring-cyan-400'
  },
  afro: {
    border: 'border-pink-500/40 hover:border-pink-400',
    glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,1),0_0_80px_rgba(236,72,153,0.8),0_0_120px_rgba(236,72,153,0.6)]',
    lightningColor: 'rgba(236,72,153,1)',
    focusRing: 'focus:ring-pink-400'
  },
  rap: {
    border: 'border-red-500/40 hover:border-red-400',
    glow: 'hover:shadow-[0_0_40px_rgba(239,68,68,1),0_0_80px_rgba(239,68,68,0.8),0_0_120px_rgba(239,68,68,0.6)]',
    lightningColor: 'rgba(239,68,68,1)',
    focusRing: 'focus:ring-red-400'
  },
  autre: {
    border: 'border-violet-500/40 hover:border-violet-400',
    glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,1),0_0_80px_rgba(139,92,246,0.8),0_0_120px_rgba(139,92,246,0.6)]',
    lightningColor: 'rgba(139,92,246,1)',
    focusRing: 'focus:ring-violet-400'
  },
  services: {
    border: 'border-yellow-500/40 hover:border-yellow-400',
    glow: 'hover:shadow-[0_0_40px_rgba(234,179,8,1),0_0_80px_rgba(234,179,8,0.8),0_0_120px_rgba(234,179,8,0.6)]',
    lightningColor: 'rgba(234,179,8,1)',
    focusRing: 'focus:ring-yellow-400'
  },
} as const;

// 🏷️ Catégories de packs avec leur configuration
export const PACK_CATEGORIES = {
  house: {
    id: 'house',
    label: '🏠 Remix House',
    description: 'Afficher les remixes House',
    gradient: 'from-cyan-500 to-blue-500',
    shadowActive: 'shadow-[0_0_20px_rgba(0,229,255,0.6)]',
    shadowHover: 'hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]',
    borderColor: 'border-cyan-500/30 text-cyan-400 hover:border-cyan-400',
  },
  afro: {
    id: 'afro',
    label: '🌍 Remix Afro',
    description: 'Afficher les remixes Afro',
    gradient: 'from-pink-500 to-rose-500',
    shadowActive: 'shadow-[0_0_20px_rgba(236,72,153,0.6)]',
    shadowHover: 'hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]',
    borderColor: 'border-pink-500/30 text-pink-400 hover:border-pink-400',
  },
  rap: {
    id: 'rap',
    label: '🎤 Remix Rap FR',
    description: 'Afficher les remixes Rap français',
    gradient: 'from-red-500 to-orange-500',
    shadowActive: 'shadow-[0_0_20px_rgba(239,68,68,0.6)]',
    shadowHover: 'hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    borderColor: 'border-red-500/30 text-red-400 hover:border-red-400',
  },
  autre: {
    id: 'autre',
    label: '⚡ Remix Autre',
    description: 'Afficher les autres types de remixes',
    gradient: 'from-violet-500 to-purple-500',
    shadowActive: 'shadow-[0_0_20px_rgba(139,92,246,0.6)]',
    shadowHover: 'hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]',
    borderColor: 'border-violet-500/30 text-violet-400 hover:border-violet-400',
  },
  services: {
    id: 'services',
    label: '🎧 Services DJ',
    description: 'Afficher les services DJ personnalisés',
    gradient: 'from-yellow-500 to-orange-500',
    shadowActive: 'shadow-[0_0_20px_rgba(234,179,8,0.6)]',
    shadowHover: 'hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]',
    borderColor: 'border-yellow-500/30 text-yellow-400 hover:border-yellow-400',
  },
} as const;

// 📱 Breakpoints responsive
export const BREAKPOINTS = {
  sm: '640px',   // Mobile landscape et plus
  md: '768px',   // Tablette et plus
  lg: '1024px',  // Desktop et plus
  xl: '1280px',  // Large desktop et plus
  '2xl': '1536px', // Extra large desktop et plus
} as const;

// ⏱️ Durées d'animation
export const ANIMATION_DURATIONS = {
  fast: 150,      // 0.15s - Micro-interactions
  normal: 300,    // 0.3s - Transitions standard
  slow: 500,      // 0.5s - Animations complexes
  verySlow: 800,  // 0.8s - Animations d'entrée
} as const;

// 🌐 URLs et configuration API
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app',
  endpoints: {
    contact: '/api/contact',
    newsletter: '/api/newsletter',
    checkout: '/api/checkout/create-session',
    stripe: '/api/stripe',
    health: '/api/health',
  },
  timeout: 10000, // 10 secondes
} as const;

// 📧 Configuration email
export const EMAIL_CONFIG = {
  supportEmail: 'contact@ghostremixpack.com',
  noreplyEmail: 'noreply@ghostremixpack.com',
  subjectPrefix: '[Ghost Remix Pack]',
} as const;

// 🎵 Configuration audio
export const AUDIO_CONFIG = {
  supportedFormats: ['.mp3', '.wav', '.aiff', '.flac'],
  maxFileSize: 50 * 1024 * 1024, // 50MB
  previewDuration: 30, // 30 secondes
  fadeInDuration: 1000, // 1 seconde
  fadeOutDuration: 1000, // 1 seconde
} as const;

// 🛒 Configuration panier
export const CART_CONFIG = {
  maxItems: 50,
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 heures en millisecondes
  storageKey: 'ghostRemixCart',
  currency: '€',
  defaultCurrency: 'EUR',
} as const;

// 🔒 Configuration sécurité
export const SECURITY_CONFIG = {
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
  tokenExpiry: 24 * 60 * 60 * 1000, // 24 heures
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  maxImageSize: 5 * 1024 * 1024, // 5MB
} as const;

// 📊 Configuration analytics
export const ANALYTICS_CONFIG = {
  events: {
    pageView: 'page_view',
    packView: 'pack_view',
    addToCart: 'add_to_cart',
    purchase: 'purchase',
    newsletterSubscribe: 'newsletter_subscribe',
    contactSubmit: 'contact_submit',
  },
} as const;

// 🎨 Classes CSS communes
export const CSS_CLASSES = {
  button: {
    primary: 'bg-gradient-to-r from-neon-violet to-neon-cyan text-white rounded-full glow-violet hover:scale-105 hover:brightness-125 font-semibold transition-all duration-300',
    secondary: 'border-2 border-neon-violet bg-transparent text-neon-violet hover:bg-neon-violet/10 hover:glow-violet rounded-full transition-all duration-300',
    ghost: 'text-text-secondary hover:text-neon-violet hover:bg-bg-card transition-colors duration-300',
  },
  card: {
    default: 'bg-bg-card border border-neon-violet/20 hover:border-neon-violet/40 rounded-xl transition-all duration-300',
    interactive: 'bg-bg-card border-[2px] hover:scale-105 hover:-translate-y-1 transition-all duration-500 rounded-lg shadow-lg cursor-pointer group relative overflow-visible',
  },
  text: {
    title: 'text-text-primary font-bold',
    subtitle: 'text-text-secondary',
    accent: 'text-neon-violet',
    glow: 'drop-shadow-[0_0_15px_rgba(155,92,246,0.8)]',
  },
  focus: 'focus:outline-none focus:ring-2 focus:ring-neon-violet focus:ring-offset-2 focus:ring-offset-bg-primary',
} as const;

// 🌍 Configuration i18n (pour l'avenir)
export const I18N_CONFIG = {
  defaultLocale: 'fr',
  supportedLocales: ['fr', 'en'] as const,
  fallbackLocale: 'fr',
} as const;

// 📏 Tailles standard
export const SIZES = {
  containerMaxWidth: '1200px',
  sidebarWidth: '320px',
  headerHeight: '64px',
  footerHeight: '120px',
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
} as const;

// 🎯 Types des catégories (pour TypeScript)
export type PackCategory = keyof typeof PACK_CATEGORIES;
export type PackColor = keyof typeof PACK_COLORS;
export type AnimationDuration = keyof typeof ANIMATION_DURATIONS;
export type SupportedLocale = typeof I18N_CONFIG.supportedLocales[number];
