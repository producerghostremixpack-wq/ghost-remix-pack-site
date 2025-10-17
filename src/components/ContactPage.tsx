import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, User, MessageSquare, Send, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Comment fonctionne l'exclusivité des packs ?",
      answer: "Chaque pack est vendu une seule fois. Dès qu'un pack est acheté, il est automatiquement retiré du site. C'est la règle du premier arrivé, premier servi. Vous êtes l'unique propriétaire de votre remix."
    },
    {
      question: "Sous quel format sont livrés les remixes ?",
      answer: "Tous les packs sont livrés au format WAV (lossless, qualité studio). Les fichiers sont sans tag, sans signature vocale et prêts à diffuser. Vous recevez le lien de téléchargement par email dans les 48h maximum après paiement."
    },
    {
      question: "Puis-je demander un remboursement ?",
      answer: "Non. En raison de la nature numérique et exclusive des fichiers, aucun remboursement ne peut être effectué après livraison du pack. En achetant, vous renoncez expressément à votre droit de rétractation."
    },
    {
      question: "Qui produit les remixes ?",
      answer: "Une équipe de DJs et producteurs professionnels européens encore actifs dans le milieu. Leur identité reste strictement confidentielle (d'où le nom Ghost Remix). Chaque production est testée en conditions réelles avec un taux d'efficacité de 85% en club."
    },
    {
      question: "Puis-je utiliser le remix librement ?",
      answer: "Oui, vous gardez 100% des droits d'exploitation. Vous pouvez l'utiliser pour vos performances, le diffuser sur vos réseaux, l'intégrer dans vos sets. La seule interdiction : revendre le pack en tant que tel ou le partager publiquement en tant que fichier brut."
    },
    {
      question: "Comment se passe le paiement ?",
      answer: "Paiement sécurisé par carte bancaire via Stripe (Visa, Mastercard, Amex). Le processus est rapide et totalement sécurisé avec 3D Secure."
    },
    {
      question: "Puis-je écouter avant d'acheter ?",
      answer: "Oui ! Chaque pack propose des extraits audio (preview de 30-60 secondes) que vous pouvez écouter directement sur le site avec notre player interactif."
    },
    {
      question: "Proposez-vous des collaborations personnalisées ?",
      answer: "Absolument ! Si vous avez un projet spécifique, contactez-nous via ce formulaire en sélectionnant 'Collaboration' comme sujet. Nous étudions toutes les demandes."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('https://ghost-remix-pack-site-production.up.railway.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-poppins px-8 py-20">
      {/* Bouton retour */}
      <div className="max-w-4xl mx-auto mb-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-neon-violet hover:text-glow-violet transition-all duration-300"
        >
          <ArrowLeft size={20} />
          <span>Retour à l'accueil</span>
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        {/* Titre */}
        <h1 className="text-5xl font-bold text-text-primary mb-4 text-center">
          Contact & <span className="text-neon-violet">FAQ</span>
        </h1>
        <p className="text-text-secondary text-center mb-12">
          Une question, une collaboration ou un problème technique ?<br />
          Notre équipe fantôme vous répond en <span className="text-neon-violet font-semibold">moins de 24h</span>.
        </p>

        {/* Section FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center justify-center gap-2">
            <HelpCircle className="text-neon-cyan" size={28} />
            Questions fréquentes
          </h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-bg-card rounded-xl border border-neon-violet/20 hover:border-neon-violet/40 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bg-card/80 transition-all"
                >
                  <span className="text-text-primary font-semibold pr-4">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-neon-violet transition-transform duration-300 flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-text-secondary text-sm leading-relaxed border-t border-neon-violet/10 pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-text-secondary text-sm mt-8">
            Votre question n'est pas dans la liste ?<br />
            Utilisez le formulaire ci-dessous 👇
          </p>
        </motion.div>

        {/* Formulaire */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-bg-card p-8 rounded-2xl border border-neon-violet/20 glow-violet"
        >
          {/* Nom */}
          <div className="mb-6">
            <label htmlFor="name" className="flex items-center gap-2 text-text-primary font-medium mb-2">
              <User size={18} className="text-neon-violet" />
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:outline-none focus:ring-2 focus:ring-neon-violet/50 transition-all"
              placeholder="Votre nom"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="flex items-center gap-2 text-text-primary font-medium mb-2">
              <Mail size={18} className="text-neon-cyan" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-bg-primary border border-neon-cyan/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all"
              placeholder="votre@email.com"
            />
          </div>

          {/* Sujet */}
          <div className="mb-6">
            <label htmlFor="subject" className="flex items-center gap-2 text-text-primary font-medium mb-2">
              <MessageSquare size={18} className="text-neon-violet" />
              Sujet
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:outline-none focus:ring-2 focus:ring-neon-violet/50 transition-all"
            >
              <option value="">Sélectionnez un sujet...</option>
              <option value="faq">❓ FAQ - Poser une question</option>
              <option value="collaboration">🤝 Proposition de collaboration</option>
              <option value="achat">🛒 Question sur un achat</option>
              <option value="technique">🔧 Problème technique</option>
              <option value="autre">💬 Autre demande</option>
            </select>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label htmlFor="message" className="flex items-center gap-2 text-text-primary font-medium mb-2">
              <MessageSquare size={18} className="text-neon-cyan" />
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-bg-primary border border-neon-cyan/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all resize-none"
              placeholder="Décrivez votre demande en détail..."
            />
          </div>

          {/* Bouton submit */}
          <Button
            type="submit"
            disabled={status === 'sending'}
            size="lg"
            className="w-full"
          >
            {status === 'sending' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Envoyer le message
              </>
            )}
          </Button>

          {/* Messages de statut */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg text-neon-cyan text-center"
            >
              ✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center"
            >
              ❌ Une erreur s'est produite. Réessayez ou contactez-nous à contact@ghostremixpack.com
            </motion.div>
          )}
        </motion.form>

        {/* Contact direct */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center text-text-secondary text-sm"
        >
          <p>Ou envoyez-nous un email directement :</p>
          <a
            href="mailto:contact@ghostremixpack.com"
            className="text-neon-violet hover:text-glow-violet hover:underline transition-all duration-300 font-medium"
          >
            contact@ghostremixpack.com
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

