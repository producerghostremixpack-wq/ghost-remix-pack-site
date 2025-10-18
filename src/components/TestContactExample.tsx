import { useState, FormEvent } from 'react';
import { Send, User, Mail, MessageCircle, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// TypeScript interface for form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// TypeScript interface for component props
interface TestContactExampleProps {
  className?: string;
  onMessageSent?: (data: ContactFormData) => void;
}

/**
 * TestContactExample Component
 * 
 * Demonstrates proper contact form integration following Ghost Remix Pack guidelines:
 * - TypeScript strict typing
 * - Form validation
 * - API integration with Zimbra OVH backend
 * - Error handling
 * - Loading states
 * - Environment variables usage
 * 
 * @example
 * <TestContactExample 
 *   onMessageSent={(data) => console.log('Message sent:', data)} 
 * />
 */
export default function TestContactExample({ 
  className = '',
  onMessageSent
}: TestContactExampleProps) {
  // State management with proper TypeScript types
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  /**
   * Validate email format
   * @param email - Email address to validate
   * @returns boolean indicating if email is valid
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate form data
   * @returns boolean indicating if form is valid
   */
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      errors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      errors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle input change
   * @param field - Field name to update
   * @param value - New value
   */
  const handleChange = (field: keyof ContactFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * Handle form submission
   * Sends contact message via backend API
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Reset error states
    setError(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Get backend URL from environment variable
      const backendUrl = import.meta.env.VITE_CONTACT_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';

      // Send contact message
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle API errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      console.log('✅ Contact message sent successfully:', data);

      // Success state
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Call optional callback
      if (onMessageSent) {
        onMessageSent(formData);
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      // Proper error handling with TypeScript
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('❌ Contact form error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-gradient-to-br from-neon-pink/10 to-neon-violet/10 rounded-2xl p-8 border border-neon-pink/20 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neon-pink to-neon-violet mb-4">
          <MessageCircle className="text-white" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Contactez-nous
        </h3>
        <p className="text-gray-400">
          Nous répondons sous 24h via Zimbra OVH
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-start gap-3 animate-fadeIn">
          <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-green-400 font-semibold">Message envoyé !</p>
            <p className="text-green-300 text-sm mt-1">
              Nous vous répondrons bientôt à {formData.email}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-red-400 font-semibold">Erreur d'envoi</p>
            <p className="text-red-300 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
            Nom complet
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="text-gray-500" size={20} />
            </div>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Jean Dupont"
              disabled={loading || success}
              className={`
                w-full pl-12 pr-4 py-3 rounded-lg
                bg-gray-800/50 border
                ${fieldErrors.name ? 'border-red-500' : 'border-gray-700'}
                text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-neon-pink
                focus:border-transparent
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
              `}
            />
          </div>
          {fieldErrors.name && (
            <p className="mt-2 text-sm text-red-400">{fieldErrors.name}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
            Adresse email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="text-gray-500" size={20} />
            </div>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="votre@email.com"
              disabled={loading || success}
              className={`
                w-full pl-12 pr-4 py-3 rounded-lg
                bg-gray-800/50 border
                ${fieldErrors.email ? 'border-red-500' : 'border-gray-700'}
                text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-neon-pink
                focus:border-transparent
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
              `}
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-2 text-sm text-red-400">{fieldErrors.email}</p>
          )}
        </div>

        {/* Subject Input */}
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-300 mb-2">
            Sujet
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FileText className="text-gray-500" size={20} />
            </div>
            <input
              id="contact-subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="Question sur le Pack Complet"
              disabled={loading || success}
              className={`
                w-full pl-12 pr-4 py-3 rounded-lg
                bg-gray-800/50 border
                ${fieldErrors.subject ? 'border-red-500' : 'border-gray-700'}
                text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-neon-pink
                focus:border-transparent
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
              `}
            />
          </div>
          {fieldErrors.subject && (
            <p className="mt-2 text-sm text-red-400">{fieldErrors.subject}</p>
          )}
        </div>

        {/* Message Textarea */}
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
            Message
          </label>
          <textarea
            id="contact-message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Décrivez votre demande en détail..."
            rows={5}
            disabled={loading || success}
            className={`
              w-full px-4 py-3 rounded-lg
              bg-gray-800/50 border
              ${fieldErrors.message ? 'border-red-500' : 'border-gray-700'}
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-neon-pink
              focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
              resize-none
            `}
          />
          {fieldErrors.message && (
            <p className="mt-2 text-sm text-red-400">{fieldErrors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || success}
          className={`
            w-full py-3 px-6 rounded-lg font-bold
            bg-gradient-to-r from-neon-pink to-neon-violet
            text-white shadow-lg shadow-neon-pink/50
            hover:shadow-xl hover:shadow-neon-pink/70
            hover:scale-105
            active:scale-95
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            flex items-center justify-center gap-3
          `}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Envoi en cours...</span>
            </>
          ) : success ? (
            <>
              <CheckCircle size={20} />
              <span>Message envoyé !</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Envoyer le message</span>
            </>
          )}
        </button>
      </form>

      {/* Backend Info */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-xs text-gray-600 text-center">
          Backend: <span className="text-neon-pink font-mono text-xs">
            {import.meta.env.VITE_CONTACT_BACKEND_URL || 'Not configured'}
          </span>
        </p>
      </div>
    </div>
  );
}
