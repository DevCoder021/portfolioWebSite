const express = require('express');
const router = express.Router();
const {
    sendContactMessage,
    getAllMessages,
    markMessageAsRead
} = require('../controllers/contactController');

// Routes pour le contact

// POST /api/contact - Envoyer un message de contact
router.post('/', sendContactMessage);

// GET /api/contact/messages - Récupérer tous les messages (administration)
// Query params optionnels: ?status=nouveau&limit=10
router.get('/messages', getAllMessages);

// PUT /api/contact/messages/:id/read - Marquer un message comme lu
router.put('/messages/:id/read', markMessageAsRead);

module.exports = router;