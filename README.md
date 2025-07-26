# Portfolio Backend API

Backend Node.js avec Express pour un portfolio personnel.

## 🚀 Fonctionnalités

- **Gestion des projets** : CRUD complet pour les projets du portfolio
- **Système de contact** : Réception et gestion des messages de contact
- **Architecture MVC** : Structure claire et maintenable
- **Données simulées** : Stockage en fichiers JSON (pas de base de données)
- **API RESTful** : Endpoints bien structurés avec réponses JSON

## 📋 Endpoints API

### Projets

- `GET /api/projects` - Récupérer tous les projets
  - Query params: `?category=web&status=terminé&featured=true`
- `GET /api/projects/:id` - Récupérer un projet par ID
- `POST /api/projects` - Créer un nouveau projet
- `PUT /api/projects/:id` - Mettre à jour un projet
- `DELETE /api/projects/:id` - Supprimer un projet

### Contact

- `POST /api/contact` - Envoyer un message de contact
- `GET /api/contact/messages` - Récupérer tous les messages (admin)
  - Query params: `?status=nouveau&limit=10`
- `PUT /api/contact/messages/:id/read` - Marquer un message comme lu

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur en mode développement
npm run dev

# Démarrer le serveur en mode production
npm start
```

## 📁 Structure du projet

```
├── server.js              # Point d'entrée de l'application
├── controllers/            # Logique métier
│   ├── projectController.js
│   └── contactController.js
├── routes/                 # Définition des routes
│   ├── projectRoutes.js
│   └── contactRoutes.js
├── data/                   # Données simulées (JSON)
│   ├── projects.json
│   └── messages.json
└── public/                 # Fichiers statiques (optionnel)
```

## 📝 Exemples d'utilisation

### Récupérer tous les projets

```bash
curl http://localhost:3000/api/projects
```

### Ajouter un nouveau projet

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon Nouveau Projet",
    "description": "Description du projet",
    "technologies": ["React", "Node.js"],
    "category": "Web Development",
    "status": "En cours",
    "featured": true
  }'
```

### Envoyer un message de contact

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Demande de collaboration",
    "message": "Bonjour, je souhaiterais discuter d'un projet..."
  }'
```

## 🔧 Configuration

Le serveur démarre par défaut sur le port 3000. Vous pouvez modifier le port en définissant la variable d'environnement `PORT`.

```bash
PORT=8000 npm start
```

## 📊 Format des données

### Projet

```json
{
  "id": 1,
  "title": "Nom du projet",
  "description": "Description détaillée",
  "technologies": ["HTML5", "CSS3", "JavaScript"],
  "image": "image.jpg",
  "status": "Terminé",
  "category": "Web Development",
  "github": "https://github.com/user/repo",
  "demo": "https://demo.com",
  "createdAt": "2024-01-15",
  "featured": true
}
```

### Message de contact

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Sujet du message",
  "message": "Contenu du message",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "status": "nouveau",
  "ipAddress": "192.168.1.1"
}
```

## 🚀 Prochaines étapes

- Intégration d'une base de données (MongoDB, PostgreSQL)
- Authentification et autorisation
- Upload de fichiers pour les images de projets
- Envoi d'emails automatiques pour les messages de contact
- Tests unitaires et d'intégration
- Documentation API avec Swagger