#!/bin/bash

# Script de mise à jour automatique du changelog
# Usage: ./scripts/update-changelog.sh "Description des modifications"

CHANGELOG_FILE="UPDATE-LOG.md"
COMMIT_MSG="$1"
DATE=$(date '+%Y-%m-%d')
TIME=$(date '+%H:%M')

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📝 Mise à jour du changelog...${NC}"

# Créer le contenu de la nouvelle entrée
NEW_ENTRY="## 📅 ${DATE} - ${TIME}

### 📝 Modifications
${COMMIT_MSG}

---

"

# Insérer au début du fichier (après le titre)
if [ -f "$CHANGELOG_FILE" ]; then
    # Créer un fichier temporaire
    TEMP_FILE=$(mktemp)
    
    # Écrire le titre
    head -n 1 "$CHANGELOG_FILE" > "$TEMP_FILE"
    echo "" >> "$TEMP_FILE"
    
    # Ajouter la nouvelle entrée
    echo "$NEW_ENTRY" >> "$TEMP_FILE"
    
    # Ajouter le reste du fichier
    tail -n +3 "$CHANGELOG_FILE" >> "$TEMP_FILE"
    
    # Remplacer le fichier original
    mv "$TEMP_FILE" "$CHANGELOG_FILE"
    
    echo -e "${GREEN}✅ Changelog mis à jour !${NC}"
else
    echo -e "${RED}❌ Fichier $CHANGELOG_FILE introuvable${NC}"
    exit 1
fi

