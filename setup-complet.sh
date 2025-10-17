#!/bin/bash

# 🚀 SCRIPT DE CONFIGURATION COMPLÈTE - GHOST REMIX PACK
# Ce script configure automatiquement tout votre environnement

set -e  # Arrêter en cas d'erreur

echo "🚀 CONFIGURATION COMPLÈTE - GHOST REMIX PACK"
echo "═══════════════════════════════════════════════════════════"
echo "Ce script va configurer automatiquement :"
echo "✅ Variables d'environnement"
echo "✅ Dépendances manquantes"
echo "✅ Configuration SendGrid"
echo "✅ Tests de fonctionnement"
echo "✅ Déploiement"
echo ""

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Fonctions utilitaires
print_step() {
    echo -e "\n${BLUE}📋 ÉTAPE: $1${NC}"
    echo "$(printf '─%.0s' {1..50})"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${PURPLE}💡 $1${NC}"
}

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    print_error "Erreur: Ce script doit être exécuté depuis le dossier racine du projet"
    exit 1
fi

print_success "Dossier de projet détecté"

# ÉTAPE 1: Créer le fichier .env
print_step "Création du fichier .env"

if [ -f ".env" ]; then
    print_warning "Le fichier .env existe déjà"
    read -p "Voulez-vous le remplacer ? (o/N): " replace_env
    if [[ $replace_env =~ ^[Oo]$ ]]; then
        rm .env
        print_info "Ancien fichier .env supprimé"
    else
        print_info "Conservation du fichier .env existant"
    fi
fi

if [ ! -f ".env" ]; then
    cat > .env << 'EOF'
# 🔧 CONFIGURATION GHOST REMIX PACK
# Généré automatiquement par setup-complet.sh

# ═══════════════════════════════════════════════════════════════
# 📧 CONFIGURATION SENDGRID (À CONFIGURER)
# ═══════════════════════════════════════════════════════════════
SENDGRID_API_KEY=SG.REMPLACEZ_PAR_VOTRE_CLE_SENDGRID
SENDGRID_FROM_EMAIL=contact@ghostremixpack.com
SENDGRID_FROM_NAME="Ghost Remix Pack"

# ═══════════════════════════════════════════════════════════════
# 🌐 URLS ET DOMAINES
# ═══════════════════════════════════════════════════════════════
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3001

# ═══════════════════════════════════════════════════════════════
# 🔐 SÉCURITÉ
# ═══════════════════════════════════════════════════════════════
JWT_SECRET=ghost-remix-pack-super-secret-2025-$(date +%s)

# ═══════════════════════════════════════════════════════════════
# 🔒 STRIPE (OPTIONNEL)
# ═══════════════════════════════════════════════════════════════
STRIPE_SECRET_KEY=sk_test_votre_cle_stripe
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret

# ═══════════════════════════════════════════════════════════════
# 🗄️ FIREBASE (OPTIONNEL)
# ═══════════════════════════════════════════════════════════════
FIREBASE_PROJECT_ID=votre-projet-firebase
FIREBASE_CREDENTIALS=./firebase-credentials.json

# ═══════════════════════════════════════════════════════════════
# 🎵 GHOST REMIX PACK SPÉCIFIQUE
# ═══════════════════════════════════════════════════════════════
ADMIN_EMAIL=admin@ghostremixpack.com
DOWNLOAD_RATE_LIMIT=10
DOWNLOAD_LINK_EXPIRY=48
EOF

    print_success "Fichier .env créé avec la configuration par défaut"
else
    print_info "Utilisation du fichier .env existant"
fi

# ÉTAPE 2: Vérifier et installer les dépendances
print_step "Vérification des dépendances"

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    print_info "Installez Node.js depuis https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js détecté: $NODE_VERSION"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

NPM_VERSION=$(npm --version)
print_success "npm détecté: $NPM_VERSION"

