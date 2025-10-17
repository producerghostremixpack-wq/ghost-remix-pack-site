# 🌐 ENREGISTREMENTS DNS À AJOUTER DANS OVH

**Domaine :** ghostremixpack.com  
**Date :** 15 Janvier 2025  
**Statut :** À ajouter

---

## 📋 ENREGISTREMENTS À AJOUTER

### 1. Google Search Console - Vérification du site

**Type :** TXT  
**Sous-domaine :** @  
**Valeur :** `google-site-verification=0aCVNJX0dMhyAGYMNJmxi03zRczsgJVQ_iYXaRr0Gks`  
**TTL :** 3600 (par défaut)

**Objectif :** Vérifier la propriété du site dans Google Search Console

---

### 2. Google Workspace - Vérification

**Type :** TXT  
**Sous-domaine :** @  
**Valeur :** `x3jyqv4ulvd7`  
**TTL :** 3600 (par défaut)

**Objectif :** Vérifier le domaine pour Google Workspace (Gmail professionnel)

---

### 3. Google Workspace - CNAME

**Type :** CNAME  
**Sous-domaine :** @  
**Cible :** `gv-f3mjlwqtry376y.dv.googlehosted.com`  
**TTL :** 3600 (par défaut)

**Objectif :** Configuration Google Workspace (Gmail professionnel)

---

## 🚀 INSTRUCTIONS POUR OVH

### Étape 1 : Se connecter au Manager OVH

1. **Allez sur** : https://www.ovh.com/manager/
2. **Connectez-vous** avec vos identifiants
3. **Cliquez sur** "Web Cloud"
4. **Sélectionnez** "Domaines"
5. **Cliquez sur** `ghostremixpack.com`

---

### Étape 2 : Accéder à la Zone DNS

1. **Cliquez sur** l'onglet "Zone DNS"
2. **Cliquez sur** "Ajouter un enregistrement"

---

### Étape 3 : Ajouter les enregistrements TXT

#### Enregistrement 1 : Google Search Console

```
Type : TXT
Sous-domaine : @
Valeur : google-site-verification=0aCVNJX0dMhyAGYMNJmxi03zRczsgJVQ_iYXaRr0Gks
TTL : 3600
```

**Actions :**
1. Sélectionnez "TXT"
2. Sous-domaine : `@`
3. Valeur : `google-site-verification=0aCVNJX0dMhyAGYMNJmxi03zRczsgJVQ_iYXaRr0Gks`
4. Cliquez sur "Suivant"
5. Cliquez sur "Confirmer"

#### Enregistrement 2 : Google Workspace

```
Type : TXT
Sous-domaine : @
Valeur : x3jyqv4ulvd7
TTL : 3600
```

**Actions :**
1. Sélectionnez "TXT"
2. Sous-domaine : `@`
3. Valeur : `x3jyqv4ulvd7`
4. Cliquez sur "Suivant"
5. Cliquez sur "Confirmer"

---

### Étape 4 : Ajouter l'enregistrement CNAME

#### Enregistrement 3 : Google Workspace CNAME

```
Type : CNAME
Sous-domaine : @
Cible : gv-f3mjlwqtry376y.dv.googlehosted.com
TTL : 3600
```

**Actions :**
1. Sélectionnez "CNAME"
2. Sous-domaine : `@`
3. Cible : `gv-f3mjlwqtry376y.dv.googlehosted.com`
4. Cliquez sur "Suivant"
5. Cliquez sur "Confirmer"

---

## ⏱️ TEMPS DE PROPAGATION

**Durée :** 5 minutes à 48 heures  
**Généralement :** 1-2 heures

---

## ✅ VÉRIFICATION

### Vérifier Google Search Console

1. **Allez sur** : https://search.google.com/search-console
2. **Cliquez sur** "Vérifier"
3. **Attendez** la confirmation

### Vérifier Google Workspace

1. **Allez sur** : https://admin.google.com
2. **Vérifiez** le statut de vérification du domaine
3. **Attendez** la confirmation

### Vérifier la propagation DNS

```bash
# Google Search Console
dig TXT ghostremixpack.com +short | grep google-site-verification

# Google Workspace TXT
dig TXT ghostremixpack.com +short | grep x3jyqv4ulvd7

# Google Workspace CNAME
dig CNAME ghostremixpack.com +short
```

---

## 📊 RÉCAPITULATIF

| # | Type | Sous-domaine | Valeur | Statut |
|---|------|--------------|--------|--------|
| 1 | TXT | @ | google-site-verification=0aCVNJX0dMhyAGYMNJmxi03zRczsgJVQ_iYXaRr0Gks | ⚠️ À ajouter |
| 2 | TXT | @ | x3jyqv4ulvd7 | ⚠️ À ajouter |
| 3 | CNAME | @ | gv-f3mjlwqtry376y.dv.googlehosted.com | ⚠️ À ajouter |

---

## 🎯 PROCHAINES ÉTAPES

Une fois les DNS ajoutés :

1. ✅ **Vérifier** dans Google Search Console
2. ✅ **Vérifier** dans Google Workspace
3. ✅ **Soumettre** le sitemap.xml
4. ✅ **Configurer** Gmail professionnel

---

## 💡 NOTES

- Les enregistrements DNS peuvent prendre jusqu'à 48h pour se propager
- Vérifiez régulièrement le statut dans Google Search Console
- Une fois vérifié, vous pourrez soumettre votre sitemap
- Google Workspace vous permettra d'utiliser Gmail professionnel

---

**Crée le :** 15 Janvier 2025  
**Dernière mise à jour :** 15 Janvier 2025

