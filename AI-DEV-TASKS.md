# 🤖 Guide d'utilisation AI Dev Tasks

## ✅ Installation terminée !

Le système **AI Dev Tasks** est maintenant configuré dans votre projet Ghost Remix Pack.

## 📁 Structure créée

```
/
├── ai-dev-tasks/           # Repository cloné (ne sera pas commité)
├── tasks/                  # Vos PRD et listes de tâches
├── .claude/
│   └── commands/           # Commandes personnalisées
│       ├── create-prd.md
│       ├── generate-tasks.md
│       └── process-task-list.md
└── CLAUDE.md               # Configuration AI
```

## 🚀 Comment utiliser

### Méthode 1 : Avec Cursor (recommandé)

#### Étape 1 : Créer un PRD
```
Utilise @ai-dev-tasks/create-prd.md
Voici la fonctionnalité que je veux construire : [Décrivez votre fonctionnalité]
Référence ces fichiers si nécessaire : @file1.tsx @file2.ts
```

#### Étape 2 : Générer les tâches
```
Maintenant prends @tasks/0001-prd-[nom-feature].md et crée les tâches avec @ai-dev-tasks/generate-tasks.md
```

#### Étape 3 : Traiter les tâches une par une
```
Commence par la tâche 1.1 et utilise @ai-dev-tasks/process-task-list.md
```

Ensuite, répondez simplement "oui" après chaque tâche pour passer à la suivante.

### Méthode 2 : Avec Claude Code

Si vous utilisez Claude Code, utilisez les commandes personnalisées :

```
/create-prd
/generate-tasks
/process-task-list
```

## 💡 Exemples de fonctionnalités à développer

Voici quelques idées pour Ghost Remix Pack :

- 🛒 **Panier et système de paiement Stripe**
- 📧 **Formulaire de contact avec envoi d'email**
- 🎵 **Player audio avancé avec playlist**
- 👤 **Système d'authentification utilisateur**
- 📊 **Dashboard admin pour gérer les packs**
- 🔔 **Notifications de nouveaux packs**
- ⭐ **Système de favoris/wishlist**
- 🔍 **Recherche et filtres de packs**
- 💬 **Section témoignages clients**
- 📱 **Amélioration responsive mobile**

## 📝 Workflow recommandé

1. **Décrivez la fonctionnalité** clairement avec le contexte
2. **Répondez aux questions** de clarification de l'IA
3. **Validez le PRD** généré
4. **Générez la liste de tâches** détaillée
5. **Traitez tâche par tâche** avec validation à chaque étape

## ✨ Avantages

- ✅ Développement structuré et organisé
- ✅ Validation étape par étape
- ✅ Historique clair des fonctionnalités
- ✅ Documentation automatique
- ✅ Meilleure qualité de code
- ✅ Suivi de progression visuel

## 🔗 Ressources

- [Repository original](https://github.com/snarktank/ai-dev-tasks.git)
- [Vidéo de démonstration](https://youtu.be/fD4ktSkNCw4)

---

**Prêt à construire votre prochaine fonctionnalité !** 🚀

