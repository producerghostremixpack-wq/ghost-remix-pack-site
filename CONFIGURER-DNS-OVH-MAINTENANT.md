# 🎯 Configurer DNS OVH pour Vercel - Guide Simple

## ✅ STATUT ACTUEL
- ✅ Site déployé sur Vercel
- ✅ Domaines configurés dans Vercel : `ghostremixpack.com` + `www.ghostremixpack.com`
- ⏳ **À faire : Configurer les DNS chez OVH**

---

## 📋 ÉTAPES À SUIVRE

### **1️⃣ Se connecter à OVH**
🔗 https://www.ovh.com/manager/

### **2️⃣ Accéder à la Zone DNS**
1. Dans le menu, aller dans **"Web Cloud"**
2. Cliquer sur **"Noms de domaine"**
3. Sélectionner **"ghostremixpack.com"**
4. Cliquer sur l'onglet **"Zone DNS"**

### **3️⃣ Ajouter l'enregistrement A**

Cliquer sur **"Ajouter une entrée"** puis :

```
┌─────────────────────────────────────┐
│ Type de champ : A                   │
│ Sous-domaine  : (vide ou @)         │
│ TTL           : 3600                │
│ Cible         : 76.76.21.21         │
└─────────────────────────────────────┘
```

**Cliquer sur "Suivant" puis "Valider"**

### **4️⃣ Ajouter l'enregistrement CNAME**

Cliquer sur **"Ajouter une entrée"** puis :

```
┌─────────────────────────────────────┐
│ Type de champ : CNAME               │
│ Sous-domaine  : www                 │
│ TTL           : 3600                │
│ Cible         : cname.vercel-dns.com.│
└─────────────────────────────────────┘
```

⚠️ **IMPORTANT : N'oubliez pas le point final** → `cname.vercel-dns.com.`

**Cliquer sur "Suivant" puis "Valider"**

---

## ⏱️ TEMPS D'ATTENTE

| Étape | Durée |
|-------|-------|
| Configuration OVH | 5 minutes |
| Propagation DNS | 15-30 minutes |
| SSL automatique Vercel | 10-15 minutes |
| **TOTAL** | **~30-60 minutes** |

---

## 🔍 VÉRIFIER LA CONFIGURATION

Après avoir configuré les DNS, attendez **15-30 minutes** puis lancez :

```bash
./check-dns.sh
```

Vous pouvez aussi vérifier en ligne :
- 🔗 https://dnschecker.org/#A/ghostremixpack.com
- 🔗 https://dnschecker.org/#CNAME/www.ghostremixpack.com

---

## ✅ RÉSULTAT ATTENDU

Une fois configuré, votre site sera accessible sur :

| URL | Statut |
|-----|--------|
| 🌐 https://ghostremixpack.com | ✅ Redirige vers www |
| 🌐 https://www.ghostremixpack.com | ✅ Site principal |
| 🔒 Certificat SSL | ✅ Automatique (gratuit) |

---

## 🆘 EN CAS DE PROBLÈME

### ❌ DNS ne se propagent pas ?
- Vider le cache DNS : `sudo dscacheutil -flushcache`
- Attendre 1h maximum (OVH est rapide)
- Vérifier que le point final est bien présent : `cname.vercel-dns.com.`

### ❌ Erreur "Invalid Configuration" sur Vercel ?
- Vérifier que les enregistrements DNS sont corrects
- Attendre que la propagation soit complète
- Le statut se mettra à jour automatiquement sur Vercel

---

## 📝 CHECKLIST

Cochez au fur et à mesure :

- [ ] Connecté à OVH Manager
- [ ] Accédé à Zone DNS de ghostremixpack.com
- [ ] Ajouté enregistrement A (76.76.21.21)
- [ ] Ajouté enregistrement CNAME (cname.vercel-dns.com.)
- [ ] Validé les modifications
- [ ] Attendu 15-30 minutes
- [ ] Lancé `./check-dns.sh` pour vérifier
- [ ] Testé https://www.ghostremixpack.com dans le navigateur
- [ ] Vérifié le SSL (cadenas vert 🔒)

---

## 🎉 PROCHAINE ÉTAPE

Une fois les DNS configurés → **Déployer le backend sur Railway** 🚂


