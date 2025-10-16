Génère les tâches à partir du PRD en utilisant `/ai-dev-tasks/generate-tasks.md`

Si le PRD n'est pas explicitement indiqué, génère une liste des PRD disponibles et demande à l'utilisateur de sélectionner :
- cherche dans le dossier `/tasks` les fichiers commençant par `[n]-prd-` (ex: `0001-prd-[nom].md`)
- vérifie qu'il n'y a pas déjà une liste de tâches correspondante dans `/tasks` (ex: `tasks-0001-prd-[nom].md`)
- **toujours** demander confirmation du nom de fichier PRD avant de procéder

Propose les options sous forme de listes numérotées pour faciliter la réponse.

