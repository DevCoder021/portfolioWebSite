const fs = require('fs');
const path = require('path');

// Chemin vers le fichier de données des messages
const messagesFilePath = path.join(__dirname, '../data/messages.json');

// Fonction utilitaire pour lire les messages
const readMessages = () => {
    try {
        const data = fs.readFileSync(messagesFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lors de la lecture des messages:', error);
        return [];
    }
};

// Fonction utilitaire pour écrire les messages
const writeMessages = (messages) => {
    try {
        fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'écriture des messages:', error);
        return false;
    }
};

// Fonction de validation d'email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Envoyer un message de contact
const sendContactMessage = (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation des champs requis
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'Champs manquants',
                message: 'Tous les champs (name, email, subject, message) sont requis'
            });
        }

        // Validation de l'email
        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                error: 'Email invalide',
                message: 'Veuillez fournir une adresse email valide'
            });
        }

        // Validation de la longueur des champs
        if (name.length < 2 || name.length > 100) {
            return res.status(400).json({
                success: false,
                error: 'Nom invalide',
                message: 'Le nom doit contenir entre 2 et 100 caractères'
            });
        }

        if (subject.length < 5 || subject.length > 200) {
            return res.status(400).json({
                success: false,
                error: 'Sujet invalide',
                message: 'Le sujet doit contenir entre 5 et 200 caractères'
            });
        }

        if (message.length < 10 || message.length > 1000) {
            return res.status(400).json({
                success: false,
                error: 'Message invalide',
                message: 'Le message doit contenir entre 10 et 1000 caractères'
            });
        }

        const messages = readMessages();
        
        // Générer un nouvel ID
        const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
        
        // Créer le nouveau message
        const newMessage = {
            id: newId,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
            createdAt: new Date().toISOString(),
            status: 'nouveau', // nouveau, lu, répondu
            ipAddress: req.ip || req.connection.remoteAddress
        };

        // Ajouter le message à la liste
        messages.push(newMessage);
        
        // Sauvegarder dans le fichier
        if (writeMessages(messages)) {
            // Log du nouveau message (pour le développement)
            console.log('📧 Nouveau message de contact reçu:');
            console.log(`   De: ${newMessage.name} (${newMessage.email})`);
            console.log(`   Sujet: ${newMessage.subject}`);
            console.log(`   Date: ${new Date(newMessage.createdAt).toLocaleString('fr-FR')}`);
            
            res.status(201).json({
                success: true,
                message: 'Message envoyé avec succès',
                data: {
                    id: newMessage.id,
                    name: newMessage.name,
                    subject: newMessage.subject,
                    createdAt: newMessage.createdAt
                }
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Erreur lors de la sauvegarde du message'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de l\'envoi du message',
            message: error.message
        });
    }
};

// Récupérer tous les messages (pour l'administration)
const getAllMessages = (req, res) => {
    try {
        const messages = readMessages();
        const { status, limit } = req.query;

        let filteredMessages = messages;

        // Filtrer par statut
        if (status) {
            filteredMessages = filteredMessages.filter(
                msg => msg.status.toLowerCase() === status.toLowerCase()
            );
        }

        // Trier par date (plus récent en premier)
        filteredMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Limiter le nombre de résultats
        if (limit && !isNaN(limit)) {
            filteredMessages = filteredMessages.slice(0, parseInt(limit));
        }

        res.json({
            success: true,
            count: filteredMessages.length,
            data: filteredMessages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération des messages',
            message: error.message
        });
    }
};

// Marquer un message comme lu
const markMessageAsRead = (req, res) => {
    try {
        const messages = readMessages();
        const messageId = parseInt(req.params.id);
        const messageIndex = messages.findIndex(m => m.id === messageId);
        
        if (messageIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Message non trouvé',
                message: `Aucun message trouvé avec l'ID ${messageId}`
            });
        }

        messages[messageIndex].status = 'lu';
        messages[messageIndex].readAt = new Date().toISOString();
        
        if (writeMessages(messages)) {
            res.json({
                success: true,
                message: 'Message marqué comme lu',
                data: messages[messageIndex]
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
            error: 'Erreur lors de la mise à jour du message',
            message: error.message
        });
    }
};

module.exports = {
    sendContactMessage,
    getAllMessages,
    markMessageAsRead
};