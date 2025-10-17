import { useState } from 'react';
import { useCart, type CartItem } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Mail, User, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('🛒 Envoi de la commande au backend...');
      
      // URL du backend (depuis les variables d'environnement ou localhost par défaut)
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const apiUrl = `${backendUrl}/api/checkout/create-session`;
      
      console.log('📡 URL backend:', apiUrl);
      
      // Appel à l'API backend pour créer la session Stripe
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart,
          customer: formData,
        }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        console.log('✅ Session Stripe créée, redirection...');
        // Rediriger vers Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Erreur lors de la création de la session');
      }
      
    } catch (error) {
      console.error('❌ Erreur:', error);
      alert('Une erreur est survenue. Assurez-vous que le backend est démarré sur le port 3001.');
      
      // Fallback : Simulation si backend non disponible
      console.log('⚠️  Mode simulation (backend non disponible)');
      setOrderComplete(true);
      setTimeout(() => clearCart(), 2000);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-bg-primary text-white font-poppins flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle size={100} className="mx-auto mb-6 text-green-500" />
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-4 text-text-primary">Commande Validée !</h2>
          <p className="text-text-secondary mb-8">
            Merci pour votre commande ! Vous recevrez vos packs par email sous 48h maximum.
          </p>
          
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-neon-violet to-neon-cyan glow-violet"
          >
            Retour à l'accueil
          </Button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    window.location.href = '/';
    return null;
  }

  const shippingFee = 0; // Livraison numérique = gratuite
  const totalPrice = getTotalPrice() + shippingFee;

  return (
    <div className="min-h-screen bg-bg-primary text-white font-poppins py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => window.location.href = '/cart'}
            className="flex items-center gap-2 text-text-secondary hover:text-neon-violet transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Retour au panier</span>
          </button>
          
          <h1 className="text-4xl font-bold mb-2 text-text-primary">Finaliser la Commande</h1>
          <p className="text-text-secondary">Dernière étape avant de recevoir vos packs exclusifs</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-bg-card border-neon-violet/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-text-primary">Vos Informations</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                      <User size={16} />
                      Nom complet
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-bg-primary border border-neon-violet/20 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:outline-none focus:ring-2 focus:ring-neon-violet/20 transition-all"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                      <Mail size={16} />
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-bg-primary border border-neon-violet/20 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:outline-none focus:ring-2 focus:ring-neon-violet/20 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                      <Phone size={16} />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-bg-primary border border-neon-violet/20 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:outline-none focus:ring-2 focus:ring-neon-violet/20 transition-all"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                      <MapPin size={16} />
                      Ville / Pays
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-bg-primary border border-neon-violet/20 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:outline-none focus:ring-2 focus:ring-neon-violet/20 transition-all"
                      placeholder="Paris, France"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-neon-violet to-neon-cyan glow-violet-intense hover:scale-105 hover:brightness-125 py-6 text-lg"
                  >
                    Valider la Commande
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Récapitulatif */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-bg-card border-neon-violet/30">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-text-primary">Récapitulatif</h2>
                
                {/* Liste des articles */}
                <div className="space-y-4 mb-6">
                  {cart.map((item: CartItem) => (
                    <div key={item.product.id} className="flex justify-between items-center pb-4 border-b border-neon-violet/10">
                      <div className="flex-1">
                        <p className="text-text-primary font-semibold">{item.product.name}</p>
                        <p className="text-text-secondary text-sm">Quantité: {item.quantity}</p>
                      </div>
                      <p className="text-neon-violet font-bold">
                        {item.product.price.includes('€') 
                          ? `${parseInt(item.product.price) * item.quantity}€`
                          : item.product.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totaux */}
                <div className="space-y-3">
                  <div className="flex justify-between text-text-secondary">
                    <span>Sous-total</span>
                    <span>{getTotalPrice()}€</span>
                  </div>
                  
                  <div className="flex justify-between text-text-secondary">
                    <span>Livraison (numérique)</span>
                    <span className="text-green-400">Gratuite</span>
                  </div>
                  
                  <div className="border-t border-neon-violet/20 pt-3 flex justify-between items-center text-2xl font-bold">
                    <span className="text-text-primary">Total</span>
                    <span className="text-neon-violet drop-shadow-[0_0_20px_rgba(155,92,246,1)]">
                      {totalPrice}€
                    </span>
                  </div>
                </div>

                {/* Info livraison */}
                <div className="mt-6 p-4 bg-neon-violet/10 rounded-lg border border-neon-violet/30">
                  <p className="text-text-secondary text-xs leading-relaxed">
                    📦 Livraison numérique sous 48h maximum<br />
                    🔒 Paiement sécurisé via Stripe<br />
                    ✅ Fichiers WAV haute qualité<br />
                    💯 100% des droits d'exploitation
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

