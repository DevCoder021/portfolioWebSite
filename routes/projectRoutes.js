const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

// Routes pour les projets

// GET /api/projects - Récupérer tous les projets
// Query params optionnels: ?category=web&status=terminé&featured=true
router.get('/', getAllProjects);

// GET /api/projects/:id - Récupérer un projet par ID
router.get('/:id', getProjectById);

// POST /api/projects - Créer un nouveau projet
router.post('/', createProject);

// PUT /api/projects/:id - Mettre à jour un projet
router.put('/:id', updateProject);

// DELETE /api/projects/:id - Supprimer un projet
router.delete('/:id', deleteProject);

module.exports = router;