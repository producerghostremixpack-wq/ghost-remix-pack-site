# Task List - Ghost Remix Pack - Plateforme E-Commerce Complète

**Basé sur** : `/tasks/0001-prd-ghost-remix-platform.md`  
**Date de création** : 12 octobre 2025  
**Statut** : En cours

---

## Relevant Files

### Frontend - Composants existants à modifier
- `src/components/GhostRemixPack.tsx` - Page d'accueil actuelle, à refactoriser avec nouvelle charte et intégration backend
- `src/components/MentionsLegales.tsx` - Page mentions légales existante (OK)
- `src/components/ui/button.tsx` - Composant bouton shadcn/ui à personnaliser avec gradient néon
- `src/components/ui/card.tsx` - Composant carte à adapter avec effets glow
- `src/App.tsx` - Router principal, à enrichir avec nouvelles routes
- `src/index.css` - CSS global, mise à jour complète avec nouvelle palette

### Frontend - Nouveaux composants à créer
- `src/components/PackCard.tsx` - Carte de pack avec player audio intégré
- `src/components/AudioPlayer.tsx` - Player audio avancé avec waveform (WaveSurfer.js)
- `src/components/CheckoutPage.tsx` - Page de paiement avec Stripe Elements
- `src/components/SuccessPage.tsx` - Page de confirmation après achat
- `src/components/ContactPage.tsx` - Formulaire de contact
- `src/components/NewsletterForm.tsx` - Formulaire d'inscription newsletter
- `src/components/admin/Dashboard.tsx` - Interface admin principale
- `src/components/admin/PackForm.tsx` - Formulaire d'ajout/modification de pack
- `src/components/admin/PackList.tsx` - Liste des packs pour l'admin
- `src/components/admin/Login.tsx` - Page de connexion admin

### Frontend - Services et utilitaires
- `src/services/api.ts` - Service pour les appels API backend (Supabase)
- `src/services/stripe.ts` - Configuration et helpers Stripe
- `src/services/auth.ts` - Gestion de l'authentification admin
- `src/hooks/usePacks.ts` - Hook React pour récupérer les packs
- `src/hooks/useAudio.ts` - Hook pour gérer la lecture audio
- `src/types/index.ts` - Types TypeScript (Pack, Order, User, etc.)

### Backend - Configuration Supabase
- `supabase/migrations/001_create_tables.sql` - Migration base de données (packs, orders, newsletter)
- `supabase/functions/handle-payment-webhook.ts` - Edge Function pour webhook Stripe
- `supabase/functions/send-delivery-email.ts` - Edge Function pour envoi email de livraison
- `.env.local` - Variables d'environnement (clés Supabase, Stripe, etc.)

### Configuration
- `package.json` - Ajout dépendances : Supabase, Stripe, WaveSurfer.js, React Query
- `tailwind.config.js` - Mise à jour avec nouvelle palette néon
- `vite.config.ts` - Configuration env variables

---

## Tasks

