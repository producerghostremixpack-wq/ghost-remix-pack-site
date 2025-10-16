# 🎬 Dossier Vidéos - Ghost Remix Pack

## 📁 Structure du dossier

Ce dossier contient les vidéos d'arrière-plan pour le site.

---

## 🎯 Vidéo attendue pour la section Packs

### Nom du fichier :
```
Vidéo_sans_musique_ni_personnage.mp4
```

### Spécifications recommandées :
- **Format** : MP4 (H.264)
- **Résolution** : 1920x1080 (Full HD) ou supérieure
- **Ratio** : 16:9
- **Durée** : 10-30 secondes (boucle)
- **Poids** : < 20 MB (optimisé pour le web)
- **Audio** : Aucun (vidéo muette)
- **FPS** : 24-30 fps

### Utilisation dans le code :
La vidéo est utilisée comme arrière-plan de la section "Nos Packs Exclusifs" :
```tsx
<video autoPlay loop muted playsInline>
  <source src="/videos/Vidéo_sans_musique_ni_personnage.mp4" type="video/mp4" />
</video>
```

---

## ✅ Pour ajouter votre vidéo :

1. **Copiez** votre fichier MP4 dans ce dossier
2. **Renommez-le** : `Vidéo_sans_musique_ni_personnage.mp4`
3. **Actualisez** le site (Cmd+R)
4. La vidéo apparaîtra automatiquement en arrière-plan

---

## 🎨 Effet visuel sur le site :

- **Opacité** : 75%
- **Luminosité** : +10%
- **Contraste** : +20%
- **Position** : Arrière-plan de toute la section packs
- **Lecture** : Automatique en boucle

---

## 💡 Conseils d'optimisation :

### Compresser la vidéo (si trop lourde) :
```bash
# Avec FFmpeg (si installé)
ffmpeg -i votre_video.mp4 -vcodec h264 -acodec none -b:v 2M Vidéo_sans_musique_ni_personnage.mp4
```

### Ou utilisez des outils en ligne :
- **HandBrake** (gratuit, Mac/Windows)
- **CloudConvert** (en ligne)
- **Compressor** (Mac)

---

## 📂 Structure actuelle :

```
public/
  └── videos/
      ├── README.md (ce fichier)
      └── [Votre vidéo MP4 ici]
```

---

**Ajoutez votre vidéo et elle apparaîtra automatiquement ! 🎬**


