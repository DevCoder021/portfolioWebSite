const fs = require('fs');
const path = require('path');

// Chemin vers le fichier de données des projets
const projectsFilePath = path.join(__dirname, '../data/projects.json');

// Fonction utilitaire pour lire les projets
const readProjects = () => {
    try {
        const data = fs.readFileSync(projectsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lors de la lecture des projets:', error);
        return [];
    }
};

// Fonction utilitaire pour écrire les projets
const writeProjects = (projects) => {
    try {
        fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'écriture des projets:', error);
        return false;
    }
};

// Récupérer tous les projets
const getAllProjects = (req, res) => {
    try {
        const projects = readProjects();
        const { category, status, featured } = req.query;

        let filteredProjects = projects;

        // Filtrer par catégorie
        if (category) {
            filteredProjects = filteredProjects.filter(
                project => project.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filtrer par statut
        if (status) {
            filteredProjects = filteredProjects.filter(
                project => project.status.toLowerCase() === status.toLowerCase()
            );
        }

        // Filtrer par projets mis en avant
        if (featured === 'true') {
            filteredProjects = filteredProjects.filter(project => project.featured);
        }

        // Trier par date de création (plus récent en premier)
        filteredProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({
            success: true,
            count: filteredProjects.length,
            data: filteredProjects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération des projets',
            message: error.message
        });
    }
};

// Récupérer un projet par ID
const getProjectById = (req, res) => {
    try {
        const projects = readProjects();
        const projectId = parseInt(req.params.id);
        
        const project = projects.find(p => p.id === projectId);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Projet non trouvé',
                message: `Aucun projet trouvé avec l'ID ${projectId}`
            });
        }

        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération du projet',
            message: error.message
        });
    }
};

// Ajouter un nouveau projet
const createProject = (req, res) => {
    try {
        const {
            title,
            description,
            technologies,
            image,
            status,
            category,
            github,
            demo,
            featured
        } = req.body;

        // Validation des champs requis
        if (!title || !description || !technologies || !category) {
            return res.status(400).json({
                success: false,
                error: 'Champs manquants',
                message: 'Les champs title, description, technologies et category sont requis'
            });
        }

        const projects = readProjects();
        
        // Générer un nouvel ID
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        
        // Créer le nouveau projet
        const newProject = {
            id: newId,
            title,
            description,
            technologies: Array.isArray(technologies) ? technologies : [technologies],
            image: image || null,
            status: status || 'En cours',
            category,
            github: github || null,
            demo: demo || null,
            createdAt: new Date().toISOString().split('T')[0],
            featured: featured === true || featured === 'true'
        };

        // Ajouter le projet à la liste
        projects.push(newProject);
        
        // Sauvegarder dans le fichier
        if (writeProjects(projects)) {
            res.status(201).json({
                success: true,
                message: 'Projet créé avec succès',
                data: newProject
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Erreur lors de la sauvegarde du projet'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la création du projet',
            message: error.message
        });
    }
};

// Mettre à jour un projet
const updateProject = (req, res) => {
    try {
        const projects = readProjects();
        const projectId = parseInt(req.params.id);
        const projectIndex = projects.findIndex(p => p.id === projectId);
        
        if (projectIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Projet non trouvé',
                message: `Aucun projet trouvé avec l'ID ${projectId}`
            });
        }

        // Mettre à jour le projet avec les nouvelles données
        const updatedProject = {
            ...projects[projectIndex],
            ...req.body,
            id: projectId, // S'assurer que l'ID ne change pas
            technologies: Array.isArray(req.body.technologies) 
                ? req.body.technologies 
                : projects[projectIndex].technologies
        };

        projects[projectIndex] = updatedProject;
        
        if (writeProjects(projects)) {
            res.json({
                success: true,
                message: 'Projet mis à jour avec succès',
                data: updatedProject
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Erreur lors de la sauvegarde du projet'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la mise à jour du projet',
            message: error.message
        });
    }
};

// Supprimer un projet
const deleteProject = (req, res) => {
    try {
        const projects = readProjects();
        const projectId = parseInt(req.params.id);
        const projectIndex = projects.findIndex(p => p.id === projectId);
        
        if (projectIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Projet non trouvé',
                message: `Aucun projet trouvé avec l'ID ${projectId}`
            });
        }

        const deletedProject = projects.splice(projectIndex, 1)[0];
        
        if (writeProjects(projects)) {
            res.json({
                success: true,
                message: 'Projet supprimé avec succès',
                data: deletedProject
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Erreur lors de la sauvegarde'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la suppression du projet',
            message: error.message
        });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};