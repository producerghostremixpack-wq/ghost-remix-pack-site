# 📸 GUIDE VISUEL - AJOUTER LES DNS DANS OVH

**Domaine :** ghostremixpack.com  
**Date :** 15 Janvier 2025

---

## 🎯 OBJECTIF

Ajouter 3 enregistrements DNS pour Google :
1. ✅ Google Search Console (TXT)
2. ✅ Google Workspace TXT (TXT)
3. ✅ Google Workspace CNAME (CNAME)

---

## 🚀 ÉTAPE 1 : SE CONNECTER À OVH

```
┌─────────────────────────────────────────────┐
│  OVH Manager                                │
│  https://www.ovh.com/manager/               │
├─────────────────────────────────────────────┤
│                                             │
│  Email : [votre@email.com]                 │
│  Mot de passe : [********]                  │
│                                             │
│  [Se connecter]                             │
└─────────────────────────────────────────────┘
```

1. **Allez sur** : https://www.ovh.com/manager/
2. **Connectez-vous** avec vos identifiants

---

## 🚀 ÉTAPE 2 : ACCÉDER AUX DOMAINES

```
┌─────────────────────────────────────────────┐
│  Menu de gauche                             │
├─────────────────────────────────────────────┤
│  🏠 Accueil                                 │
│  ☁️  Web Cloud                              │
│     ├─ Hébergements                         │
│     ├─ Domaines          ← CLIQUEZ ICI      │
│     ├─ Emails                                │
│     └─ Bases de données                      │
│  💻 Serveurs                                 │
│  ...                                         │
└─────────────────────────────────────────────┘
```

1. **Cliquez sur** "Web Cloud" dans le menu de gauche
2. **Cliquez sur** "Domaines"

---

## 🚀 ÉTAPE 3 : SÉLECTIONNER VOTRE DOMAINE

```
┌─────────────────────────────────────────────┐
│  Vos domaines                               │
├─────────────────────────────────────────────┤
│                                             │
│  🔍 Rechercher un domaine...                │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │ ghostremixpack.com                    │ │
│  │ Expire le : 15/01/2026                │ │
│  │ [Gérer]                               │ │
│  └───────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

1. **Trouvez** `ghostremixpack.com` dans la liste
2. **Cliquez sur** "Gérer" ou sur le nom du domaine

---

## 🚀 ÉTAPE 4 : ACCÉDER À LA ZONE DNS

```
┌─────────────────────────────────────────────┐
│  ghostremixpack.com                         │
├─────────────────────────────────────────────┤
│  [Informations générales]                   │
│  [Zone DNS]           ← CLIQUEZ ICI         │
│  [Serveurs DNS]                             │
│  [Transfert]                                │
│  [Redirection]                              │
└─────────────────────────────────────────────┘
```

1. **Cliquez sur** l'onglet "Zone DNS"

---

## 🚀 ÉTAPE 5 : VOIR LA ZONE DNS

```
┌─────────────────────────────────────────────┐
│  Zone DNS de ghostremixpack.com             │
├─────────────────────────────────────────────┤
│                                             │
│  [Ajouter un enregistrement]  ← CLIQUEZ     │
│                                             │
│  Enregistrements existants :                │
│  ┌───────────────────────────────────────┐ │
│  │ Type  │ Sous-domaine │ Cible          │ │
│  │ A     │ @           │ 123.45.67.89   │ │
│  │ A     │ www         │ 123.45.67.89   │ │
│  │ MX    │ @           │ mx1.mail.ovh...│ │
│  └───────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

1. **Cliquez sur** "Ajouter un enregistrement"

---

## 🚀 ÉTAPE 6 : AJOUTER LE PREMIER ENREGISTREMENT (Google Search Console)

```
┌─────────────────────────────────────────────┐
│  Ajouter un enregistrement                  │
├─────────────────────────────────────────────┤
│                                             │
│  Type d'enregistrement :                    │
│  ○ A                                       │
│  ○ AAAA                                    │
│  ○ CNAME                                   │
│  ○ MX                                      │
│  ● TXT              ← SÉLECTIONNEZ          │
│  ○ SRV                                     │
│  ○ SPF                                     │
│                                             │
│  Sous-domaine :                             │
│  [@]              ← TAPEZ @                 │
│                                             │
│  Valeur :                                   │
│  [google-site-verification=0aCVNJX0dMhyAGYMNJmxi03zRczsgJVQ_iYXaRr0Gks]
│              ← COPIEZ-COLLEZ CETTE VALEUR   │
│                                             │
│  TTL :                                      │
│  [3600] (par défaut)                        │
│                                             │
│  [Suivant]  [Annuler]                       │
└─────────────────────────────────────────────┘
```

**Actions :**
1. **Sélectionnez** "TXT"
2. **Sous-domaine** : Tapez `@`
3. **Valeur** : Copiez-collez `google-site-verification=0aCVNJX0dMhyAGYMNJmxi03zRczsgJVQ_iYXaRr0Gks`
4. **TTL** : Laissez 3600 (par défaut)
5. **Cliquez sur** "Suivant"

---

## 🚀 ÉTAPE 7 : CONFIRMER LE PREMIER ENREGISTREMENT

