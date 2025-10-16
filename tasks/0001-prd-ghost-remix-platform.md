# PRD - Ghost Remix Pack - Plateforme E-Commerce Complète

**Numéro de PRD** : 0001  
**Date de création** : 12 octobre 2025  
**Statut** : Draft  
**Version** : 1.0  

---

## 1. Introduction / Vue d'ensemble

### Contexte
Ghost Remix Pack est actuellement un site vitrine présentant des packs de remixes exclusifs anonymes. Le site doit évoluer vers une **plateforme e-commerce complète et premium** permettant la vente automatisée de packs audio exclusifs avec une expérience utilisateur exceptionnelle.

### Problème à résoudre
Actuellement, le site ne permet pas :
- D'acheter les packs directement en ligne
- De gérer automatiquement l'exclusivité des packs
- De livrer les fichiers audio aux clients
- D'administrer facilement le catalogue de packs
- D'offrir une expérience audio immersive

### Vision
Créer **la plateforme de référence** pour l'achat de remixes exclusifs anonymes, avec un design futuriste premium (néon violet/cyan), une expérience audio immersive et un système de vente gérant l'exclusivité totale de chaque pack.

### Objectif principal
Transformer Ghost Remix Pack en une plateforme e-commerce opérationnelle, premium et automatisée, capable de vendre des packs audio exclusifs avec une expérience utilisateur de classe mondiale.

---

## 2. Goals (Objectifs mesurables)

1. **Conversion** : Permettre l'achat en ligne de packs avec un taux de conversion > 3%
2. **Exclusivité** : Gérer automatiquement le retrait des packs après vente unique
3. **Livraison** : Livrer les fichiers WAV par email dans les 5 minutes suivant l'achat
4. **Design** : Atteindre un score "wow effect" avec la nouvelle charte graphique néon
5. **Performance** : Temps de chargement < 2 secondes sur desktop et mobile
6. **Administration** : Permettre l'ajout d'un nouveau pack en moins de 10 minutes
7. **Fiabilité** : 99.9% de disponibilité du système de paiement

---

## 3. User Stories

### En tant que visiteur (non connecté)
- Je veux voir les packs disponibles avec leurs prix pour décider lequel m'intéresse
- Je veux écouter des extraits audio avec un player moderne pour évaluer la qualité
- Je veux voir clairement qu'un pack est exclusif (1 seule vente) pour comprendre sa rareté
- Je veux pouvoir acheter rapidement sans créer de compte pour éviter les frictions
- Je veux être immergé dans un univers visuel premium (néon, glows) pour ressentir le côté haut de gamme

### En tant qu'acheteur
- Je veux payer par carte bancaire de manière sécurisée pour avoir confiance
- Je veux recevoir mon pack par email immédiatement pour l'utiliser rapidement
- Je veux télécharger des fichiers WAV de haute qualité pour mes performances
- Je veux avoir la certitude que mon pack est exclusif pour justifier le prix
- Je peux créer un compte après achat (optionnel) pour retrouver ma commande

### En tant qu'administrateur
- Je veux ajouter un nouveau pack facilement (titre, prix, description, fichiers) pour maintenir le catalogue à jour
- Je veux voir quels packs sont disponibles et lesquels sont vendus pour gérer mon inventaire
- Je veux modifier ou supprimer un pack si nécessaire pour corriger des erreurs
- Je veux uploader plusieurs fichiers audio (preview + fichier complet WAV) pour chaque pack

### En tant que client newsletter
- Je veux m'inscrire à la newsletter pour être averti des nouveaux packs
- Je veux recevoir des emails stylisés cohérents avec l'identité visuelle

---

## 4. Exigences fonctionnelles

### 4.1 Page d'accueil et catalogue

**FR-01** : Le site doit afficher les packs disponibles avec :
- Nom du pack
- Prix en euros
- Description courte
- Badge "EXCLUSIF" visible
- Statut "VENDU" si le pack n'est plus disponible

