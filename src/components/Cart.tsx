import { useCart, type CartItem } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length > 0) {
      window.location.href = '/checkout';
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bg-primary text-white font-poppins flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag size={80} className="mx-auto mb-6 text-text-secondary/50" />
          <h2 className="text-3xl font-bold mb-4 text-text-primary">Votre panier est vide</h2>
          <p className="text-text-secondary mb-8">Découvrez nos packs exclusifs et ajoutez-les à votre panier</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-neon-violet to-neon-cyan glow-violet"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux packs
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-white font-poppins py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-text-secondary hover:text-neon-violet transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Retour aux packs</span>
          </button>
          
          <h1 className="text-4xl font-bold mb-2 text-text-primary">Votre Panier</h1>
          <p className="text-text-secondary">{cart.length} pack{cart.length > 1 ? 's' : ''} dans votre panier</p>
        </motion.div>

        {/* Articles du panier */}
        <div className="space-y-4 mb-8">
          {cart.map((item: CartItem, idx: number) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-bg-card border-neon-violet/20 hover:border-neon-violet/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    {/* Info produit */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-primary mb-1">{item.product.name}</h3>
                      <p className="text-text-secondary text-sm mb-2">{item.product.description}</p>
                      <span className="inline-block px-3 py-1 rounded-full text-xs bg-neon-violet/20 text-neon-violet border border-neon-violet/30">
                        {item.product.category}
                      </span>
                    </div>

                    {/* Prix unitaire */}
                    <div className="text-center">
                      <p className="text-text-secondary text-xs mb-1">Prix unitaire</p>
                      <p className="text-neon-violet text-xl font-bold">{item.product.price}</p>
                    </div>

                    {/* Quantité */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-bg-primary border border-neon-violet/30 hover:border-neon-violet hover:bg-neon-violet/20 transition-all flex items-center justify-center"
                      >
                        <Minus size={16} className="text-text-primary" />
                      </button>
                      
                      <span className="text-xl font-bold text-text-primary w-8 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-bg-primary border border-neon-violet/30 hover:border-neon-violet hover:bg-neon-violet/20 transition-all flex items-center justify-center"
                      >
                        <Plus size={16} className="text-text-primary" />
                      </button>
                    </div>

                    {/* Sous-total */}
                    <div className="text-center">
                      <p className="text-text-secondary text-xs mb-1">Sous-total</p>
                      <p className="text-neon-cyan text-xl font-bold">
                        {item.product.price.includes('€') 
                          ? `${parseInt(item.product.price) * item.quantity}€`
                          : item.product.price}
                      </p>
                    </div>

                    {/* Bouton supprimer */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Résumé et actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-bg-card border-neon-violet/30">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span className="text-text-primary">Total</span>
                  <span className="text-neon-violet drop-shadow-[0_0_20px_rgba(155,92,246,1)]">
                    {getTotalPrice()}€
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Vider le panier
                  </Button>
                  
                  <Button
                    onClick={handleCheckout}
                    className="bg-gradient-to-r from-neon-violet to-neon-cyan glow-violet-intense hover:scale-105 hover:brightness-125"
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Commander
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}





