# 🔍 DNS Checker Pro - Ghost Remix Pack

Outil de diagnostic DNS complet pour vérifier la configuration de votre domaine et de vos emails.

## 🚀 Fonctionnalités

### ✅ Vérifications DNS Basiques
- Enregistrements A (IPv4)
- Enregistrements AAAA (IPv6)
- Nameservers (NS)
- Enregistrements CNAME
- Détection automatique du fournisseur DNS

### 📧 Configuration Email Complète
- **Enregistrements MX** avec priorités
- **SPF** (Sender Policy Framework)
- **DKIM** (DomainKeys Identified Mail)
- **DMARC** (Domain-based Message Authentication)
- Détection automatique du fournisseur email

### 🔒 Sécurité
- Enregistrements CAA (Certificate Authority Authorization)
- Vérification DNSSEC
- Analyse des politiques de sécurité

### 🔍 Intégrations Spécialisées
- **Google Workspace** : Vérification du domaine et configuration MX
- **OVH** : Détection et validation de la configuration
- **SendGrid** : Vérification de l'intégration

## 📋 Installation et Utilisation

### Option 1 : Script en ligne de commande

```bash
# Aller dans le dossier
cd dns-checker

# Vérifier ghostremixpack.com (par défaut)
node checker.js

# Vérifier un autre domaine
node checker.js mondomaine.com

# Ou utiliser npm
npm run check
npm run check-domain mondomaine.com
```

### Option 2 : Interface web

```bash
# Démarrer le serveur web
npm start

# Ou manuellement
python3 -m http.server 8080

# Ouvrir dans le navigateur
open http://localhost:8080
```

## 📊 Exemple de Rapport

```
🔍 VÉRIFICATION DNS COMPLÈTE - GHOSTREMIXPACK.COM

⏰ 17/10/2025 15:30:45

📋 Vérification DNS basique...
✅ Enregistrements A: 185.199.108.153, 185.199.109.153
✅ Nameservers: dns19.ovh.net, ns19.ovh.net
🏢 Fournisseur DNS: OVH

📧 Vérification configuration email...
✅ Enregistrements MX:
   Priorité 1: mx1.ovh.net
   Priorité 5: mx2.ovh.net
📮 Fournisseur email: OVH Mail
✅ SPF: v=spf1 include:mx.ovh.com ~all
❌ Enregistrement DKIM manquant
❌ Enregistrement DMARC manquant

🔍 Vérification Google Workspace...
❌ Enregistrement de vérification Google manquant

═══════════════════════════════════════════════════════════════════════════════
📊 RAPPORT DE VÉRIFICATION DNS
═══════════════════════════════════════════════════════════════════════════════

🟡 SCORE GLOBAL: 65/100
⚠️ Configuration DNS correcte avec améliorations possibles

📋 DÉTAIL PAR SECTION:
✅ BASIC: 20/20 (100%)
⚠️ EMAIL: 17/30 (57%)
⚠️ SECURITY: 10/25 (40%)
❌ GOOGLE: 0/15 (0%)

🏢 FOURNISSEURS DÉTECTÉS:
DNS: OVH
Email: OVH Mail

🎯 RECOMMANDATIONS:

1. 🟡 Configurer DMARC
   Renforcer la sécurité des emails
   💡 Action: Ajouter enregistrement TXT sur _dmarc: v=DMARC1; p=quarantine

2. 🟡 Configurer DKIM
   Activer la signature DKIM pour l'authentification
   💡 Action: Configurer DKIM dans votre fournisseur email (OVH)
```

## 🛠️ Commandes CLI Utiles

### Vérifications manuelles rapides

```bash
# Vérifier les enregistrements MX
dig MX ghostremixpack.com +short

# Vérifier le SPF
dig TXT ghostremixpack.com +short | grep spf

# Vérifier DMARC
dig TXT _dmarc.ghostremixpack.com +short

# Vérifier la vérification Google
dig TXT ghostremixpack.com +short | grep google-site-verification

# Vérifier les nameservers
dig NS ghostremixpack.com +short

# Test de propagation DNS
nslookup ghostremixpack.com 8.8.8.8
```