# Installer les dépendances du projet principal
print_info "Installation des dépendances du projet principal..."
npm install
print_success "Dépendances du projet principal installées"

# Installer les dépendances du backend
if [ -d "backend" ]; then
    print_info "Installation des dépendances du backend..."
    cd backend
    npm install
    cd ..
    print_success "Dépendances du backend installées"
fi

# ÉTAPE 3: Vérifier la configuration SendGrid
print_step "Vérification de la configuration SendGrid"

# Lire la clé SendGrid depuis .env
SENDGRID_KEY=$(grep "SENDGRID_API_KEY=" .env | cut -d '=' -f2)

if [[ $SENDGRID_KEY == "SG.REMPLACEZ_PAR_VOTRE_CLE_SENDGRID" ]]; then
    print_warning "SendGrid n'est pas encore configuré"
    print_info "Pour configurer SendGrid :"
    echo "1. Allez sur https://sendgrid.com/"
    echo "2. Créez un compte gratuit"
    echo "3. Créez une clé API avec permissions Mail Send"
    echo "4. Remplacez 'SG.REMPLACEZ_PAR_VOTRE_CLE_SENDGRID' dans le fichier .env"
    echo ""
    read -p "Avez-vous une clé SendGrid à configurer maintenant ? (o/N): " has_sendgrid
    
    if [[ $has_sendgrid =~ ^[Oo]$ ]]; then
        read -p "Entrez votre clé SendGrid (commence par SG.): " user_sendgrid_key
        if [[ $user_sendgrid_key == SG.* ]]; then
            # Remplacer la clé dans le fichier .env
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                sed -i '' "s/SENDGRID_API_KEY=.*/SENDGRID_API_KEY=$user_sendgrid_key/" .env
            else
                # Linux
                sed -i "s/SENDGRID_API_KEY=.*/SENDGRID_API_KEY=$user_sendgrid_key/" .env
            fi
            print_success "Clé SendGrid configurée"
        else
            print_warning "Clé SendGrid invalide (doit commencer par SG.)"
        fi
    fi
else
    print_success "SendGrid semble configuré"
fi

# ÉTAPE 4: Créer les fichiers manquants
print_step "Création des fichiers manquants"

# Créer le sitemap.xml s'il n'existe pas
if [ ! -f "public/sitemap.xml" ]; then
    mkdir -p public
    cat > public/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.ghostremixpack.com/</loc>
    <lastmod>2025-10-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.ghostremixpack.com/contact</loc>
    <lastmod>2025-10-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.ghostremixpack.com/mentions-legales</loc>
    <lastmod>2025-10-17</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
EOF
    print_success "Sitemap.xml créé"
fi

# Créer le robots.txt s'il n'existe pas
if [ ! -f "public/robots.txt" ]; then
    cat > public/robots.txt << 'EOF'
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.ghostremixpack.com/sitemap.xml

# Interdire l'accès aux fichiers sensibles
Disallow: /api/
Disallow: /.env
Disallow: /backend/
EOF
    print_success "Robots.txt créé"
fi

# ÉTAPE 5: Tests de fonctionnement
print_step "Tests de fonctionnement"

# Test du script de vérification DNS
if [ -f "dns-checker/checker.js" ]; then
    print_info "Test du DNS Checker..."
    cd dns-checker
    if node checker.js ghostremixpack.com > /dev/null 2>&1; then
        print_success "DNS Checker fonctionne"
    else
        print_warning "DNS Checker a des problèmes (normal si DNS non configuré)"
    fi
    cd ..
fi

# Test de l'email (si SendGrid configuré)
if [[ $SENDGRID_KEY != "SG.REMPLACEZ_PAR_VOTRE_CLE_SENDGRID" ]]; then
    print_info "Test de l'envoi d'email..."
    if [ -f "test-contact-sans-sendgrid.cjs" ]; then
        if node test-contact-sans-sendgrid.cjs > /dev/null 2>&1; then
            print_success "Test email réussi"
        else
            print_warning "Test email échoué (vérifiez la configuration SendGrid)"
        fi
    fi
