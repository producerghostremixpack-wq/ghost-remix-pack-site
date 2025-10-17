# 🎨 GUIDE DE PERSONNALISATION AVANCÉE - CURSEUR PROFESSIONNEL

**Pour :** Ghost Remix Pack  
**Version :** 1.0  
**Date :** Janvier 2025

---

## 📋 TABLE DES MATIÈRES

1. [Personnalisation Rapide](#personnalisation-rapide)
2. [Personnalisation Avancée](#personnalisation-avancée)
3. [Thèmes Prédéfinis](#thèmes-prédéfinis)
4. [Effets Personnalisés](#effets-personnalisés)
5. [Intégrations Spéciales](#intégrations-spéciales)
6. [Optimisations Performance](#optimisations-performance)

---

## 🚀 PERSONNALISATION RAPIDE

### 1. Changer les Couleurs

#### Méthode A : Variables CSS (Recommandée)

```css
:root {
  /* Vos couleurs personnalisées */
  --cursor-primary: #FF6B35;      /* Couleur principale */
  --cursor-secondary: #004E89;    /* Couleur secondaire */
  --cursor-accent: #00D9FF;       /* Couleur accent */
  --cursor-dark: #1A1A1A;         /* Couleur sombre */
  --cursor-light: #FFFFFF;        /* Couleur claire */
}
```

#### Méthode B : JavaScript Dynamique

```javascript
// Changer les couleurs à la volée
updateCursorColors('#FF0000', '#00FF00', '#0000FF');

// Ou manuellement
document.documentElement.style.setProperty('--cursor-primary', '#FF0000');
document.documentElement.style.setProperty('--cursor-secondary', '#00FF00');
document.documentElement.style.setProperty('--cursor-accent', '#0000FF');
```

#### Méthode C : Par Page/Thème

```html
<!-- Page d'accueil -->
<body data-theme="home">
  <style>
    body[data-theme="home"] {
      --cursor-primary: #FF6B35;
      --cursor-secondary: #004E89;
      --cursor-accent: #00D9FF;
    }
  </style>
</body>

<!-- Page produits -->
<body data-theme="products">
  <style>
    body[data-theme="products"] {
      --cursor-primary: #00D9FF;
      --cursor-secondary: #FF6B35;
      --cursor-accent: #004E89;
    }
  </style>
</body>
```

---

### 2. Ajuster les Tailles

```css
:root {
  /* Tailles du curseur */
  --cursor-size: 20px;              /* Taille du curseur principal */
  --follower-size: 40px;            /* Taille du follower */
  --cursor-hover-scale: 1.5;        /* Agrandissement au hover */
  --cursor-click-scale: 0.8;        /* Réduction au clic */
}
```

**Exemples :**

```css
/* Curseur petit et discret */
:root {
  --cursor-size: 15px;
  --follower-size: 30px;
  --cursor-hover-scale: 1.3;
}

/* Curseur grand et visible */
:root {
  --cursor-size: 30px;
  --follower-size: 60px;
  --cursor-hover-scale: 2;
}
```

---

### 3. Modifier les Animations

```css
:root {
  /* Vitesse des transitions */
  --cursor-transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  /* Force de l'effet magnétique */
  --magnetic-strength: 0.3;
  
  /* Opacité */
  --cursor-opacity: 0.9;
  --trail-opacity: 0.3;
}
```

**Easing Functions :**

```css
/* Rapide et vif */
--cursor-transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);

/* Lent et fluide */
--cursor-transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Élastique */
--cursor-transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Bounce */
--cursor-transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

### 4. Désactiver Certains Effets

```javascript
// Dans votre code JavaScript
const CONFIG = {
  ENABLE_RIPPLE: true,        // Effet ripple au clic
  ENABLE_TRAIL: false,        // Particules de traînée (désactivé)
  ENABLE_MAGNETIC: true,      // Effet magnétique sur boutons
  ENABLE_AUDIO_EFFECT: true,  // Effet sur players audio
  ENABLE_IMAGE_ZOOM: true,    // Effet zoom sur images
};

// Utilisation
if (CONFIG.ENABLE_RIPPLE) {
  document.addEventListener('click', createRipple);
}
```

---

## 🎨 PERSONNALISATION AVANCÉE

### 1. Créer des États Personnalisés

#### Exemple : Survol de Produits

```css
/* CSS */
.custom-cursor.hover-product {
  width: calc(var(--cursor-size) * 2.5);
  height: calc(var(--cursor-size) * 2.5);
  background: linear-gradient(45deg, gold, orange);
  box-shadow: 0 0 40px gold;
  animation: productPulse 1s ease-in-out infinite;
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
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

@keyframes productPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}
```

```javascript
// JavaScript
const products = document.querySelectorAll('.product-card');

products.forEach(product => {
  product.addEventListener('mouseenter', () => {
    cursor.classList.add('hover-product');
    follower.style.width = '100px';
    follower.style.height = '100px';
    follower.style.opacity = '0.6';
  });
  
  product.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover-product');
    follower.style.width = '40px';
    follower.style.height = '40px';
    follower.style.opacity = '0.3';
  });
});
```

---

#### Exemple : Survol de Prix

```css
.custom-cursor.hover-price {
  width: calc(var(--cursor-size) * 1.8);
  height: calc(var(--cursor-size) * 1.8);
  background: linear-gradient(135deg, #FFD700, #FFA500);
  box-shadow: 0 0 35px #FFD700;
  animation: priceGlow 2s ease-in-out infinite;
}

.custom-cursor.hover-price::after {
  content: '€';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
  color: white;
}

@keyframes priceGlow {
  0%, 100% {
    box-shadow: 0 0 35px #FFD700;
  }
  50% {
    box-shadow: 0 0 50px #FFD700, 0 0 70px #FFD700;
  }
}
```

```javascript
const prices = document.querySelectorAll('.price, .product-price');

prices.forEach(price => {
  price.addEventListener('mouseenter', () => {
    cursor.classList.add('hover-price');
  });
  
  price.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover-price');
  });
});
```

---

#### Exemple : Survol de Badge "Nouveau"

```css
.custom-cursor.hover-badge-new {
  width: calc(var(--cursor-size) * 1.5);
  height: calc(var(--cursor-size) * 1.5);
  background: linear-gradient(45deg, #FF1744, #FF6B9D);
  box-shadow: 0 0 30px #FF1744;
  animation: badgeNewPulse 1.5s ease-in-out infinite;
}

.custom-cursor.hover-badge-new::after {
  content: 'NEW';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8px;
  font-weight: bold;
  color: white;
}

@keyframes badgeNewPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
  }
}
```

```javascript
const badges = document.querySelectorAll('.badge-new, .new-badge');

badges.forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    cursor.classList.add('hover-badge-new');
  });
  
  badge.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover-badge-new');
  });
});
```

---

### 2. Effets de Particules

#### Particules de Traînée

```javascript
// Configuration
const PARTICLE_CONFIG = {
  enabled: true,
  count: 5,
  opacity: 0.4,
  size: 8,
  color: '#00D9FF',
  fadeSpeed: 0.05
};

