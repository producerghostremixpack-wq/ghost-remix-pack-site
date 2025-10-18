import { motion } from 'framer-motion';
import { 
  Search, 
  Activity, 
  Shield, 
  Smartphone, 
  Code, 
  Music, 
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';

export default function DebuggerPage() {
  const openDebugger = () => {
    window.open('/debugger.html', '_blank');
  };

  const features = [
    {
      icon: <Search className="text-neon-violet" size={24} />,
      title: "Diagnostic Complet",
      description: "Analyse approfondie de votre site Ghost Remix Pack",
      tests: ["DNS & Disponibilité", "Performance", "SEO Musical"]
    },
    {
      icon: <Shield className="text-neon-cyan" size={24} />,
      title: "Sécurité Stripe",
      description: "Vérification de la sécurité des paiements",
      tests: ["SSL/HTTPS", "API Keys", "Webhooks"]
    },
    {
      icon: <Music className="text-purple-400" size={24} />,
      title: "Audio & E-commerce",
      description: "Tests spécifiques pour l'e-commerce musical",
      tests: ["Player Audio", "Previews", "Téléchargements"]
    },
    {
      icon: <Smartphone className="text-pink-400" size={24} />,
      title: "Interface Mobile",
      description: "Optimisation pour les DJs mobiles",
      tests: ["Responsive Design", "Touch Controls", "Mobile Checkout"]
    },
    {
      icon: <Code className="text-green-400" size={24} />,
      title: "Code Quality",
      description: "Validation technique React/TypeScript",
      tests: ["HTML5", "CSS Tailwind", "JavaScript"]
    },
    {
      icon: <Activity className="text-yellow-400" size={24} />,
      title: "Performance",
      description: "Optimisation vitesse et UX",
      tests: ["Load Time", "Compression", "Cache"]
    }
  ];

  const stats = [
    { label: "Tests Disponibles", value: "60+", color: "text-neon-violet" },
    { label: "Catégories", value: "12", color: "text-neon-cyan" },
    { label: "Précision", value: "98%", color: "text-green-400" },
    { label: "Temps Moyen", value: "2min", color: "text-yellow-400" }
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-gradient-to-r from-neon-violet to-neon-cyan py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-6xl">👻</span>
              <h1 className="text-5xl font-bold text-white">
                Ghost Debugger Pro
              </h1>
              <span className="text-6xl">👻</span>
            </div>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Outil de diagnostic complet pour optimiser votre site Ghost Remix Pack. 
              Analysez performance, sécurité, SEO et e-commerce musical en temps réel.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={openDebugger}
                className="bg-white text-neon-violet px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 shadow-lg"
              >
                <Search size={24} />
                Lancer le Diagnostic
                <ExternalLink size={20} />
              </button>
              
              <a
                href="#features"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Découvrir les fonctionnalités
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-bg-card border border-neon-violet/20 rounded-xl p-6"
              >
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-20 bg-bg-primary">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Fonctionnalités Avancées
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Diagnostic technique complet spécialement conçu pour les sites d'e-commerce musical
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-bg-card border border-neon-violet/20 rounded-xl p-6 hover:border-neon-violet/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-bold text-text-primary">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-text-secondary mb-4">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.tests.map((test, testIndex) => (
                    <div key={testIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="text-green-400" size={16} />
                      <span className="text-text-secondary">{test}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="py-20 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Comment ça marche
            </h2>
            <p className="text-xl text-text-secondary">
              Diagnostic en 3 étapes simples
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-neon-violet to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Entrez votre URL
              </h3>
              <p className="text-text-secondary">
                Saisissez l'URL de votre site Ghost Remix Pack et sélectionnez les tests à effectuer
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-neon-cyan to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Analyse automatique
              </h3>
              <p className="text-text-secondary">
                Notre outil analyse automatiquement plus de 60 points critiques de votre site
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Rapport détaillé
              </h3>
              <p className="text-text-secondary">
                Recevez un rapport complet avec recommandations pour optimiser votre site
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Fix Feature */}
      <div className="py-20 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-neon-violet/20 to-neon-cyan/20 border border-neon-violet/30 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Zap className="text-yellow-400" size={32} />
                <h2 className="text-3xl font-bold text-text-primary">
                  Ghost Fix Automatique
                </h2>
              </div>
              
              <p className="text-xl text-text-secondary mb-8">
                Correction automatique des problèmes courants détectés sur votre site Ghost Remix Pack
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  <span className="text-text-secondary">Optimisation player audio</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  <span className="text-text-secondary">Compression des images</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  <span className="text-text-secondary">Cache navigateur</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  <span className="text-text-secondary">Sécurité SSL/HTTPS</span>
                </div>
              </div>

              <button
                onClick={openDebugger}
                className="bg-gradient-to-r from-neon-violet to-neon-cyan text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-neon-violet/30 transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <Zap size={24} />
                Essayer Ghost Fix
                <ExternalLink size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Warning */}
      <div className="py-12 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">
                  Outil de Diagnostic Avancé
                </h3>
                <p className="text-text-secondary">
                  Cet outil est conçu spécifiquement pour Ghost Remix Pack et les sites d'e-commerce musical. 
                  Il simule des tests réalistes et fournit des recommandations personnalisées pour optimiser 
                  votre plateforme de vente de packs audio.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à optimiser votre Ghost Remix Pack ?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Lancez le diagnostic complet maintenant et découvrez comment améliorer 
              les performances de votre site d'e-commerce musical.
            </p>
            
            <button
              onClick={openDebugger}
              className="bg-white text-purple-900 px-12 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 flex items-center gap-4 mx-auto shadow-2xl"
            >
              <Search size={28} />
              Démarrer le Diagnostic Ghost
              <ExternalLink size={24} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