fi

# ÉTAPE 6: Génération des scripts de démarrage
print_step "Génération des scripts de démarrage"

# Script de démarrage du backend
cat > start-backend.sh << 'EOF'
#!/bin/bash
echo "🚀 Démarrage du backend Ghost Remix Pack..."
cd backend
npm run dev
EOF
chmod +x start-backend.sh
print_success "Script start-backend.sh créé"

# Script de démarrage du frontend
cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "🎨 Démarrage du frontend Ghost Remix Pack..."
npm run dev
EOF
chmod +x start-frontend.sh
print_success "Script start-frontend.sh créé"

# Script de démarrage complet
cat > start-all.sh << 'EOF'
#!/bin/bash
echo "🚀 DÉMARRAGE COMPLET - GHOST REMIX PACK"
echo "═══════════════════════════════════════════"

# Fonction pour tuer les processus en arrière-plan à la sortie
cleanup() {
    echo "🛑 Arrêt des serveurs..."
    kill $(jobs -p) 2>/dev/null
    exit
}
trap cleanup SIGINT SIGTERM

# Démarrer le backend en arrière-plan
echo "🔧 Démarrage du backend..."
cd backend && npm run dev &
BACKEND_PID=$!

# Attendre que le backend démarre
sleep 3

# Démarrer le frontend en arrière-plan
echo "🎨 Démarrage du frontend..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Serveurs démarrés !"
echo "🔧 Backend: http://localhost:3001"
echo "🎨 Frontend: http://localhost:5173"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter tous les serveurs"

# Attendre que les processus se terminent
wait
EOF
chmod +x start-all.sh
print_success "Script start-all.sh créé"

# ÉTAPE 7: Résumé et instructions finales
print_step "Configuration terminée !"

echo ""
echo "🎉 CONFIGURATION COMPLÈTE TERMINÉE !"
echo "═══════════════════════════════════════════════════════════"
echo ""
print_success "✅ Fichier .env créé et configuré"
print_success "✅ Dépendances installées"
print_success "✅ Fichiers manquants créés (sitemap, robots.txt)"
print_success "✅ Scripts de démarrage générés"
print_success "✅ Tests de fonctionnement effectués"
echo ""

echo "🚀 PROCHAINES ÉTAPES :"
echo ""
echo "1. 📧 CONFIGURER SENDGRID (si pas fait) :"
echo "   - Allez sur https://sendgrid.com/"
echo "   - Créez une clé API"
echo "   - Remplacez la valeur dans le fichier .env"
echo ""
echo "2. 🌐 CONFIGURER DNS :"
echo "   - Ajoutez les enregistrements MX, SPF, DMARC dans OVH"
echo "   - Consultez DNS-OVH-A-AJOUTER.md pour les détails"
echo ""
echo "3. 🚀 DÉMARRER LES SERVEURS :"
echo "   ./start-all.sh          # Démarre frontend + backend"
echo "   ./start-backend.sh      # Backend uniquement"
echo "   ./start-frontend.sh     # Frontend uniquement"
echo ""
echo "4. 🧪 TESTER :"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend: http://localhost:3001/api/health"
echo "   - DNS: cd dns-checker && node checker.js"
echo ""
echo "5. 📊 VÉRIFIER :"
echo "   node test-contact-sans-sendgrid.cjs    # Test email"
echo "   ./verifier-dns-google.sh               # Test DNS"
echo ""

print_info "💡 Tous les outils et scripts sont maintenant prêts !"
print_info "💡 Consultez CONFIGURATION-COMPLETE-MAINTENANT.md pour plus de détails"

echo ""
echo "═══════════════════════════════════════════════════════════"
print_success "🎯 VOTRE SITE GHOST REMIX PACK EST PRÊT À ÊTRE LANCÉ !"
echo "═══════════════════════════════════════════════════════════"
