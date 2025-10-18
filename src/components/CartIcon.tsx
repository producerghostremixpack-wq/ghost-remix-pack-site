import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface CartIconProps {
  onClick?: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <button
      onClick={onClick || (() => window.location.href = '/cart')}
      className="relative group"
      aria-label={`Panier d'achat - ${itemCount} article${itemCount > 1 ? 's' : ''}`}
    >
      <div className="relative">
        <ShoppingCart 
          size={24} 
          className="text-text-secondary group-hover:text-neon-violet transition-colors duration-300" 
        />
        
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-gradient-to-r from-neon-violet to-neon-cyan text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-[0_0_15px_rgba(155,92,246,0.8)]"
          >
            {itemCount}
          </motion.div>
        )}
      </div>
    </button>
  );
}

