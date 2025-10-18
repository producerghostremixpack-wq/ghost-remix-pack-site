# 🚀 Ghost Remix Pack - Backend API Example

Exemple complet d'API backend Node.js suivant toutes les règles Cursor professionnelles.

## 📋 Caractéristiques

✅ **Architecture MVC** - Séparation claire des responsabilités  
✅ **Async/Await** - Code moderne et lisible  
✅ **Gestion d'erreurs centralisée** - Middleware global  
✅ **Validation systématique** - Express-validator  
✅ **Sécurité** - Helmet, CORS, Rate Limiting, JWT  
✅ **Performance** - Compression, pagination  
✅ **Tests** - Jest + Supertest  
✅ **Documentation** - JSDoc complet  

---

## 🚀 Installation

### 1. Installer les dépendances

```bash
cd backend-example
npm install
```

### 2. Configuration

Copier le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

Puis modifier les variables d'environnement dans `.env` :

```bash
NODE_ENV=development
PORT=3001
JWT_SECRET=votre-secret-jwt-tres-long-et-securise
# ... autres variables
```

### 3. Démarrer le serveur

**Mode développement (avec nodemon) :**
```bash
npm run dev
```

**Mode production :**
```bash
npm start
```

Le serveur sera accessible sur `http://localhost:3001`

---

## 📚 API Endpoints

### Health Check

```http
GET /api/health
```

**Réponse :**
```json
{
  "success": true,
  "message": "API Ghost Remix Pack opérationnelle",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development",
  "version": "1.0.0"
}
```

---

### Authentification

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@ghostremixpack.com",
  "password": "Admin123!"
}
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "email": "admin@ghostremixpack.com",
      "nom": "Admin",
      "prenom": "Ghost",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Connexion réussie"
}
```

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "nouveau@example.com",
  "password": "Password123!",
  "nom": "Dupont",
  "prenom": "Jean"
}
```

#### Get Me

```http
GET /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### Utilisateurs

#### Liste des utilisateurs (Admin)

```http
GET /api/users?page=1&limit=20
Authorization: Bearer YOUR_JWT_TOKEN
```

**Réponse :**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "email": "admin@ghostremixpack.com",
      "nom": "Admin",
      "prenom": "Ghost",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  },
  "message": "Utilisateurs récupérés avec succès"
}
```

#### Créer un utilisateur

```http
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "nom": "Martin",
  "prenom": "Pierre",
  "role": "user"
}
```

#### Récupérer un utilisateur

```http
GET /api/users/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Mettre à jour un utilisateur

```http
PUT /api/users/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "nom": "Nouveau Nom",
  "prenom": "Nouveau Prénom"
}
```

#### Supprimer un utilisateur (Admin)

```http
DELETE /api/users/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### Contact

#### Envoyer un message

```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "subject": "Question sur le Pack Complet",
  "message": "Bonjour, j'aimerais en savoir plus..."
}
```

**Réponse :**
```json
{
  "success": true,
  "message": "Message envoyé avec succès",
  "data": {
    "email": "jean@example.com",
    "subject": "Question sur le Pack Complet",
    "sentAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 🔐 Sécurité

### JWT Authentication

Pour accéder aux routes protégées, inclure le token JWT dans le header :

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Rate Limiting

- **Limite** : 100 requêtes par 15 minutes par IP
- **Message d'erreur** : "Trop de requêtes depuis cette IP"

### CORS

Seuls les domaines autorisés dans `ALLOWED_ORIGINS` peuvent accéder à l'API.

---

## 🧪 Tests

### Lancer les tests

```bash
npm test
```

### Tests avec couverture

```bash
npm test -- --coverage
```

---

## 📁 Structure du Projet

```
backend-example/
├── config/              # Configuration
├── controllers/         # Controllers (logique des routes)
│   ├── auth-controller.js
│   ├── contact-controller.js
│   └── user-controller.js
├── middlewares/         # Middlewares Express
│   ├── auth-middleware.js
│   ├── error-handler.js
│   └── not-found-handler.js
├── routes/              # Définition des routes
│   ├── auth-routes.js
│   ├── contact-routes.js
│   └── user-routes.js
├── services/            # Logique métier
│   └── user-service.js
├── validators/          # Validation des données
│   └── user-validator.js
├── .env.example         # Exemple de configuration
├── package.json         # Dépendances
├── server.js            # Point d'entrée
└── README.md            # Documentation
```

---

## 🎯 Règles Cursor Appliquées

✅ **Async/Await TOUJOURS** - Pas de callbacks  
✅ **Gestion d'erreurs centralisée** - Middleware global  
✅ **Validation systématique** - Express-validator  
✅ **Séparation Controllers/Services** - Logique métier séparée  
✅ **Configuration environnement** - Variables .env  
✅ **Sécurité** - Helmet, CORS, Rate Limiting, JWT  
✅ **Performance** - Compression, pagination  
✅ **Documentation JSDoc** - Commentaires complets  
✅ **Tests** - Jest + Supertest  
✅ **Réponses API standardisées** - Format cohérent  

---

## 🚀 Déploiement

### Railway

1. Connecter votre repo GitHub
2. Ajouter les variables d'environnement
3. Déployer !

### Variables d'environnement requises

```bash
NODE_ENV=production
PORT=3001
JWT_SECRET=your-secret
ALLOWED_ORIGINS=https://www.ghostremixpack.com
# ... autres variables
```

---

## 📝 License

MIT

---

## 👤 Auteur

Ghost Remix Pack

---

**Ce backend est un exemple complet suivant toutes les règles Cursor professionnelles ! 🎉**
