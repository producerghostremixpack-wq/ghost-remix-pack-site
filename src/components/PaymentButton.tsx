import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Loader, ExternalLink, Check } from 'lucide-react';

interface PaymentButtonProps {
  productId: string;
  productName: string;
  price: number;
  originalPrice?: number;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  customerInfo?: {
    email?: string;
    name?: string;
  };
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

// Configuration des produits Ghost Remix Pack
const GHOST_PRODUCTS = {
  'pack-house': {
    id: 'pack-house',
    name: 'Pack House Premium',
    price: 15,
    description: '15 tracks House + stems + samples exclusifs',
    image: null
  },
  'pack-afro': {
    id: 'pack-afro', 
    name: 'Pack Afro Vibes',
    price: 18,
    description: '12 tracks Afro + percussion loops uniques',
    image: null
  },
  'pack-rap': {
    id: 'pack-rap',
    name: 'Pack Rap FR', 
    price: 20,
    description: '10 instrumentales Rap français + MIDI',
    image: null
  },
  'pack-complet': {
    id: 'pack-complet',
    name: 'Pack Complet Ghost',
    price: 45,
    originalPrice: 53,
    description: 'Tous les packs + bonus exclusifs (Économie 8€)',
    image: null
  }
};

export default function PaymentButton({
  productId,
  productName,
  price,
  originalPrice,
  description,
  className = '',
  size = 'md',
  variant = 'primary',
  customerInfo,
  onSuccess,
  onError
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      
      // Créer la session Stripe
      const response = await fetch(`${backendUrl}/api/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
          customerInfo: {
            email: customerInfo?.email || '',
            name: customerInfo?.name || 'Client Ghost',
          },
          successUrl: `${window.location.origin}/success-stripe?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: window.location.href,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        // Succès visuel avant redirection
        setIsSuccess(true);
        
        setTimeout(() => {
          // Redirection vers Stripe Checkout
          window.location.href = data.url;
        }, 800);
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error('URL de paiement non reçue');
      }

    } catch (error) {
      console.error('Erreur paiement:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du paiement';
      
      if (onError) {
        onError(errorMessage);
      } else {
        alert(`Erreur: ${errorMessage}\n\nVeuillez réessayer ou contacter le support.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Styles basés sur la taille
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Styles basés sur la variante
  const variantClasses = {
    primary: 'bg-gradient-to-r from-neon-violet to-neon-cyan text-white hover:shadow-lg hover:shadow-neon-violet/30',
    secondary: 'bg-gradient-to-r from-neon-cyan to-purple-500 text-white hover:shadow-lg hover:shadow-neon-cyan/30',
    ghost: 'bg-transparent border-2 border-neon-violet text-neon-violet hover:bg-neon-violet hover:text-white'
  };

  const buttonClasses = `
    ${sizeClasses[size]} 
    ${variantClasses[variant]}
    ${className}
    font-bold rounded-xl transition-all duration-300 transform hover:scale-105 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    flex items-center justify-center gap-2 min-w-fit
  `;

  return (
    <div className="payment-button-container">
      {/* Informations produit (optionnel) */}
      {description && (
        <div className="mb-3 text-center">
          <p className="text-sm text-text-secondary">{description}</p>
          {originalPrice && originalPrice > price && (
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-lg font-bold text-neon-violet">{price}€</span>
              <span className="text-sm line-through text-text-secondary">{originalPrice}€</span>
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Économie {originalPrice - price}€
              </span>
            </div>
          )}
        </div>
      )}

      {/* Bouton de paiement */}
      <motion.button
        onClick={handlePayment}
        disabled={isLoading || isSuccess}
        className={buttonClasses}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin" size={20} />
            Redirection...
          </>
        ) : isSuccess ? (
          <>
            <Check className="text-green-400" size={20} />
            Redirection vers Stripe
          </>
        ) : (
          <>
            <CreditCard size={20} />
            Acheter {price}€
            <ExternalLink size={16} />
          </>
        )}
      </motion.button>

      {/* Sécurité badge */}
      <div className="flex items-center justify-center gap-2 mt-2 text-xs text-text-secondary">
        <Lock size={12} />
        <span>Paiement sécurisé par Stripe</span>
      </div>
    </div>
  );
}

// Composants pré-configurés pour chaque pack
export function PaymentButtonHouse({ className, customerInfo, ...props }: Omit<PaymentButtonProps, 'productId' | 'productName' | 'price'>) {
  return (
    <PaymentButton
      productId="pack-house"
      productName="Pack House Premium"
      price={15}
      description="15 tracks House + stems + samples"
      className={className}
      customerInfo={customerInfo}
      {...props}
    />
  );
}

export function PaymentButtonAfro({ className, customerInfo, ...props }: Omit<PaymentButtonProps, 'productId' | 'productName' | 'price'>) {
  return (
    <PaymentButton
      productId="pack-afro"
      productName="Pack Afro Vibes"
      price={18}
      description="12 tracks Afro + percussion loops"
      className={className}
      customerInfo={customerInfo}
      {...props}
    />
  );
}

export function PaymentButtonRap({ className, customerInfo, ...props }: Omit<PaymentButtonProps, 'productId' | 'productName' | 'price'>) {
  return (
    <PaymentButton
      productId="pack-rap"
      productName="Pack Rap FR"
      price={20}
      description="10 instrumentales Rap français + MIDI"
      className={className}
      customerInfo={customerInfo}
      {...props}
    />
  );
}

export function PaymentButtonComplet({ className, customerInfo, ...props }: Omit<PaymentButtonProps, 'productId' | 'productName' | 'price'>) {
  return (
    <PaymentButton
      productId="pack-complet"
      productName="Pack Complet Ghost"
      price={45}
      originalPrice={53}
      description="Tous les packs + bonus exclusifs"
      className={className}
      customerInfo={customerInfo}
      {...props}
    />
  );
}

