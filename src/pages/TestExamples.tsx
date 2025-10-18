import { useState } from 'react';
import { ArrowLeft, Code, Zap, Mail, MessageCircle, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestPaymentExample from '../components/TestPaymentExample';
import TestNewsletterExample from '../components/TestNewsletterExample';
import TestContactExample from '../components/TestContactExample';

/**
 * TestExamples Page
 * 
 * Demonstrates all Ghost Remix Pack components following cursor rules:
 * - Payment integration (Stripe)
 * - Newsletter subscription (Zimbra OVH)
 * - Contact form (Zimbra OVH)
 * 
 * This page serves as a testing ground and documentation example
 */
export default function TestExamples() {
  const [activeTab, setActiveTab] = useState<'payment' | 'newsletter' | 'contact'>('payment');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 text-white"
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-neon-violet to-neon-blue mb-6">
            <Code className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Test Examples
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Composants de test suivant les règles Cursor du Ghost Remix Pack
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('payment')}
            className={`
              px-6 py-3 rounded-lg font-bold transition-all duration-300
              flex items-center gap-2
              ${activeTab === 'payment'
                ? 'bg-gradient-to-r from-neon-violet to-neon-blue text-white shadow-lg shadow-neon-violet/50'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }
            `}
          >
            <CreditCard size={20} />
            <span>Paiement Stripe</span>
          </button>

          <button
            onClick={() => setActiveTab('newsletter')}
            className={`
              px-6 py-3 rounded-lg font-bold transition-all duration-300
              flex items-center gap-2
              ${activeTab === 'newsletter'
                ? 'bg-gradient-to-r from-neon-blue to-neon-green text-white shadow-lg shadow-neon-blue/50'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }
            `}
          >
            <Mail size={20} />
            <span>Newsletter</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`
              px-6 py-3 rounded-lg font-bold transition-all duration-300
              flex items-center gap-2
              ${activeTab === 'contact'
                ? 'bg-gradient-to-r from-neon-pink to-neon-violet text-white shadow-lg shadow-neon-pink/50'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }
            `}
          >
            <MessageCircle size={20} />
            <span>Formulaire Contact</span>
          </button>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto">
          {activeTab === 'payment' && (
            <div className="space-y-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-neon-violet/20">
                    <Zap className="text-neon-violet" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Intégration Stripe
                    </h3>
                    <p className="text-gray-400">
                      Composant de paiement avec Stripe Checkout. Suit toutes les règles de sécurité
                      et utilise les variables d'environnement correctement.
                    </p>
                  </div>
                </div>
              </div>

              <TestPaymentExample 
                productId="pack-complet"
                productName="Pack Complet Ghost"
                price={29900}
              />
            </div>
          )}

          {activeTab === 'newsletter' && (
            <div className="space-y-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-neon-blue/20">
                    <Mail className="text-neon-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Newsletter Zimbra OVH
                    </h3>
                    <p className="text-gray-400">
                      Formulaire d'inscription à la newsletter avec validation d'email et
                      intégration backend Zimbra OVH pour l'envoi des emails.
                    </p>
                  </div>
                </div>
              </div>

              <TestNewsletterExample />
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-neon-pink/20">
                    <MessageCircle className="text-neon-pink" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Formulaire de Contact
                    </h3>
                    <p className="text-gray-400">
                      Formulaire de contact complet avec validation de tous les champs et
                      envoi d'emails via le backend Zimbra OVH.
                    </p>
                  </div>
                </div>
              </div>

              <TestContactExample />
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 mb-2">
              Ces composants suivent les règles Cursor du Ghost Remix Pack
            </p>
            <p className="text-sm text-gray-600">
              TypeScript • React • Tailwind CSS • Stripe • Zimbra OVH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
