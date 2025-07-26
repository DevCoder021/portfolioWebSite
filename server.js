const express = require('express');
const cors = require('cors');
const path = require('path');

// Import des routes
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques
app.use(express.static('public'));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Route de base
app.get('/', (req, res) => {
    res.json({
        message: 'API Portfolio - Backend Node.js',
        version: '1.0.0',
        endpoints: {
            projects: {
                'GET /api/projects': 'Récupérer tous les projets',
                'POST /api/projects': 'Ajouter un nouveau projet'
            },
            contact: {
                'POST /api/contact': 'Envoyer un message de contact'
            }
        }
    });
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Erreur interne du serveur',
        message: err.message
    });
});

// Middleware pour les routes non trouvées
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route non trouvée',
        message: `La route ${req.originalUrl} n'existe pas`
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`📋 API Documentation: http://localhost:${PORT}`);
});

module.exports = app;