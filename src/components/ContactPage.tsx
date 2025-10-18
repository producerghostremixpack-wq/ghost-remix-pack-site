import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Mail, MessageCircle, User, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Validation basique
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setStatusMessage('Veuillez remplir tous les champs obligatoires');
      setIsSubmitting(false);
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setStatusMessage('Format d\'email invalide');
      setIsSubmitting(false);
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_CONTACT_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          ...formData,
          source: 'contact-page',
          timestamp: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(`✅ Message envoyé avec succès ! Nous vous répondrons sous 24h sur ${formData.email}`);
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur envoi contact:', error);
      setSubmitStatus('error');
      setStatusMessage('Erreur lors de l\'envoi. Réessayez ou contactez-nous directement à contact@ghostremixpack.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqData = [
    {
      question: "Comment acheter et télécharger un pack ?",
      answer: "Cliquez sur 'Ajouter au panier', remplissez vos infos, et payez par carte. Vous recevrez immédiatement un email avec les liens de téléchargement des fichiers WAV haute qualité."
    },
    {
      question: "Quels sont les droits d'utilisation des packs ?",
      answer: "Vous obtenez 100% des droits d'exploitation commerciale ! Utilisez les remixes pour vos sets, vos productions, ou revendez-les. Seule restriction : ne pas redistribuer les fichiers originaux."
    },
    {
      question: "Les packs sont-ils exclusifs ?",
      answer: "Oui ! Chaque pack est limité et vendu à maximum 10-20 personnes selon le niveau. Une fois épuisé, il ne sera plus jamais disponible. C'est la garantie de votre exclusivité."
    },
    {
      question: "Qui sont les producteurs 'Ghost' ?",
      answer: "Des producteurs professionnels établis qui souhaitent garder l'anonymat. Ils ont déjà signé sur des labels reconnus et préfèrent rester dans l'ombre pour ces créations exclusives."
    },
    {
      question: "Quel format et qualité pour les fichiers ?",
      answer: "Tous les remixes sont livrés en WAV 24-bit/44.1kHz minimum, prêts pour le mastering professionnel. Certains packs Ultra incluent aussi les stems (pistes séparées)."
    },
    {
      question: "Puis-je demander un remix personnalisé ?",
      answer: "Oui ! Contactez-nous avec votre track de référence. Nos Ghost producers peuvent créer un remix sur-mesure (à partir de 200€). Délai : 2-3 semaines."
    },
    {
      question: "Remboursement si je ne suis pas satisfait ?",
      answer: "Garantie satisfait ou remboursé 48h ! Si le pack ne correspond pas à vos attentes, contactez-nous dans les 48h pour un remboursement complet."
    },
    {
      question: "Comment rejoindre la Ghost Community VIP ?",
      answer: "Inscrivez-vous à la newsletter et après 3 achats, vous accédez au Telegram VIP avec : avant-premières, battles mensuelles, feedback sur vos tracks, et accès aux packs collectors."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header avec retour */}
      <div className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-neon border-b border-neon-violet/20 py-4">
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-text-secondary hover:text-neon-violet transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neon-violet focus:ring-offset-2"
            aria-label="Retourner à l'accueil"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Retour à l'accueil</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-violet to-neon-cyan bg-clip-text text-transparent mb-6">
            Contact & FAQ
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Une question sur nos packs Ghost ? Besoin d'aide ? Contactez-nous directement !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire de Contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-bg-card border border-neon-violet/20 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-neon-violet/20 rounded-xl">
                <MessageCircle className="text-neon-violet" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">Envoyez-nous un message</h2>
            </div>

            {/* Contact direct */}
            <div className="bg-gradient-to-r from-neon-violet/10 to-neon-cyan/10 rounded-xl p-6 mb-8 border border-neon-violet/30">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="text-neon-cyan" size={20} />
                <h3 className="font-semibold text-text-primary">Contact direct :</h3>
              </div>
              <a 
                href="mailto:contact@ghostremixpack.com"
                className="text-neon-violet hover:text-neon-cyan transition-colors duration-300 font-medium text-lg"
              >
                contact@ghostremixpack.com
              </a>
              <p className="text-text-secondary text-sm mt-2">
                Réponse garantie sous 24h • Support • Partenariats • Questions techniques
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom */}
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-text-primary font-medium mb-3">
                  <User size={18} className="text-neon-violet" />
                  Votre nom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-bg-primary border border-neon-violet/30 rounded-xl px-4 py-3 text-text-primary placeholder-text-secondary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 focus:outline-none transition-all duration-300"
                  placeholder="Votre nom complet"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-text-primary font-medium mb-3">
                  <Mail size={18} className="text-neon-violet" />
                  Votre email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-bg-primary border border-neon-violet/30 rounded-xl px-4 py-3 text-text-primary placeholder-text-secondary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 focus:outline-none transition-all duration-300"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Sujet */}
              <div>
                <label htmlFor="subject" className="flex items-center gap-2 text-text-primary font-medium mb-3">
                  <FileText size={18} className="text-neon-violet" />
                  Sujet
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-bg-primary border border-neon-violet/30 rounded-xl px-4 py-3 text-text-primary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 focus:outline-none transition-all duration-300"
                >
                  <option value="">Choisissez un sujet...</option>
                  <option value="Packs & Prix">Question sur les packs et prix</option>
                  <option value="Problème Technique">Problème technique / téléchargement</option>
                  <option value="Remix Personnalisé">Demande de remix personnalisé</option>
                  <option value="Partenariat">Opportunité de partenariat</option>
                  <option value="Autre">Autre demande</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-text-primary font-medium mb-3">
                  <MessageCircle size={18} className="text-neon-violet" />
                  Votre message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full bg-bg-primary border border-neon-violet/30 rounded-xl px-4 py-3 text-text-primary placeholder-text-secondary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 focus:outline-none transition-all duration-300 resize-vertical"
                  placeholder="Décrivez votre demande en détail..."
                />
              </div>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border ${
                    submitStatus === 'success'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {statusMessage}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-neon-violet to-neon-cyan text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-neon-violet/30 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neon-violet focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-neon-cyan/20 rounded-xl">
                <MessageCircle className="text-neon-cyan" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">Questions Fréquentes</h2>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="bg-bg-card border border-neon-violet/20 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-6 hover:bg-neon-violet/5 transition-colors duration-300 flex items-center justify-between gap-4 focus:outline-none focus:bg-neon-violet/5"
                  >
                    <span className="font-medium text-text-primary">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-5 h-5 text-neon-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === index ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}