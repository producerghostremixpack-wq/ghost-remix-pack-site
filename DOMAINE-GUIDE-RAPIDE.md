# 🚀 Guide ULTRA RAPIDE - Connecter votre Domaine

## 🎯 EN 3 ÉTAPES SIMPLES

### ✅ ÉTAPE 1 : Ajouter le domaine dans Vercel (2 minutes)

1. Allez sur : https://vercel.com/dashboard
2. Cliquez sur votre projet **`ghost-remix-pack`**
3. **Settings** → **Domains**
4. Tapez votre nom de domaine (ex: `ghostremixpack.com`)
5. Cliquez **Add**

---

### ✅ ÉTAPE 2 : Copier les informations DNS de Vercel (30 secondes)

Vercel va vous montrer quelque chose comme :

```
Pour votre-domaine.com
Type: A
Name: @
Value: 76.76.21.21

Pour www.votre-domaine.com  
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**📝 NOTEZ CES INFORMATIONS** (ou laissez l'onglet ouvert)

---

### ✅ ÉTAPE 3 : Configurer chez votre registrar (5 minutes)

**Où avez-vous acheté votre domaine ?**

#### 🟦 Si c'est GoDaddy :
1. https://account.godaddy.com/
2. **Mes Produits** → Votre domaine → **DNS**
3. **Ajouter** les 2 enregistrements (A et CNAME)

#### 🟠 Si c'est OVH :
1. https://www.ovh.com/manager/
2. **Nom de domaine** → **Zone DNS** → **Ajouter une entrée**
3. Ajoutez les 2 enregistrements (A et CNAME)

#### 🟢 Si c'est Namecheap :
1. https://ap.www.namecheap.com/
2. **Domain List** → **Manage** → **Advanced DNS**
3. **Add New Record** (2 fois : A et CNAME)

#### 🔵 Si c'est Google Domains :
1. https://domains.google.com/
2. Votre domaine → **DNS** → **Enregistrements personnalisés**
3. Créez les 2 enregistrements (A et CNAME)

---

## ⏱️ COMBIEN DE TEMPS ?

- **Configuration** : 5-10 minutes
- **Propagation DNS** : 10 minutes à 24 heures (généralement 1-2 heures)
- **SSL (HTTPS)** : Automatique, activé par Vercel

---

## ✅ VÉRIFIER QUE ÇA MARCHE

1. Retournez sur Vercel → **Settings** → **Domains**
2. Votre domaine devrait afficher : **✅ Valid**
3. Ouvrez votre domaine dans un navigateur
4. Votre site s'affiche ! 🎉

---

## 🆘 BESOIN D'AIDE ?

Dites-moi simplement :
- "Mon domaine est : ______"
- "Je l'ai acheté chez : ______"
- "Je suis bloqué à l'étape : ______"

Et je vous guide pas à pas ! 🚀

---

## 📚 Pour plus de détails

Consultez le guide complet : **`CONNECTER-MON-DOMAINE.md`**

---

## 🎯 RÉSUMÉ ULTRA COURT

1. **Vercel** : Settings → Domains → Ajoutez votre domaine
2. **Registrar** : Ajoutez 2 enregistrements DNS (A et CNAME)
3. **Attendez** 1-2 heures
4. **C'est fait !** 🎉

Votre site sera sur : `https://votre-domaine.com`