// Créer particules
const particles = [];
const maxParticles = PARTICLE_CONFIG.count;

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'cursor-particle';
  particle.style.cssText = `
    position: fixed;
    width: ${PARTICLE_CONFIG.size}px;
    height: ${PARTICLE_CONFIG.size}px;
    border-radius: 50%;
    background: ${PARTICLE_CONFIG.color};
    pointer-events: none;
    z-index: 9996;
    opacity: ${PARTICLE_CONFIG.opacity};
    left: ${x}px;
    top: ${y}px;
    transform: translate(-50%, -50%);
  `;
  
  document.body.appendChild(particle);
  particles.push(particle);
  
  // Limiter le nombre de particules
  if (particles.length > maxParticles) {
    const oldParticle = particles.shift();
    oldParticle.remove();
  }
  
  // Animation fade out
  let opacity = PARTICLE_CONFIG.opacity;
  const fadeInterval = setInterval(() => {
    opacity -= PARTICLE_CONFIG.fadeSpeed;
    particle.style.opacity = opacity;
    
    if (opacity <= 0) {
      clearInterval(fadeInterval);
      particle.remove();
      const index = particles.indexOf(particle);
      if (index > -1) {
        particles.splice(index, 1);
      }
    }
  }, 16);
}

// Créer particules au mouvement de la souris
let lastParticleTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastParticleTime > 50) { // Créer une particule toutes les 50ms
    createParticle(e.clientX, e.clientY);
    lastParticleTime = now;
  }
});
```

---

#### Particules d'Explosion au Clic

```javascript
function createExplosion(x, y) {
  const particleCount = 10;
  const colors = ['#FF6B35', '#00D9FF', '#004E89', '#FFD700'];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = 5 + Math.random() * 5;
    
    particle.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${color};
      pointer-events: none;
      z-index: 9996;
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(particle);
    
    // Animation
    let posX = x;
    let posY = y;
    let opacity = 1;
    let scale = 1;
    
    const animate = () => {
      posX += Math.cos(angle) * velocity;
      posY += Math.sin(angle) * velocity;
      opacity -= 0.02;
      scale += 0.05;
      
      particle.style.left = posX + 'px';
      particle.style.top = posY + 'px';
      particle.style.opacity = opacity;
      particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };
    
    animate();
  }
}

