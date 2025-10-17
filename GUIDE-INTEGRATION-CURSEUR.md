# 📖 GUIDE D'INTÉGRATION - CURSEUR PROFESSIONNEL

**Pour :** Ghost Remix Pack  
**Date :** Janvier 2025  
**Version :** 1.0

---

## 🎯 INTRODUCTION

Ce guide vous accompagne étape par étape pour intégrer le curseur personnalisé professionnel sur votre site **ghostremixpack.com**.

### ✅ Prérequis

- Accès FTP/SFTP ou interface d'hébergement (Vercel, Netlify, etc.)
- Éditeur de code (VS Code, Sublime Text, etc.)
- Connaissances HTML/CSS/JS de base (optionnel)
- 15-30 minutes de temps

---

## 📋 TABLE DES MATIÈRES

1. [Méthode 1 : Intégration Complète (Recommandée)](#méthode-1-intégration-complète)
2. [Méthode 2 : Intégration Modulaire](#méthode-2-intégration-modulaire)
3. [Personnalisation](#personnalisation)
4. [Tests](#tests)
5. [Troubleshooting](#troubleshooting)
6. [FAQ](#faq)

---

## 🚀 MÉTHODE 1 : INTÉGRATION COMPLÈTE

### Étape 1 : Préparer les fichiers

**Option A : Si vous utilisez un framework (React, Next.js, Vue, etc.)**

Créez un nouveau composant `CustomCursor.jsx` :

```jsx
// src/components/CustomCursor.jsx
import { useEffect } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  useEffect(() => {
    // Le code JavaScript sera ici
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // ... (copier le code JS du fichier HTML)
    
    return () => {
      // Cleanup si nécessaire
    };
  }, []);

  return (
    <>
      <div className="custom-cursor"></div>
      <div className="cursor-follower"></div>
    </>
  );
}
```

Créez le fichier CSS `CustomCursor.css` :

```css
/* Copier tout le CSS du fichier HTML ici */
```

**Option B : Si vous utilisez du HTML statique**

1. Ouvrez le fichier `CURSEUR-PROFESSIONNEL.html`
2. Copiez la section `<style>` complète
3. Copiez la section `<script>` complète
4. Copiez les éléments HTML du curseur :
   ```html
   <div class="custom-cursor"></div>
   <div class="cursor-follower"></div>
   ```

---

### Étape 2 : Intégration dans votre site

#### Pour React/Next.js

**1. Ajouter le composant au layout principal :**

```jsx
// app/layout.jsx (Next.js 13+)
import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
```

**2. Ou dans `pages/_app.js` (Next.js 12) :**

```jsx
// pages/_app.js
import CustomCursor from '../components/CustomCursor';

export default function App({ Component, pageProps }) {
  return (
    <>
      <CustomCursor />
      <Component {...pageProps} />
    </>
  );
}
```

#### Pour HTML statique

**1. Ajoutez dans votre `<head>` :**

```html
<head>
  <!-- ... autres balises ... -->
  
  <!-- Curseur CSS -->
  <link rel="stylesheet" href="/css/custom-cursor.css">
</head>
```

**2. Ajoutez avant la fermeture de `</body>` :**

```html
<body>
  <!-- ... votre contenu ... -->
  
  <!-- Curseur HTML -->
  <div class="custom-cursor"></div>
  <div class="cursor-follower"></div>
  
  <!-- Curseur JS -->
  <script src="/js/custom-cursor.js"></script>
</body>
```

---

### Étape 3 : Vérifier l'intégration

1. Ouvrez votre site dans un navigateur
2. Ouvrez la console (F12)
3. Vous devriez voir : `✨ Curseur professionnel initialisé avec succès !`
4. Survolez différents éléments (liens, boutons, images)
5. Le curseur devrait changer d'apparence

---

## 🔧 MÉTHODE 2 : INTÉGRATION MODULAIRE

Si vous préférez une approche plus modulaire, voici comment découper le code :

### Structure de fichiers

```
src/
├── components/
│   └── CustomCursor/
│       ├── CustomCursor.jsx
│       ├── CustomCursor.css
│       └── cursorLogic.js
├── styles/
│   └── cursor-variables.css
└── utils/
    └── cursorHelpers.js
```

### 1. Variables CSS séparées

Créez `cursor-variables.css` :

```css
/* styles/cursor-variables.css */
:root {
  --cursor-primary: #FF6B35;
  --cursor-secondary: #004E89;
  --cursor-accent: #00D9FF;
  /* ... autres variables ... */
}
```

### 2. Logique JavaScript séparée

Créez `cursorLogic.js` :

```javascript
// utils/cursorLogic.js
export function initCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.cursor-follower');
  
  // ... logique du curseur ...
  
  return {
    cursor,
    follower,
    destroy: () => {
      // Cleanup
    }
  };
}

export function isMobileOrTablet() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
```

### 3. Composant React

```jsx
// components/CustomCursor/CustomCursor.jsx
import { useEffect, useRef } from 'react';
import { initCursor, isMobileOrTablet } from '../../utils/cursorLogic';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorInstance = useRef(null);

  useEffect(() => {
    if (isMobileOrTablet()) {
      console.log('📱 Mobile détecté : curseur désactivé');
      return;
    }

    cursorInstance.current = initCursor();

    return () => {
      if (cursorInstance.current) {
        cursorInstance.current.destroy();
      }
    };
  }, []);

  if (isMobileOrTablet()) {
    return null;
  }

  return (
    <>
      <div className="custom-cursor"></div>
      <div className="cursor-follower"></div>
    </>
  );
}
```

---

## 🎨 PERSONNALISATION

### 1. Changer les couleurs

#### Méthode A : Variables CSS

Modifiez dans votre CSS :

```css
:root {
  /* Vos couleurs personnalisées */
  --cursor-primary: #YOUR_COLOR;
  --cursor-secondary: #YOUR_COLOR;
  --cursor-accent: #YOUR_COLOR;
}
```

#### Méthode B : JavaScript dynamique

```javascript
// Changer les couleurs à la volée
updateCursorColors('#FF0000', '#00FF00', '#0000FF');
```

### 2. Ajuster les tailles

```css
:root {
  --cursor-size: 25px;        /* Taille du curseur */
  --follower-size: 50px;      /* Taille du follower */
  --cursor-hover-scale: 2;    /* Agrandissement au hover */
}
```

### 3. Modifier les animations

```css
:root {
  --cursor-transition: 0.5s ease-in-out;  /* Vitesse transitions */
  --magnetic-strength: 0.5;                /* Force effet magnétique */
}

/* Changer l'animation pulse */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }  /* Plus prononcé */
}
```

### 4. Désactiver certains effets

```javascript
// Dans votre code JavaScript
const ENABLE_RIPPLE = true;      // Effet ripple au clic
const ENABLE_TRAIL = true;       // Particules de traînée
const ENABLE_MAGNETIC = true;    // Effet magnétique sur boutons
const ENABLE_AUDIO_EFFECT = true; // Effet sur players audio
```

### 5. Ajouter des états personnalisés

```css
/* État personnalisé : Survol de produit */
.custom-cursor.hover-product {
  width: calc(var(--cursor-size) * 2.5);
  height: calc(var(--cursor-size) * 2.5);
  background: linear-gradient(45deg, gold, orange);
}

.custom-cursor.hover-product::after {
  content: 'BUY NOW';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: bold;
  color: white;
}
```

```javascript
// Appliquer l'état personnalisé
const products = document.querySelectorAll('.product-card');
products.forEach(product => {
  product.addEventListener('mouseenter', () => {
    cursor.classList.add('hover-product');
  });
  
  product.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover-product');
  });
});
```

---

## ✅ TESTS

### Checklist de tests

- [ ] **Desktop (Chrome)**
  - [ ] Curseur visible et suit la souris
  - [ ] Follower suit avec delay
  - [ ] Hover sur liens fonctionne
  - [ ] Hover sur boutons fonctionne
  - [ ] Hover sur images fonctionne
  - [ ] Hover sur audio fonctionne
  - [ ] Hover sur inputs fonctionne
  - [ ] Clic crée un ripple
  - [ ] Effet magnétique sur boutons

- [ ] **Desktop (Firefox)**
  - [ ] Mêmes tests que Chrome

- [ ] **Desktop (Safari)**
  - [ ] Mêmes tests que Chrome

- [ ] **Mobile (iOS Safari)**
  - [ ] Curseur désactivé automatiquement
  - [ ] Curseur système fonctionne normalement

- [ ] **Mobile (Android Chrome)**
  - [ ] Curseur désactivé automatiquement
  - [ ] Curseur système fonctionne normalement

### Tests de performance

```javascript
// Mesurer les FPS
let fps = 0;
let lastTime = performance.now();

function measureFPS() {
  const currentTime = performance.now();
  const delta = currentTime - lastTime;
  fps = Math.round(1000 / delta);
  lastTime = currentTime;
  
  console.log(`FPS: ${fps}`);
  
  requestAnimationFrame(measureFPS);
}

measureFPS();
```

**Objectif :** Maintenir 60 FPS constant

---

## 🔧 TROUBLESHOOTING

### Problème 1 : Le curseur n'apparaît pas

**Solutions :**

1. Vérifiez que les fichiers CSS/JS sont bien chargés :
   ```javascript
   console.log(document.querySelector('.custom-cursor'));
   // Doit retourner l'élément, pas null
   ```

2. Vérifiez qu'il n'y a pas de conflit CSS :
   ```css
   /* Assurez-vous que cursor: none est appliqué */
   * {
     cursor: none !important;
   }
   ```

3. Vérifiez la console pour les erreurs JavaScript

### Problème 2 : Le curseur est trop lent

**Solutions :**

1. Réduisez la taille du follower :
   ```css
   :root {
     --follower-size: 30px;  /* Plus petit = plus rapide */
   }
   ```

2. Ajustez la vitesse de suivi :
   ```javascript
   // Dans animateFollower()
   followerX += dx * 0.25;  // Augmenter = plus rapide
   followerY += dy * 0.25;
   ```

3. Désactivez les effets lourds :
   ```javascript
   const ENABLE_TRAIL = false;
   const ENABLE_RIPPLE = false;
   ```

### Problème 3 : Le curseur apparaît sur mobile

**Solutions :**

1. Vérifiez la détection mobile :
   ```javascript
   console.log(isMobileOrTablet()); // Doit retourner true sur mobile
   ```

2. Ajoutez une vérification supplémentaire :
   ```css
   @media (max-width: 768px) {
     .custom-cursor,
     .cursor-follower {
       display: none !important;
     }
   }
   ```

### Problème 4 : Conflit avec d'autres scripts

**Solutions :**

1. Chargez le script du curseur en dernier :
   ```html
   <!-- Autres scripts -->
   <script src="app.js"></script>
   
   <!-- Curseur en dernier -->
   <script src="custom-cursor.js"></script>
   ```

2. Utilisez un namespace pour éviter les conflits :
   ```javascript
   const GhostRemixCursor = {
     init: function() { /* ... */ },
     destroy: function() { /* ... */ }
   };
   ```

### Problème 5 : Le curseur ne change pas d'état

**Solutions :**

1. Vérifiez que les sélecteurs correspondent :
   ```javascript
   console.log(links.length);  // Doit être > 0
   ```

2. Vérifiez les classes CSS :
   ```css
   /* Assurez-vous que les classes existent */
   .custom-cursor.hover-link { /* ... */ }
   .custom-cursor.hover-button { /* ... */ }
   ```

---

## ❓ FAQ

### Q1 : Puis-je utiliser ce curseur sur plusieurs sites ?

**R :** Oui ! Le curseur est libre d'utilisation. Vous pouvez l'adapter et le personnaliser selon vos besoins.

### Q2 : Le curseur fonctionne-t-il avec tous les frameworks ?

**R :** Oui, le curseur est compatible avec :
- React / Next.js
- Vue / Nuxt
- Angular
- Svelte
- HTML statique
- WordPress (avec quelques modifications)

### Q3 : Comment puis-je désactiver le curseur sur certaines pages ?

**R :** Ajoutez une classe CSS :

```css
.no-custom-cursor * {
  cursor: auto !important;
}

.no-custom-cursor .custom-cursor,
.no-custom-cursor .cursor-follower {
  display: none !important;
}
```

```html
<body class="no-custom-cursor">
  <!-- Curseur désactivé sur cette page -->
</body>
```

### Q4 : Le curseur impacte-t-il les performances ?

**R :** Non, si bien configuré :
- Utilise `requestAnimationFrame` (60 FPS)
- Désactivé automatiquement sur mobile
- Code optimisé (< 10KB)
- Pas de bibliothèques externes

### Q5 : Puis-je ajouter des effets sonores ?

**R :** Oui ! Ajoutez dans votre JavaScript :

```javascript
const hoverSound = new Audio('/sounds/hover.mp3');
const clickSound = new Audio('/sounds/click.mp3');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});

document.addEventListener('click', () => {
  clickSound.currentTime = 0;
  clickSound.play();
});
```

### Q6 : Comment personnaliser le curseur pour chaque page ?

**R :** Utilisez des variables CSS par page :

```html
<!-- Page d'accueil -->
<body data-theme="home">
  <style>
    body[data-theme="home"] {
      --cursor-primary: #FF6B35;
    }
  </style>
</body>

<!-- Page produits -->
<body data-theme="products">
  <style>
    body[data-theme="products"] {
      --cursor-primary: #00D9FF;
    }
  </style>
</body>
```

### Q7 : Le curseur fonctionne-t-il avec les modals/overlays ?

**R :** Oui, automatiquement ! Le curseur fonctionne sur tous les éléments du DOM, y compris les modals.

### Q8 : Puis-je utiliser ce curseur sur un site e-commerce existant ?

**R :** Absolument ! Le curseur s'intègre parfaitement avec :
- Shopify
- WooCommerce
- PrestaShop
- Sites custom

Il suffit d'adapter les sélecteurs selon votre structure HTML.

---

## 📚 RESSOURCES SUPPLÉMENTAIRES

### Documentation

- [MDN - CSS Cursor](https://developer.mozilla.org/fr/docs/Web/CSS/cursor)
- [MDN - requestAnimationFrame](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame)
- [CSS Variables](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties)

### Outils de test

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [BrowserStack](https://www.browserstack.com/) (tests multi-navigateurs)

### Inspiration

- [Cursor Inspiration](https://www.awwwards.com/websites/cursor/)
- [CodePen Cursors](https://codepen.io/search/pens?q=custom+cursor)

---

## 🎯 PROCHAINES ÉTAPES

Après avoir intégré le curseur :

1. ✅ **Tester sur tous les navigateurs**
2. ✅ **Optimiser les performances**
3. ✅ **Personnaliser selon votre branding**
4. ✅ **Collecter les feedbacks utilisateurs**
5. ✅ **Ajuster si nécessaire**

---

## 📞 SUPPORT

Si vous rencontrez des difficultés :

1. Consultez la section [Troubleshooting](#troubleshooting)
2. Vérifiez la [FAQ](#faq)
3. Inspectez la console du navigateur (F12)
4. Contactez le support technique

---

## 📝 CHANGELOG

### Version 1.0 (Janvier 2025)

- ✅ Curseur professionnel complet
- ✅ 6 états interactifs
- ✅ Effet magnétique
- ✅ Ripple au clic
- ✅ Détection mobile automatique
- ✅ Performance optimisée (60 FPS)
- ✅ Documentation complète

---

**Guide créé avec ❤️ pour Ghost Remix Pack**  
**Dernière mise à jour : Janvier 2025**