```
┌─────────────────────────────────────────────┐
│  Confirmer l'ajout                          │
├─────────────────────────────────────────────┤
│                                             │
│  Type : TXT                                 │
│  Sous-domaine : @                           │
│  Valeur : google-site-verification=0aCVNJ...│
│  TTL : 3600                                 │
│                                             │
│  [Confirmer]  [Annuler]                     │
└─────────────────────────────────────────────┘
```

1. **Vérifiez** les informations
2. **Cliquez sur** "Confirmer"

---

## 🚀 ÉTAPE 8 : AJOUTER LE DEUXIÈME ENREGISTREMENT (Google Workspace TXT)

**Répétez les étapes 5-7 avec ces valeurs :**

```
Type : TXT
Sous-domaine : @
Valeur : x3jyqv4ulvd7
TTL : 3600
```

1. **Cliquez sur** "Ajouter un enregistrement"
2. **Sélectionnez** "TXT"
3. **Sous-domaine** : `@`
4. **Valeur** : `x3jyqv4ulvd7`
5. **TTL** : 3600
6. **Cliquez sur** "Suivant" puis "Confirmer"

---

## 🚀 ÉTAPE 9 : AJOUTER LE TROISIÈME ENREGISTREMENT (Google Workspace CNAME)

**Répétez les étapes 5-7 avec ces valeurs :**

```
Type : CNAME
Sous-domaine : @
Cible : gv-f3mjlwqtry376y.dv.googlehosted.com
TTL : 3600
```

1. **Cliquez sur** "Ajouter un enregistrement"
2. **Sélectionnez** "CNAME"
3. **Sous-domaine** : `@`
4. **Cible** : `gv-f3mjlwqtry376y.dv.googlehosted.com`
5. **TTL** : 3600
6. **Cliquez sur** "Suivant" puis "Confirmer"

---

## ✅ RÉSULTAT FINAL

Après avoir ajouté les 3 enregistrements, votre Zone DNS devrait ressembler à :

```
┌─────────────────────────────────────────────────────────────┐
│  Zone DNS de ghostremixpack.com                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Enregistrements :                                          │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Type  │ Sous-domaine │ Valeur/Cible                  │ │
│  │ A     │ @           │ 123.45.67.89                  │ │
│  │ A     │ www         │ 123.45.67.89                  │ │
│  │ MX    │ @           │ mx1.mail.ovh.net              │ │
│  │ TXT   │ @           │ google-site-verification=...  │ │
│  │ TXT   │ @           │ x3jyqv4ulvd7                  │ │
│  │ CNAME │ @           │ gv-f3mjlwqtry376y.dv.goo...   │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ⏱️ TEMPS DE PROPAGATION

**Durée :** 5 minutes à 48 heures  
**Généralement :** 1-2 heures

---

## 🧪 VÉRIFICATION

### Option 1 : Script automatique

```bash
./verifier-dns-google.sh
```

### Option 2 : Commande manuelle

```bash
# Vérifier Google Search Console
dig TXT ghostremixpack.com +short | grep google-site-verification

# Vérifier Google Workspace TXT
dig TXT ghostremixpack.com +short | grep x3jyqv4ulvd7

# Vérifier Google Workspace CNAME
dig CNAME ghostremixpack.com +short | grep gv-f3mjlwqtry376y
```

---

## 🎯 PROCHAINES ÉTAPES

Une fois les DNS configurés et propagés :

### 1. Vérifier dans Google Search Console

1. **Allez sur** : https://search.google.com/search-console
2. **Cliquez sur** "Vérifier"
3. **Attendez** la confirmation

### 2. Vérifier dans Google Workspace

1. **Allez sur** : https://admin.google.com
2. **Vérifiez** le statut de vérification du domaine
3. **Attendez** la confirmation

### 3. Soumettre le sitemap

1. **Dans Google Search Console** : Sitemaps
2. **Entrez** : `sitemap.xml`
3. **Cliquez sur** "Soumettre"

---

## 📊 RÉCAPITULATIF

| # | Type | Sous-domaine | Valeur | Statut |
|---|------|--------------|--------|--------|
| 1 | TXT | @ | google-site-verification=0aCVNJX0dMhyAGYMNJmxi03zRczsgJVQ_iYXaRr0Gks | ⚠️ À ajouter |
| 2 | TXT | @ | x3jyqv4ulvd7 | ⚠️ À ajouter |
| 3 | CNAME | @ | gv-f3mjlwqtry376y.dv.googlehosted.com | ⚠️ À ajouter |

---

## 💡 CONSEILS

- ✅ Ajoutez les 3 enregistrements dans l'ordre
- ✅ Vérifiez bien que le sous-domaine est `@`
- ✅ Copiez-collez exactement les valeurs (sans espaces)
- ✅ Attendez 1-2 heures avant de vérifier
- ✅ Relancez le script de vérification toutes les heures

---

## ❓ BESOIN D'AIDE ?

Si vous rencontrez des problèmes :

1. **Vérifiez** que vous êtes bien dans la Zone DNS
2. **Vérifiez** que le sous-domaine est `@`
3. **Vérifiez** que les valeurs sont exactement comme indiqué
4. **Attendez** 1-2 heures pour la propagation
5. **Contactez** le support OVH si nécessaire

---

**Bon courage ! 🚀**

---

**Créé le :** 15 Janvier 2025  
**Dernière mise à jour :** 15 Janvier 2025