// Appliquer au clic
document.addEventListener('click', (e) => {
  createExplosion(e.clientX, e.clientY);
});
```

---

### 3. Effets Sonores

```javascript
// Charger les sons
const hoverSound = new Audio('/sounds/cursor-hover.mp3');
const clickSound = new Audio('/sounds/cursor-click.mp3');
const linkSound = new Audio('/sounds/cursor-link.mp3');

// Volume
hoverSound.volume = 0.3;
clickSound.volume = 0.5;
linkSound.volume = 0.3;

// Hover sur boutons
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(e => console.log('Audio error:', e));
  });
});

// Hover sur liens
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    linkSound.currentTime = 0;
    linkSound.play().catch(e => console.log('Audio error:', e));
  });
});

// Clic
document.addEventListener('click', () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(e => console.log('Audio error:', e));
});
```

---

### 4. Curseur Réactif au Scroll

```javascript
let scrollVelocity = 0;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  scrollVelocity = Math.abs(currentScrollY - lastScrollY);
  lastScrollY = currentScrollY;
  
  // Adapter le curseur selon la vitesse de scroll
  if (scrollVelocity > 50) {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
    cursor.style.opacity = '1';
  } else {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.opacity = '0.9';
  }
});
```

---

### 5. Curseur Réactif au Temps

```javascript
// Changer les couleurs selon l'heure
function updateCursorByTime() {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) {
    // Matin - couleurs chaudes
    updateCursorColors('#FFB347', '#FF8C00', '#FFD700');
  } else if (hour >= 12 && hour < 18) {
    // Après-midi - couleurs vives
    updateCursorColors('#FF6B35', '#00D9FF', '#FFD700');
  } else if (hour >= 18 && hour < 22) {
    // Soirée - couleurs sombres
    updateCursorColors('#4A4A4A', '#1A1A1A', '#FF6B35');
  } else {
    // Nuit - couleurs bleues
    updateCursorColors('#004E89', '#1A1A1A', '#00D9FF');
  }
}

// Mettre à jour toutes les heures
updateCursorByTime();
setInterval(updateCursorByTime, 60 * 60 * 1000);
```

---

## 🎭 THÈMES PRÉDÉFINIS

### Thème 1 : Musical (Défaut)

```css
:root {
  --cursor-primary: #FF6B35;
  --cursor-secondary: #004E89;
  --cursor-accent: #00D9FF;
  --cursor-dark: #1A1A1A;
  --cursor-light: #FFFFFF;
}
```

### Thème 2 : Minimaliste

```css
:root {
  --cursor-primary: #000000;
  --cursor-secondary: #FFFFFF;
  --cursor-accent: #888888;
  --cursor-dark: #000000;
  --cursor-light: #FFFFFF;
}

.custom-cursor {
  box-shadow: none;
}

.cursor-follower {
  border: 1px solid var(--cursor-accent);
}
```

### Thème 3 : Neon

```css
:root {
  --cursor-primary: #00FF00;
  --cursor-secondary: #FF00FF;
  --cursor-accent: #00FFFF;
  --cursor-dark: #000000;
  --cursor-light: #FFFFFF;
}

