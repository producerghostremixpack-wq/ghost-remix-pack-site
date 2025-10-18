import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Mail, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  Download,
  Star,
  Clock,
  Music,
  Shield,
  Zap
} from 'lucide-react';
import PaymentButton from './PaymentButton';
import QuickBuyModal from './QuickBuyModal';

export default function TestPaiementComplet() {
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);
  const [testEmail, setTestEmail] = useState('contact@ghostremixpack.com');
  const [testName, setTestName] = useState('Test Ghost');
  const [testResults, setTestResults] = useState<any[]>([]);

  // Pack Complet à tester
  const packComplet = {
    id: 'pack-complet',
    name: 'Pack Complet Ghost',
    price: 45,
    originalPrice: 53,
    description: 'Tous les packs + bonus exclusifs (Économie 8€)',
    features: [
      '37+ tracks WAV haute qualité',
      'Tous les stems séparés',
      '50+ samples premium exclusifs', 
      'Pack House Premium (15 tracks)',
      'Pack Afro Vibes (12 tracks)',
      'Pack Rap FR (10 tracks)',
      'Bonus exclusifs Ghost',
      'Licence commerciale incluse'
    ],
    savings: 8,
    totalValue: 53,
    image: null
  };

  const addTestResult = (step: string, status: 'success' | 'warning' | 'error', message: string) => {
    const newResult = {
      id: Date.now(),
      step,
      status,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => [...prev, newResult]);
  };

  const handleTestPayment = () => {
    addTestResult('Test Paiement', 'success', 'Redirection vers Stripe Checkout initiée');
  };

  const handleTestQuickBuy = () => {
    if (!testEmail) {
      addTestResult('Test Quick Buy', 'error', 'Email requis pour le test');
      return;
    }
    addTestResult('Test Quick Buy', 'success', `Test avec email: ${testEmail}`);
    setIsQuickBuyOpen(true);
  };

  const cartes_test = [
    {
      numero: '4242 4242 4242 4242',
      type: 'Visa (Succès)',
      cvc: '123',
      date: '12/34',
      resultat: 'Paiement réussi ✅',
      color: 'text-green-400'
    },
    {
      numero: '4000 0025 0000 3155',
      type: 'Visa (3D Secure)',
      cvc: '123', 
      date: '12/34',
      resultat: 'Authentification requise 🔐',
      color: 'text-blue-400'
    },
    {
      numero: '4000 0000 0000 0002',
      type: 'Visa (Échec)',
      cvc: '123',
      date: '12/34', 
      resultat: 'Paiement refusé ❌',
      color: 'text-red-400'
    },
    {
      numero: '5555 5555 5555 4444',
      type: 'Mastercard (Succès)',
      cvc: '123',
      date: '12/34',
      resultat: 'Paiement réussi ✅',
      color: 'text-green-400'
    }
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header Test */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <CreditCard className="text-white" size={48} />
              <h1 className="text-5xl font-bold text-white">
                Test Paiement Pack Complet
              </h1>
              <Mail className="text-white" size={48} />
            </div>
            
            <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
              Test complet du paiement Pack Complet Ghost (45€) avec vérification email automatique
            </p>

            <div className="bg-white/20 rounded-xl p-4 inline-block">
              <div className="flex items-center gap-3 text-white font-bold text-lg">
                <Star className="fill-current text-yellow-300" size={24} />
                <span>Pack Complet : 45€ au lieu de 53€</span>
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm">-8€</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Colonne gauche - Pack à tester */}
          <div className="space-y-6">
            {/* Pack Complet */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-bg-card border-2 border-yellow-500/30 rounded-2xl overflow-hidden"
            >
              {/* Badge Premium */}
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center py-3 font-bold">
                🏆 FORMULE COMPLÈTE - MEILLEURE VALEUR 🏆
              </div>

              {/* Image produit */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Music className="text-purple-400" size={64} />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Économie 8€
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-text-primary mb-2">
                    {packComplet.name}
                  </h2>
                  <p className="text-text-secondary mb-4">
                    {packComplet.description}
                  </p>
                  
                  {/* Prix */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-4xl font-bold text-yellow-500">{packComplet.price}€</span>
                    <span className="text-2xl line-through text-text-secondary">{packComplet.originalPrice}€</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                    <CheckCircle className="text-green-400" size={20} />
                    Contenu inclus :
                  </h3>
                  <div className="space-y-2">
                    {packComplet.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div className="bg-bg-primary rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-400">37+</div>
                    <div className="text-xs text-text-secondary">Tracks</div>
                  </div>
                  <div className="bg-bg-primary rounded-lg p-3">
                    <div className="text-2xl font-bold text-pink-400">5h30</div>
                    <div className="text-xs text-text-secondary">Durée</div>
                  </div>
                  <div className="bg-bg-primary rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-400">8€</div>
                    <div className="text-xs text-text-secondary">Économie</div>
                  </div>
                </div>

                {/* Boutons de test */}
                <div className="space-y-3">
                  <PaymentButton
                    productId={packComplet.id}
                    productName={packComplet.name}
                    price={packComplet.price}
                    originalPrice={packComplet.originalPrice}
                    description={packComplet.description}
                    size="lg"
                    variant="primary"
                    className="w-full"
                    customerInfo={{
                      email: testEmail,
                      name: testName
                    }}
                    onSuccess={handleTestPayment}
                  />
                  
                  <button
                    onClick={handleTestQuickBuy}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Zap size={20} />
                    Test Achat Rapide
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Configuration Test */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-bg-card border border-blue-500/30 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Mail className="text-blue-400" size={20} />
                Configuration Email Test
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email de test *
                  </label>
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 outline-none"
                    placeholder="contact@ghostremixpack.com"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    L'email de confirmation sera envoyé à cette adresse
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Nom pour le test
                  </label>
                  <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 outline-none"
                    placeholder="Test Ghost"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite - Instructions test */}
          <div className="space-y-6">
            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-bg-card border border-green-500/30 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                Instructions Test Paiement
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                  <div>
                    <p className="font-semibold text-text-primary">Configurer l'email de test</p>
                    <p className="text-text-secondary text-sm">Utilisez contact@ghostremixpack.com pour recevoir l'email</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                  <div>
                    <p className="font-semibold text-text-primary">Cliquer "Acheter 45€"</p>
                    <p className="text-text-secondary text-sm">Redirection automatique vers Stripe Checkout</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                  <div>
                    <p className="font-semibold text-text-primary">Utiliser carte de test</p>
                    <p className="text-text-secondary text-sm">4242 4242 4242 4242 pour un paiement réussi</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</div>
                  <div>
                    <p className="font-semibold text-text-primary">Vérifier l'email</p>
                    <p className="text-text-secondary text-sm">Email de confirmation avec liens téléchargement</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cartes de test */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-bg-card border border-yellow-500/30 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <CreditCard className="text-yellow-400" size={20} />
                Cartes de Test Stripe
              </h3>
              
              <div className="space-y-3">
                {cartes_test.map((carte, index) => (
                  <div key={index} className="bg-bg-primary rounded-lg p-4 border border-neon-violet/20">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-mono text-text-primary font-bold">{carte.numero}</p>
                        <p className="text-sm text-text-secondary">{carte.type}</p>
                      </div>
                      <div className="text-right text-xs">
                        <div>CVC: {carte.cvc}</div>
                        <div>Date: {carte.date}</div>
                      </div>
                    </div>
                    <p className={`text-sm ${carte.color} font-semibold`}>
                      {carte.resultat}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Vérification email */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-bg-card border border-purple-500/30 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Mail className="text-purple-400" size={20} />
                Vérification Email Zimbra
              </h3>
              
              <div className="space-y-3">
                <div className="bg-purple-500/10 rounded-lg p-3">
                  <p className="text-sm font-semibold text-text-primary mb-2">📧 Email de confirmation attendu :</p>
                  <ul className="text-xs text-text-secondary space-y-1">
                    <li>• Expéditeur : "👻 Ghost Remix Pack" &lt;contact@ghostremixpack.com&gt;</li>
                    <li>• Sujet : "🎉 Paiement confirmé - Pack Complet Ghost (45€)"</li>
                    <li>• Contenu : Design Ghost + détails commande + liens téléchargement</li>
                    <li>• Délai : Immédiat après paiement Stripe</li>
                  </ul>
                </div>
                
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <p className="text-sm font-semibold text-text-primary mb-2">📧 Accès Zimbra OVH :</p>
                  <div className="text-xs text-text-secondary space-y-1">
                    <p>• URL : <span className="text-blue-400">https://mail.ovh.net/</span></p>
                    <p>• Email : contact@ghostremixpack.com</p>
                    <p>• Vérifier dossier "Reçus" et "Spam"</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Résultats de test */}
            {testResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-bg-card border border-neon-violet/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-text-primary mb-4">Résultats Tests</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {testResults.map((result) => (
                    <div key={result.id} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        result.status === 'success' ? 'bg-green-400' :
                        result.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                      <span className="text-text-secondary">[{result.timestamp}]</span>
                      <span className="font-semibold">{result.step}:</span>
                      <span className={
                        result.status === 'success' ? 'text-green-400' :
                        result.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                      }>{result.message}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Quick Buy */}
      <QuickBuyModal
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
        productId={packComplet.id}
        productName={packComplet.name}
        price={packComplet.price}
        originalPrice={packComplet.originalPrice}
        description={packComplet.description}
      />
    </div>
  );
}