### Outils en ligne recommandés

- **MXToolbox** : https://mxtoolbox.com/SuperTool.aspx
- **DNS Checker** : https://dnschecker.org
- **Google Admin Toolbox** : https://toolbox.googleapps.com/apps/checkmx/
- **WhatsMyDNS** : https://whatsmydns.net/

## 🔧 Configuration DNS Recommandée

### Pour Google Workspace

```dns
# Enregistrement de vérification (remplacer XXXXX par votre code)
TXT @ google-site-verification=XXXXX

# Enregistrements MX Google
MX @ 1 aspmx.l.google.com.
MX @ 5 alt1.aspmx.l.google.com.
MX @ 5 alt2.aspmx.l.google.com.
MX @ 10 alt3.aspmx.l.google.com.
MX @ 10 alt4.aspmx.l.google.com.

# SPF incluant Google
TXT @ "v=spf1 include:_spf.google.com ~all"

# DMARC recommandé
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@ghostremixpack.com"
```

### Pour OVH Email

```dns
# Enregistrements MX OVH
MX @ 1 mx1.ovh.net.
MX @ 5 mx2.ovh.net.
MX @ 100 mx3.ovh.net.

# SPF pour OVH
TXT @ "v=spf1 include:mx.ovh.com ~all"

# DMARC recommandé
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@ghostremixpack.com"

# DKIM (à configurer dans l'interface OVH)
# Le sélecteur et la clé seront fournis par OVH
```

### Configuration Mixte (OVH + SendGrid)

```dns
# MX pour OVH
MX @ 1 mx1.ovh.net.
MX @ 5 mx2.ovh.net.

# SPF incluant OVH et SendGrid
TXT @ "v=spf1 include:mx.ovh.com include:sendgrid.net ~all"

# DMARC
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@ghostremixpack.com"
```

## 📈 Système de Score

### Score Global (/100)
- **DNS Basique** : 20 points
- **Configuration Email** : 30 points
- **Sécurité** : 25 points
- **Google Workspace** : 15 points
- **OVH** : 10 points

### Interprétation
- **80-100** : 🟢 Configuration excellente
- **60-79** : 🟡 Configuration correcte, améliorations possibles
- **0-59** : 🔴 Configuration nécessite des corrections importantes

## 🚨 Problèmes Courants et Solutions

### ❌ "Aucun enregistrement MX trouvé"
**Cause** : Pas de serveur email configuré
**Solution** : Configurer les enregistrements MX selon votre fournisseur

### ❌ "Enregistrement SPF manquant"
**Cause** : Pas de politique SPF
**Solution** : Ajouter un enregistrement TXT SPF

### ❌ "Enregistrement de vérification Google manquant"
**Cause** : Domaine non vérifié dans Google Workspace
**Solution** : Ajouter l'enregistrement TXT fourni par Google

### ⚠️ "DNSSEC non activé"
**Cause** : Sécurité DNS non renforcée
**Solution** : Activer DNSSEC chez votre registraire

## 🔄 Mise à Jour et Maintenance

### Vérification régulière recommandée
- **Hebdomadaire** : Vérification automatique
- **Mensuelle** : Analyse complète avec rapport
- **Après modifications** : Vérification immédiate

### Surveillance des changements
- Propagation DNS (24-48h)
- Expiration des enregistrements
- Mises à jour des fournisseurs

## 📞 Support

### En cas de problème
1. Vérifier la propagation DNS (24-48h après modification)
2. Tester avec plusieurs serveurs DNS
3. Consulter les logs de votre fournisseur
4. Utiliser les outils en ligne pour confirmation

### Ressources utiles
- Documentation OVH DNS
- Google Workspace Admin Help
- RFC standards (SPF: 7208, DMARC: 7489)

## 🎯 Roadmap

### Fonctionnalités à venir
- [ ] Export PDF des rapports
- [ ] Historique des vérifications
- [ ] Alertes automatiques
- [ ] API REST
- [ ] Intégration Slack/Discord
- [ ] Tests de délivrabilité email

---

**DNS Checker Pro** - Créé pour Ghost Remix Pack  
Version 1.0.0 - Octobre 2025