.custom-cursor {
  box-shadow: 0 0 30px var(--cursor-primary),
              0 0 60px var(--cursor-primary),
              0 0 90px var(--cursor-primary);
}
```

### Thème 4 : Pastel

```css
:root {
  --cursor-primary: #FFB6C1;
  --cursor-secondary: #B0E0E6;
  --cursor-accent: #DDA0DD;
  --cursor-dark: #696969;
  --cursor-light: #FFFFFF;
}

.custom-cursor {
  opacity: 0.8;
}
```

### Thème 5 : Dark Mode

```css
:root {
  --cursor-primary: #00D9FF;
  --cursor-secondary: #1A1A1A;
  --cursor-accent: #FF6B35;
  --cursor-dark: #000000;
  --cursor-light: #FFFFFF;
}

.custom-cursor {
  background: radial-gradient(circle, var(--cursor-primary) 0%, var(--cursor-secondary) 100%);
  box-shadow: 0 0 20px var(--cursor-primary),
              0 0 40px var(--cursor-primary);
}
```

---

## 🔌 INTÉGRATIONS SPÉCIALES

### 1. Intégration avec GSAP

```javascript
import { gsap } from 'gsap';

// Animation fluide du curseur
function animateCursor(x, y) {
  gsap.to('.custom-cursor', {
    x: x,
    y: y,
    duration: 0.3,
    ease: 'power2.out'
  });
  
  gsap.to('.cursor-follower', {
    x: x,
    y: y,
    duration: 0.6,
    ease: 'power2.out'
  });
}

document.addEventListener('mousemove', (e) => {
  animateCursor(e.clientX, e.clientY);
});
```

---

### 2. Intégration avec Three.js

```javascript
import * as THREE from 'three';

// Créer une scène 3D pour le curseur
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(100, 100);
document.querySelector('.custom-cursor').appendChild(renderer.domElement);

// Créer un cube 3D
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xFF6B35 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animer
function animate() {
  requestAnimationFrame(animate);
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

animate();
```

---

### 3. Intégration avec Lottie

```javascript
import lottie from 'lottie-web';

// Animation Lottie pour le curseur
const animation = lottie.loadAnimation({
  container: document.querySelector('.custom-cursor'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/animations/cursor-animation.json'
});
```

---

## ⚡ OPTIMISATIONS PERFORMANCE

### 1. Désactiver sur Certaines Pages

```javascript
// Désactiver sur la page de checkout
if (window.location.pathname.includes('/checkout')) {
  document.body.classList.add('no-custom-cursor');
  return;
}

// CSS
.no-custom-cursor * {
  cursor: auto !important;
}

.no-custom-cursor .custom-cursor,
.no-custom-cursor .cursor-follower {
  display: none !important;
}
```

---

### 2. Lazy Load du Curseur

```javascript
// Charger le curseur seulement après le chargement de la page
window.addEventListener('load', () => {
  setTimeout(() => {
    const script = document.createElement('script');
    script.src = '/js/custom-cursor.js';
    document.body.appendChild(script);
  }, 1000);
});
```

---

### 3. Throttle/Debounce

```javascript
// Throttle pour les événements fréquents
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Appliquer au mousemove
document.addEventListener('mousemove', throttle((e) => {
  // Logique du curseur
}, 16)); // ~60 FPS
```

---

### 4. Utiliser CSS Containment

```css
.custom-cursor,
.cursor-follower {
  contain: layout style paint;
}
```

---

### 5. GPU Acceleration

```css
.custom-cursor,
.cursor-follower {
  will-change: transform;
  transform: translateZ(0);
}
```

---

## 📚 RESSOURCES

### Documentation

- [MDN - CSS Custom Properties](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN - requestAnimationFrame](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame)
- [GSAP Documentation](https://greensock.com/docs/)
- [Three.js Documentation](https://threejs.org/docs/)

### Inspiration

- [CodePen - Custom Cursors](https://codepen.io/search/pens?q=custom+cursor)
- [Awwwards - Interactive Cursors](https://www.awwwards.com/websites/cursor/)

---

## 🎯 CONCLUSION

Ce guide vous permet de personnaliser complètement le curseur selon vos besoins. N'hésitez pas à expérimenter et à créer votre propre style unique !

---

**Guide créé avec ❤️ pour Ghost Remix Pack**  
**Dernière mise à jour : Janvier 2025**