**FR-02** : Chaque pack doit avoir un player audio avancé permettant :
- Lecture de l'extrait preview (30-60 secondes)
- Visualisation waveform (forme d'onde) animée
- Contrôles play/pause
- Progress bar interactive
- Design cohérent avec la charte néon

**FR-03** : Le design doit implémenter la nouvelle charte graphique :
- Fond principal : `#0B0B0F` (noir profond bleuté)
- Accent principal : `#9B5CF6` (violet néon lumineux)
- Accent secondaire : `#00E5FF` (cyan futuriste)
- Texte : `#F5F5F7` (blanc chaud) et `#B0B0C0` (gris clair)
- Effets de glow : `box-shadow: 0 0 20px rgba(155, 92, 246, 0.4)`
- Dégradés radiaux avec halos néon
- Typographie : Poppins/Satoshi
- Animations Framer Motion fluides sur tous les éléments interactifs

**FR-04** : Le Hero section doit inclure :
- Dégradé de fond avec halo violet diffus
- Animation d'entrée du titre (fade + slide)
- Effets de particules ou fumée douce en arrière-plan (Framer Motion)
- Bouton CTA avec dégradé violet/cyan et effet glow

**FR-05** : Le site doit être entièrement responsive (mobile, tablette, desktop)

### 4.2 Processus d'achat et paiement

**FR-06** : Un bouton "Acheter maintenant" doit être visible sur chaque pack disponible

**FR-07** : Le système doit permettre l'achat sans création de compte (guest checkout)

**FR-08** : Le formulaire de checkout doit demander :
- Email (obligatoire pour livraison)
- Nom et prénom (optionnel)
- Acceptation des CGV (checkbox obligatoire)

**FR-09** : Le paiement doit s'effectuer via Stripe :
- Carte bancaire uniquement (Visa, Mastercard, Amex)
- Interface Stripe Checkout ou Elements intégré
- Montant en euros
- Paiement sécurisé 3D Secure

**FR-10** : Une fois le paiement validé :
- Le pack doit être automatiquement marqué comme "VENDU"
- Le pack doit disparaître de la liste des packs disponibles
- Il ne doit plus être possible de l'acheter

### 4.3 Livraison des fichiers

**FR-11** : Un email automatique doit être envoyé immédiatement après paiement confirmé contenant :
- Confirmation d'achat
- Nom du pack acheté
- Lien de téléchargement direct du fichier WAV
- Instructions d'utilisation
- Email stylisé cohérent avec la charte graphique

**FR-12** : Le lien de téléchargement doit :
- Pointer vers un fichier ZIP contenant le(s) fichier(s) WAV du pack
- Être accessible immédiatement
- Rester actif de manière permanente (pas d'expiration)

**FR-13** : Les fichiers livrés doivent être au format WAV (lossless, qualité studio)

### 4.4 Gestion des comptes utilisateurs (optionnel)

**FR-14** : Un visiteur peut créer un compte optionnel avec :
- Email
- Mot de passe
- Nom/prénom (optionnel)

**FR-15** : Un client peut créer un compte après achat en utilisant l'email d'achat

**FR-16** : Un utilisateur connecté peut :
- Voir l'historique de ses commandes
- Ré-accéder aux liens de téléchargement
- Modifier ses informations

**FR-17** : La connexion/inscription doit supporter :
- Login classique (email + mot de passe)
- Réinitialisation de mot de passe par email

### 4.5 Dashboard Administrateur

**FR-18** : Une interface d'administration protégée doit être accessible à `/admin`

**FR-19** : L'admin doit pouvoir s'authentifier avec login/mot de passe sécurisé

**FR-20** : Le dashboard admin doit permettre de :
- **Voir la liste complète des packs** (disponibles et vendus)
- **Ajouter un nouveau pack** avec :
  - Nom du pack
  - Prix (en euros)
  - Description
  - Upload fichier preview (MP3 ou WAV, 30-60 sec)
  - Upload fichier complet WAV (à livrer après achat)
- **Modifier un pack existant** (changer prix, description, fichiers)
- **Supprimer un pack**
- **Voir le statut** : Disponible ou Vendu

**FR-21** : L'upload de fichiers doit :
- Supporter les fichiers jusqu'à 500 MB
- Valider le format (MP3 pour preview, WAV pour livraison)
- Afficher une barre de progression

### 4.6 Newsletter

**FR-22** : Un formulaire d'inscription newsletter doit être présent dans le footer

**FR-23** : Le formulaire doit demander uniquement l'email

**FR-24** : Les emails doivent être stockés dans une base de données ou service tiers (Mailchimp, Brevo)

**FR-25** : L'admin doit pouvoir exporter la liste des emails inscrits

### 4.7 Formulaire de contact

**FR-26** : Une page `/contact` doit proposer un formulaire avec :
- Nom
- Email
- Sujet
- Message

**FR-27** : L'envoi du formulaire doit envoyer un email à l'adresse de contact de Ghost Remix Pack

### 4.8 Pages légales

**FR-28** : La page `/mentions-legales` existante doit rester accessible

**FR-29** : Un lien vers les mentions légales doit être présent dans le footer

**FR-30** : Les CGV doivent être acceptées avant tout achat

---

## 5. Non-Goals (Hors périmètre)

**Ce qui ne sera PAS inclus dans cette version :**

1. ❌ Système de paiement en plusieurs fois (3x/4x)
2. ❌ PayPal, Apple Pay, Google Pay (uniquement carte bancaire)
3. ❌ Edition limitée avec compteur (uniquement exclusivité totale 1 vente)
4. ❌ Statistiques de vente avancées et analytics dans le dashboard
5. ❌ Codes promo / réductions
6. ❌ Programme de parrainage
7. ❌ Section blog ou actualités
8. ❌ Intégration réseaux sociaux avancée
9. ❌ Témoignages clients sur le site
10. ❌ Application mobile native
11. ❌ Système de wishlist/favoris
12. ❌ Recherche et filtres avancés (pour l'instant peu de packs)
13. ❌ Chat support en direct
14. ❌ Marketplace multi-vendeurs

---

## 6. Design Considerations

### 6.1 Charte graphique (OBLIGATOIRE)

#### Palette de couleurs
```css
/* Fonds */
--bg-primary: #0B0B0F;        /* Noir profond bleuté */
--bg-card: #141420;           /* Noir adouci pour cartes */

/* Accents */
--accent-primary: #9B5CF6;    /* Violet néon lumineux */
--accent-secondary: #00E5FF;  /* Cyan futuriste */

/* Textes */
--text-primary: #F5F5F7;      /* Blanc chaud */
--text-secondary: #B0B0C0;    /* Gris clair */

/* Effets */
--glow-violet: 0 0 20px rgba(155, 92, 246, 0.4);
--glow-cyan: 0 0 20px rgba(0, 229, 255, 0.3);
```

#### Typographie
- **Titres / Logo** : Poppins ExtraLight ou Satoshi Regular (majuscule fine, espacement large)
- **Texte courant** : Inter ou Poppins Regular
- **Effet survol texte** : `text-shadow: 0 0 10px rgba(155,92,246,0.6)`

#### Boutons
```css
background: linear-gradient(90deg, #9B5CF6, #00E5FF);
color: white;
border: none;
border-radius: 9999px; /* fully rounded */
padding: 0.8rem 2rem;
box-shadow: 0 0 20px rgba(155,92,246,0.4);
transition: all 0.3s ease;

/* Hover */
filter: brightness(1.3);
transform: scale(1.05);
```

#### Cartes
```css
background: #141420;
border: 1px solid transparent;
border-radius: 1rem;
transition: all 0.3s ease;

/* Hover */
border: 1px solid rgba(155,92,246,0.3);
box-shadow: 0 0 30px rgba(155,92,246,0.2);
```

### 6.2 Animations et effets

**Animation d'entrée (Framer Motion)** :
- Fade in + slide up pour les titres
- Stagger pour les cartes de packs
- Transition douce entre les pages

**Effets de fond** :
- Dégradé radial avec halo violet : `radial-gradient(circle at top right, rgba(155,92,246,0.15), transparent 70%)`
- Particules/fumée animée en arrière-plan du Hero (Framer Motion)
- Backdrop blur sur zones semi-transparentes : `backdrop-filter: blur(10px)`

**Micro-interactions** :
- Hover sur boutons : scale + brightness
- Hover sur cartes : glow violet
- Hover sur liens : underline animé
- Audio player : waveform animé en temps réel

### 6.3 Player audio avec waveform

Librairie recommandée : **WaveSurfer.js** ou **Peaks.js**

**Fonctionnalités** :
- Visualisation de la forme d'onde colorée (dégradé violet/cyan)
- Progress bar interactive (clic pour naviguer)
- Bouton play/pause stylisé
- Animation fluide lors de la lecture
- Design intégré à la charte néon

### 6.4 Responsive

- **Mobile** : Navigation hamburger, cartes empilées, player simplifié
- **Tablette** : Grid 2 colonnes
- **Desktop** : Grid 3 colonnes, effets complets

---

## 7. Technical Considerations

### 7.1 Stack technique actuel
- **Framework** : React 18 + TypeScript
- **Build tool** : Vite
- **Router** : React Router
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **UI Components** : shadcn/ui

### 7.2 Stack à ajouter

**Backend & Base de données** :
- Option A : **Supabase** (BaaS complet : DB PostgreSQL, Auth, Storage, Functions)
- Option B : **Firebase** (BaaS Google)
- Option C : **Backend custom** (Node.js + Express + PostgreSQL)

**Recommandation** : Supabase (open-source, TypeScript-friendly, très complet)

**Paiement** :
- **Stripe** (Checkout ou Elements)
- Webhooks pour confirmation de paiement

**Email** :
- **Resend** ou **SendGrid** ou **Postmark** (envoi transactionnel)
- Templates HTML stylisés

**Storage fichiers audio** :
- **Supabase Storage** ou **AWS S3** ou **Cloudflare R2**
- CDN pour optimiser la livraison

**Newsletter** :
- **Mailchimp** ou **Brevo** (ex-Sendinblue) ou **ConvertKit**

**Waveform audio** :
- **WaveSurfer.js** (React wrapper disponible)

### 7.3 Architecture

```
Frontend (React + Vite)
├── Pages
│   ├── Home (catalogue packs)
│   ├── Checkout
│   ├── Success (confirmation achat)
│   ├── Contact
│   ├── Mentions légales
│   └── Admin Dashboard
├── Components
│   ├── PackCard (avec player waveform)
│   ├── AudioPlayer
│   ├── CheckoutForm
│   └── AdminPackForm
└── Services
    ├── api.ts (appels backend)
    ├── stripe.ts
    └── auth.ts

Backend (Supabase ou custom)
├── Database
│   ├── packs (id, name, price, description, status, preview_url, file_url)
│   ├── orders (id, pack_id, email, stripe_payment_id, created_at)
│   ├── users (id, email, password_hash)
│   └── newsletter (id, email, subscribed_at)
├── Storage
│   ├── previews/ (fichiers MP3 preview)
│   └── files/ (fichiers WAV complets)
└── Functions
    ├── handle-payment-success (webhook Stripe)
    └── send-delivery-email
```

### 7.4 Intégration Stripe

**Flux de paiement** :
1. User clique "Acheter" → Ouverture modal/page checkout
2. User remplit email + infos carte (Stripe Elements)
3. User valide → Appel API backend pour créer Payment Intent
4. Stripe traite le paiement (3D Secure si nécessaire)
5. **Webhook Stripe** notifie le backend du succès
6. Backend marque le pack comme vendu + envoie email de livraison
7. User redirigé vers page de confirmation

**Important** : Utiliser les **webhooks Stripe** pour garantir la fiabilité (ne pas se fier uniquement au redirect côté client)

### 7.5 Sécurité

- **Authentification admin** : JWT ou session sécurisée
- **Upload fichiers** : Validation type MIME + taille max
- **Paiement** : PCI-DSS compliant (délégué à Stripe)
- **HTTPS** : Obligatoire en production
- **Rate limiting** : Protection contre abus (API)
- **CORS** : Configurer correctement pour les domaines autorisés

### 7.6 Performance

- **Lazy loading** des images et composants lourds
- **Code splitting** par route
- **Compression** des fichiers audio preview (MP3 optimisé)
- **CDN** pour les fichiers statiques et audio
- **Caching** intelligent (Service Worker)

---

## 8. Success Metrics

### Métriques de conversion
1. **Taux de conversion** : % visiteurs → acheteurs (objectif : > 3%)
2. **Taux d'abandon panier** : % checkouts initiés non finalisés (objectif : < 40%)
3. **Temps moyen jusqu'à l'achat** : Durée session → achat (objectif : < 10 min)

### Métriques techniques
4. **Temps de livraison email** : Délai paiement → réception email (objectif : < 5 min)
5. **Disponibilité système paiement** : Uptime Stripe (objectif : > 99.9%)
6. **Temps de chargement page** : First Contentful Paint (objectif : < 2s)
7. **Score Lighthouse** : Performance, Accessibility, Best Practices (objectif : > 90)

### Métriques business
8. **Chiffre d'affaires mensuel** : Total des ventes
9. **Panier moyen** : Montant moyen par transaction
10. **Taux d'inscription newsletter** : % visiteurs qui s'inscrivent

### Métriques qualitatives
11. **Feedback utilisateurs** : Commentaires post-achat (formulaire optionnel)
12. **Taux de support** : Nombre de demandes d'aide / nombre de ventes (objectif : < 5%)

---

## 9. Open Questions

### Questions nécessitant des décisions futures

1. **Hébergement du backend** : Supabase ou solution custom ? Quelle infrastructure choisir ?

2. **Gestion des refunds** : Que se passe-t-il si un client demande un remboursement ? (Les CGV indiquent "aucun remboursement" mais Stripe/banques peuvent forcer)

3. **Limite de téléchargements** : Le lien de téléchargement est-il illimité dans le temps ? Faut-il tracker le nombre de téléchargements pour prévenir les abus ?

4. **Notification nouveaux packs** : Envoyer un email automatique à tous les inscrits newsletter dès qu'un nouveau pack est ajouté ? Ou envoi manuel par l'admin ?

5. **Nom de domaine** : Quel domaine final ? (ghostremixpack.com ?)

6. **Environnement de staging** : Besoin d'un environnement de test pour valider les paiements en mode test Stripe ?

7. **Analytics** : Intégrer Google Analytics ou alternative (Plausible, Fathom) dès le début ?

8. **Multi-langue** : Site 100% français pour l'instant, ou prévoir internationalisation future ?

9. **Backup des fichiers** : Quelle stratégie de backup pour les fichiers WAV uploadés ? (Redondance géographique ?)

10. **Logs et monitoring** : Quel outil pour surveiller les erreurs en production ? (Sentry, LogRocket ?)

---

## 10. Annexes

### A. Références de design

**Moodboard / Style visuel** :
- Burial / ODESZA / Cercle / Spotify Neon Sessions
- Style : Luxury Ghost + Futuristic Club
- Ambiance : lumière diffuse, contraste, profondeur, néons doux, textures vaporeuses

**Sites d'inspiration** :
- Beatport (pour le player audio)
- Splice (pour le catalogue de samples)
- Stripe Checkout (pour l'UI de paiement)

### B. User flow principal (achat)

```
1. Visiteur arrive sur la home
   ↓
2. Scroll et découvre les packs avec player waveform
   ↓
3. Écoute des extraits, lit les descriptions
   ↓
4. Décide d'acheter → Clic "Acheter maintenant"
   ↓
5. Formulaire checkout (email + carte bancaire)
   ↓
6. Accepte les CGV
   ↓
7. Valide le paiement (3D Secure si demandé)
   ↓
8. Redirection page "Merci !"
   ↓
9. Reçoit email avec lien de téléchargement WAV
   ↓
10. Télécharge son pack exclusif
```

### C. Schéma base de données (simplifié)

```sql
-- Table packs
packs
- id (uuid, PK)
- name (text)
- price (integer, en centimes)
- description (text)
- preview_url (text, URL fichier MP3)
- file_url (text, URL fichier WAV)
- status (enum: 'available', 'sold')
- created_at (timestamp)
- sold_at (timestamp, nullable)

-- Table orders
orders
- id (uuid, PK)
- pack_id (uuid, FK → packs)
- customer_email (text)
- customer_name (text, nullable)
- stripe_payment_id (text)
- amount_paid (integer)
- status (enum: 'pending', 'completed', 'failed')
- created_at (timestamp)

-- Table users (optionnel)
users
- id (uuid, PK)
- email (text, unique)
- password_hash (text)
- name (text, nullable)
- created_at (timestamp)

-- Table newsletter
newsletter
- id (uuid, PK)
- email (text, unique)
- subscribed_at (timestamp)
```

---

## Conclusion

Ce PRD définit une plateforme e-commerce complète, premium et ultra-soignée pour Ghost Remix Pack. L'accent est mis sur :

1. **L'exclusivité** : Système de vente unique automatisé
2. **Le design** : Charte graphique néon futuriste avec animations avancées
3. **L'audio** : Player waveform immersif pour une expérience sonore exceptionnelle
4. **La simplicité** : Achat rapide sans friction
5. **La qualité** : Fichiers WAV professionnels

**Prochaine étape** : Générer la liste de tâches détaillée pour l'implémentation.

---

**Auteur** : Équipe Ghost Remix Pack  
**Dernière mise à jour** : 12 octobre 2025

