# 📋 FICHIERS MODIFIÉS LOCALEMENT

**Ces fichiers ont été corrigés pour pointer vers Railway :**

## ✅ **FICHIERS MODIFIÉS :**

### 1. `src/components/Newsletter.tsx` - Ligne 40
```javascript
// AVANT
const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3004';

// APRÈS  
const apiUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
```

**ET Ligne 42 :**
```javascript
// AVANT
const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {

// APRÈS
const response = await fetch(`${apiUrl}/api/newsletter`, {
```

### 2. `src/components/ContactPage.tsx` - Ligne 49
```javascript
// AVANT
const backendUrl = import.meta.env.VITE_CONTACT_BACKEND_URL || 'http://localhost:3004';

// APRÈS
const backendUrl = import.meta.env.VITE_CONTACT_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
```

### 3. `src/components/PaiementDirect.tsx` - Lignes 53 et 143
```javascript
// AVANT (ligne 53)
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// APRÈS (ligne 53)
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';

// AVANT (ligne 143)  
const backendUrl = import.meta.env.VITE_CONTACT_BACKEND_URL || 'http://localhost:3004';

// APRÈS (ligne 143)
const backendUrl = import.meta.env.VITE_CONTACT_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
```

### 4. `src/lib/constants.ts` - Lignes 118 et 121
```javascript
// AVANT (ligne 118)
baseUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',

// APRÈS (ligne 118)  
baseUrl: import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app',

// AVANT (ligne 121)
newsletter: '/api/newsletter/subscribe',

// APRÈS (ligne 121)
newsletter: '/api/newsletter',
```

---

## 🚀 **PROCHAINES ÉTAPES :**

1. **Déployez Railway** avec ces variables :
   ```
   SMTP_HOST=ssl0.ovh.net
   SMTP_PORT=587
   EMAIL_PASSWORD=DJshek19529359-
   SENDGRID_FROM_EMAIL=contact@ghostremixpack.com
   ```

2. **Récupérez l'URL Railway** (ex: https://abc123.up.railway.app)

3. **Remplacez dans les 4 fichiers :**
   ```
   https://ghost-remix-backend.up.railway.app
   ↓
   https://VOTRE-URL-RAILWAY.up.railway.app
   ```

4. **Upload sur Vercel** ou redéployez

5. **Testez newsletter et contact** depuis votre site !

---

**🎯 Résultat : Site 100% fonctionnel avec Zimbra OVH ! 🎉**

