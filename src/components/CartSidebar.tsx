import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart, type CartItem } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay sombre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar panier */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-gradient-to-b from-bg-card to-bg-primary border-l-2 border-neon-violet/30 shadow-[-20px_0_80px_rgba(155,92,246,0.3)] z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neon-violet/20">
              <div>
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                  <ShoppingBag size={24} className="text-neon-violet" />
                  Votre Panier
                </h2>
                <p className="text-text-secondary text-sm mt-1">
                  {getTotalItems()} pack{getTotalItems() > 1 ? 's' : ''} • {getTotalPrice()}€
                </p>
              </div>
              
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-neon-violet hover:rotate-90 transition-all duration-300"
              >
                <X size={28} />
              </button>
            </div>

            {/* Liste des packs */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag size={60} className="mx-auto mb-4 text-text-secondary/30" />
                  <p className="text-text-secondary">Votre panier est vide</p>
                </div>
              ) : (
                cart.map((item: CartItem, idx: number) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-bg-primary/50 backdrop-blur-sm rounded-lg p-4 border border-neon-violet/20 hover:border-neon-violet/40 transition-all group"
                  >
                    {/* Nom du pack */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-text-primary font-bold mb-1 group-hover:text-neon-violet transition-colors">
                          {item.product.name}
                        </h3>
                        <p className="text-text-secondary text-xs line-clamp-2">
                          {item.product.description}
                        </p>
                        
                        {/* Badge catégorie */}
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-neon-violet/20 text-neon-violet border border-neon-violet/30">
                            {item.product.category}
                          </span>
                        </div>
                      </div>

                      {/* Bouton supprimer */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-400 hover:text-red-300 hover:scale-110 transition-all ml-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Prix et quantité */}
                    <div className="flex items-center justify-between">
                      {/* Quantité */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-bg-card border border-neon-violet/30 hover:border-neon-violet hover:bg-neon-violet/20 transition-all flex items-center justify-center"
                        >
                          <Minus size={14} />
                        </button>
                        
                        <span className="text-lg font-bold text-text-primary w-8 text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-bg-card border border-neon-violet/30 hover:border-neon-violet hover:bg-neon-violet/20 transition-all flex items-center justify-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Prix total */}
                      <div className="text-right">
                        <p className="text-text-secondary text-xs">Total</p>
                        <p className="text-neon-violet text-xl font-bold">
                          {item.product.price.includes('€') 
                            ? `${parseInt(item.product.price) * item.quantity}€`
                            : item.product.price}
                        </p>
                      </div>
                    </div>

                    {/* Waveform mini si audio disponible */}
                    {item.product.audio && (
                      <div className="mt-3 flex gap-1 h-8 items-end">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-neon-violet/30 rounded-sm opacity-60"
                            style={{ 
                              height: `${Math.random() * 100}%`,
                              minHeight: '20%'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer - Total et actions */}
            {cart.length > 0 && (
              <div className="border-t border-neon-violet/20 p-6 space-y-4 bg-bg-card/80 backdrop-blur-lg">
                {/* Total général */}
                <div className="flex justify-between items-center pb-4 border-b border-neon-violet/10">
                  <span className="text-text-secondary text-lg">Total général</span>
                  <span 
                    className="text-4xl font-bold text-neon-violet"
                    style={{
                      textShadow: '0 0 20px rgba(155, 92, 246, 0.8)',
                    }}
                  >
                    {getTotalPrice()}€
                  </span>
                </div>

                {/* Boutons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => window.location.href = '/checkout'}
                    className="w-full bg-gradient-to-r from-neon-violet to-neon-cyan glow-violet-intense hover:scale-105 hover:brightness-125 py-6 text-lg font-bold"
                  >
                    Passer Commande
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                  
                  <Button
                    onClick={() => window.location.href = '/cart'}
                    variant="outline"
                    className="w-full border-neon-violet/30 hover:bg-neon-violet/10 hover:border-neon-violet"
                  >
                    Voir le Panier Complet
                  </Button>
                </div>

                {/* Info livraison */}
                <div className="text-center text-text-secondary text-xs pt-2">
                  🔒 Paiement sécurisé • 📦 Livraison sous 48h
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}