- [ ] **1.0 Design System & Refonte Visuelle**
  - [x] 1.1 Mettre à jour `tailwind.config.js` avec la nouvelle palette néon (ajouter custom colors: neon-violet #9B5CF6, neon-cyan #00E5FF, bg-primary #0B0B0F, bg-card #141420, text-primary #F5F5F7, text-secondary #B0B0C0)
  - [x] 1.2 Refondre `src/index.css` : remplacer les CSS variables existantes par la nouvelle charte, ajouter les classes utilitaires pour glows (`.glow-violet`, `.glow-cyan`), définir animations de base
  - [x] 1.3 Modifier `src/components/ui/button.tsx` : remplacer les variants par défaut par des boutons avec gradient néon (`bg-gradient-to-r from-neon-violet to-neon-cyan`), ajouter effet glow et hover scale/brightness
  - [x] 1.4 Modifier `src/components/ui/card.tsx` : appliquer fond `bg-card`, border transparent par défaut, ajouter effet glow violet au hover, transition fluide
  - [x] 1.5 Refactoriser `src/components/GhostRemixPack.tsx` - Hero section : appliquer nouveau fond avec gradient radial violet diffus, animations Framer Motion sur le titre (fade + slide), mettre à jour le CTA avec nouveau bouton gradient
  - [x] 1.6 Refactoriser `src/components/GhostRemixPack.tsx` - Header : appliquer nouveau fond, ajuster couleurs de navigation, ajouter effet text-glow sur hover
  - [ ] 1.7 Refactoriser `src/components/GhostRemixPack.tsx` - Section Packs : remplacer grid de cartes par le nouveau `PackCard` component (créé plus tard), appliquer animations Framer Motion stagger
  - [x] 1.8 Refactoriser `src/components/GhostRemixPack.tsx` - Footer : appliquer nouvelle charte, ajouter effet glow sur liens
  - [x] 1.9 Mettre à jour `src/components/MentionsLegales.tsx` : appliquer nouvelle palette de couleurs cohérente avec le reste du site

- [ ] **2.0 Infrastructure Backend & Base de Données**
  - [ ] 2.1 Créer un compte Supabase (https://supabase.com), créer un nouveau projet "ghost-remix-pack"
  - [ ] 2.2 Récupérer les clés API Supabase (anon key et service role key) depuis le dashboard
  - [ ] 2.3 Créer `.env.local` à la racine et ajouter les variables : `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] 2.4 Installer les dépendances : `npm install @supabase/supabase-js`
  - [ ] 2.5 Créer `src/services/supabase.ts` : initialiser le client Supabase avec les credentials depuis env variables
  - [ ] 2.6 Créer le fichier de migration `supabase/migrations/001_create_tables.sql` avec les tables : `packs` (id, name, price, description, preview_url, file_url, status, created_at, sold_at), `orders` (id, pack_id FK, customer_email, customer_name, stripe_payment_id, amount_paid, status, created_at), `newsletter` (id, email, subscribed_at)
  - [ ] 2.7 Exécuter la migration via Supabase Dashboard SQL Editor ou CLI
  - [ ] 2.8 Configurer Supabase Storage : créer deux buckets `previews` (public) et `files` (private) pour stocker les fichiers audio
  - [ ] 2.9 Configurer les policies Supabase Storage : bucket `previews` en lecture publique, bucket `files` accessible uniquement via signed URLs
  - [ ] 2.10 Créer `src/types/index.ts` : définir les types TypeScript `Pack`, `Order`, `NewsletterSubscriber` correspondant aux tables
  - [ ] 2.11 Créer un utilisateur admin dans Supabase Auth (via dashboard) pour l'accès au dashboard admin

- [ ] **3.0 Player Audio Avancé avec Waveform**
  - [ ] 3.1 Installer WaveSurfer.js : `npm install wavesurfer.js`
  - [ ] 3.2 Créer `src/components/AudioPlayer.tsx` : composant de base avec import WaveSurfer, container pour la waveform, state pour tracking lecture (isPlaying)
  - [ ] 3.3 Dans `AudioPlayer.tsx` : initialiser WaveSurfer avec options (waveColor gradient violet/cyan, progressColor, barWidth, height, responsive)
  - [ ] 3.4 Dans `AudioPlayer.tsx` : ajouter bouton play/pause stylisé avec icône Lucide, connecter au state isPlaying
  - [ ] 3.5 Dans `AudioPlayer.tsx` : charger l'URL audio via props, gérer les événements WaveSurfer (ready, finish, error)
  - [ ] 3.6 Dans `AudioPlayer.tsx` : appliquer le design néon (container avec border violet, glow effect, boutons avec gradient)
  - [ ] 3.7 Créer `src/hooks/useAudio.ts` : hook custom pour gérer le state audio global (un seul player actif à la fois)
  - [ ] 3.8 Tester AudioPlayer avec une URL de fichier audio de test

- [ ] **4.0 Système de Paiement Stripe & Checkout**
  - [ ] 4.1 Créer un compte Stripe (https://stripe.com), récupérer les clés API (test mode)
  - [ ] 4.2 Ajouter clés Stripe dans `.env.local` : `VITE_STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`
  - [ ] 4.3 Installer Stripe : `npm install @stripe/stripe-js @stripe/react-stripe-js`
  - [ ] 4.4 Créer `src/services/stripe.ts` : initialiser Stripe avec la clé publique
  - [ ] 4.5 Créer `src/components/CheckoutPage.tsx` : page de checkout avec formulaire (email, nom optionnel, checkbox CGV)
  - [ ] 4.6 Dans `CheckoutPage.tsx` : intégrer Stripe Elements (CardElement) avec design personnalisé néon
  - [ ] 4.7 Créer une Edge Function Supabase `supabase/functions/create-payment-intent.ts` : accepte pack_id et email, crée un Payment Intent Stripe, retourne client_secret
  - [ ] 4.8 Dans `CheckoutPage.tsx` : au submit du formulaire, appeler l'edge function pour créer Payment Intent, puis confirmer avec Stripe.confirmCardPayment
  - [ ] 4.9 Dans `CheckoutPage.tsx` : gérer les états loading, erreur, succès avec UI appropriée
  - [ ] 4.10 Créer `src/components/SuccessPage.tsx` : page de confirmation affichant message de succès, instructions, design néon cohérent
  - [ ] 4.11 Mettre à jour `src/App.tsx` : ajouter routes `/checkout/:packId` et `/success/:orderId`
  - [ ] 4.12 Configurer webhook Stripe (endpoint Supabase Edge Function) pour recevoir l'événement `payment_intent.succeeded`
  - [ ] 4.13 Créer `supabase/functions/stripe-webhook.ts` : vérifier signature webhook, extraire payment_intent, mettre à jour status order, marquer pack comme "sold" dans la DB
  - [ ] 4.14 Dans le webhook : déclencher l'envoi de l'email de livraison après mise à jour du statut

- [ ] **5.0 Livraison Automatique par Email**
  - [ ] 5.1 Créer compte Resend (https://resend.com) ou SendGrid, récupérer API key
  - [ ] 5.2 Ajouter clé email dans `.env.local` : `RESEND_API_KEY` ou `SENDGRID_API_KEY`
  - [ ] 5.3 Installer SDK : `npm install resend` (dans functions Supabase Edge Functions)
  - [ ] 5.4 Créer template email HTML `supabase/functions/templates/delivery-email.html` : design stylisé néon, logo Ghost Remix Pack, message de confirmation, bouton de téléchargement stylisé
  - [ ] 5.5 Créer `supabase/functions/send-delivery-email.ts` : Edge Function acceptant order_id, récupère les infos order + pack, génère signed URL pour téléchargement fichier WAV depuis Supabase Storage
  - [ ] 5.6 Dans `send-delivery-email.ts` : utiliser Resend/SendGrid pour envoyer l'email avec template, destinataire = customer_email, lien de téléchargement inclus
  - [ ] 5.7 Appeler cette fonction depuis le webhook Stripe après confirmation de paiement
  - [ ] 5.8 Tester l'envoi d'email en mode test avec un paiement fictif Stripe

- [ ] **6.0 Dashboard Administrateur**
  - [ ] 6.1 Créer `src/components/admin/Login.tsx` : page de login avec formulaire email/password, appel Supabase Auth signInWithPassword
  - [ ] 6.2 Créer `src/services/auth.ts` : fonctions helpers pour login, logout, getCurrentUser, vérifier si user est admin
  - [ ] 6.3 Créer `src/components/admin/Dashboard.tsx` : layout principal du dashboard avec sidebar/menu, protected route (redirect si non authentifié)
  - [ ] 6.4 Créer `src/components/admin/PackList.tsx` : composant affichant la liste des packs (table avec colonnes : nom, prix, status, actions), fetch data depuis Supabase `packs` table
  - [ ] 6.5 Dans `PackList.tsx` : ajouter boutons d'action (modifier, supprimer) pour chaque pack
  - [ ] 6.6 Créer `src/components/admin/PackForm.tsx` : formulaire d'ajout/modification de pack (champs : name, price, description, upload preview, upload file WAV)
  - [ ] 6.7 Dans `PackForm.tsx` : implémenter upload de fichiers vers Supabase Storage (bucket previews pour MP3, bucket files pour WAV), afficher progress bar
  - [ ] 6.8 Dans `PackForm.tsx` : au submit, insérer/update dans table `packs` avec URLs des fichiers uploadés
  - [ ] 6.9 Dans `PackList.tsx` : implémenter fonction de suppression (supprimer de la DB + supprimer fichiers du storage)
  - [ ] 6.10 Mettre à jour `src/App.tsx` : ajouter routes `/admin`, `/admin/login`, `/admin/packs`, `/admin/packs/new`, `/admin/packs/:id/edit`
  - [ ] 6.11 Appliquer design néon cohérent sur toutes les pages admin (boutons, tables, formulaires)

- [ ] **7.0 Fonctionnalités Complémentaires**
  - [x] 7.1 Créer `src/components/ContactPage.tsx` : formulaire de contact avec champs (nom, email, sujet, message), design néon
  - [ ] 7.2 Créer Edge Function `supabase/functions/send-contact-email.ts` : reçoit données formulaire, envoie email à l'adresse contact de Ghost Remix Pack via Resend/SendGrid
  - [ ] 7.3 Dans `ContactPage.tsx` : au submit, appeler l'edge function, afficher message de confirmation ou erreur
  - [x] 7.4 Mettre à jour `src/App.tsx` : ajouter route `/contact`
  - [x] 7.5 Créer `src/components/NewsletterForm.tsx` : formulaire simple avec champ email, design néon compact pour le footer
  - [x] 7.6 Dans `NewsletterForm.tsx` : au submit, insérer email dans table `newsletter` de Supabase, afficher message de confirmation
  - [x] 7.7 Intégrer `NewsletterForm` dans le footer de `src/components/GhostRemixPack.tsx`
  - [x] 7.8 Mettre à jour le header de `GhostRemixPack.tsx` : ajouter lien "Contact" vers `/contact`

- [ ] **8.0 Intégration Finale & Création du PackCard**
  - [ ] 8.1 Créer `src/components/PackCard.tsx` : composant carte de pack avec design néon complet (fond bg-card, border glow au hover)
  - [ ] 8.2 Dans `PackCard.tsx` : afficher nom, prix, description, badge "EXCLUSIF" stylisé, ou badge "VENDU" si status = sold
  - [ ] 8.3 Dans `PackCard.tsx` : intégrer `AudioPlayer` component pour la preview audio
  - [ ] 8.4 Dans `PackCard.tsx` : ajouter bouton "Acheter maintenant" avec gradient néon, link vers `/checkout/:packId`, désactivé si pack vendu
  - [ ] 8.5 Créer `src/hooks/usePacks.ts` : hook React Query (installer `npm install @tanstack/react-query`) pour fetcher les packs depuis Supabase, gérer cache et loading state
  - [ ] 8.6 Dans `src/components/GhostRemixPack.tsx` : remplacer les packs hardcodés par `usePacks()`, mapper sur `PackCard` component
  - [ ] 8.7 Configurer React Query Provider dans `src/main.tsx` ou `src/App.tsx`
  - [ ] 8.8 Tester le flow complet : voir packs → écouter preview → cliquer acheter → checkout → paiement test Stripe → recevoir email → télécharger WAV

- [ ] **9.0 Déploiement & Optimisation**
  - [ ] 9.1 Créer fichier `.env.example` avec toutes les variables nécessaires (sans valeurs sensibles) pour documentation
  - [ ] 9.2 Configurer les variables d'environnement sur Vercel/Netlify (toutes les clés API : Supabase, Stripe, Resend)
  - [ ] 9.3 Optimiser `vite.config.ts` : activer code splitting, lazy loading des routes admin
  - [ ] 9.4 Ajouter lazy loading pour les composants lourds (AudioPlayer, CheckoutPage) avec React.lazy et Suspense
  - [ ] 9.5 Optimiser les images : compresser logo si présent, utiliser formats modernes (WebP)
  - [ ] 9.6 Tester les performances avec Lighthouse : viser score > 90 sur Performance, Accessibility, Best Practices
  - [ ] 9.7 Configurer Stripe en mode production (clés live) et tester un paiement réel de test (avec remboursement)
  - [ ] 9.8 Configurer le domaine custom sur Vercel/Netlify (ex: ghostremixpack.com)
  - [ ] 9.9 Configurer Supabase en mode production : vérifier les policies RLS, sécuriser les endpoints
  - [ ] 9.10 Faire un test end-to-end complet en production : navigation, achat, email, téléchargement
  - [ ] 9.11 Configurer monitoring (optionnel) : Sentry pour error tracking, analytics (Plausible ou Google Analytics)

---

## Notes

✅ **Codebase actuel** : React 18 + TypeScript + Vite + React Router + Tailwind + Framer Motion + shadcn/ui  
📦 **Stack à ajouter** : Supabase, Stripe, WaveSurfer.js, React Query, Resend/SendGrid  
🎨 **Design** : Refonte complète avec charte néon premium  
⚡ **Priorité** : Fonctionnalités core (paiement, player, admin) avant fonctionnalités secondaires

---

**J'ai généré les tâches parent de haut niveau basées sur le PRD.**

**Prêt à générer les sous-tâches détaillées ?**  
👉 **Répondez avec "Go" pour procéder.**

