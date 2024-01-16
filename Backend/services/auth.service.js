// Importation du module de transfert de données entre la base de données et l'application
const authDTO  = require('../dto/auth.dto');

// Importation des modules nécessaires pour interagir avec la base de données et gérer les JWT
const db = require('../Models');
const jwt = require('jsonwebtoken');

// Service d'authentification 
const authService = {

    // Vérification de l'existence d'un utilisateur avec le login spécifié dans la db
    exist: async (login) => {
        // Recherche d'un enregistrement dans le modèle "Auth" avec le login spécifié
        const auth = await db.Auth.findOne({
            where: { login }
        });

        // Création d'une nouvelle instance de "authDTO" basée sur l'enregistrement trouvé
        return new authDTO(auth);
    },

    // Insèrtion d'un nouvel enregistrement d'authentification dans la db
    insert: async (data) => {
        // Création d'un nouvel enregistrement dans le modèle "Auth" avec les données fournies
        const auth = await db.Auth.create(data);

        // Création d'une nouvelle instance de "authDTO" basée sur l'enregistrement créé
        return new authDTO(auth);
    },

    // Association  d'un JWT à un utilisateur 
    addJwt: async (jwt, id) => {
        // Vérification de l'existence de l'utilisateur avec l'ID spécifié
        const userFound = await db.Auth.findOne({
            where: { id }
        });

        // Si l'utilisateur existe, mise à jour de son enregistrement avec le JWT fourni
        await userFound.update({ jwt });

        // Retour de l'enregistrement utilisateur mis à jour
        return userFound;
    },

    // Récupère le JWT associé à un utilisateur en fonction de son ID
    getJwt: async (id) => {
        // Recherche de l'enregistrement utilisateur avec l'ID spécifié
        const jwtExist = await db.Auth.findOne({
            where: { id }
        });

        // Retour du JWT associé à l'utilisateur trouvé
        return jwtExist;
    },

    // Vérification de la validité d'un JWT en utilisant la clé secrète spécifiée dans les variables d'environnement
    verifyJwt: async (token) => {
        // Récupération de la clé secrète JWT depuis les variables d'environnement
        const secret = process.env.JWT_SECRET;

        try {
            // Tentative de décodage du JWT avec la clé secrète
            const decoded = jwt.verify(token, secret);
            
            // Si le décodage est réussi, retourne vrai
            return true;
        } catch (err) {
            // En cas d'erreur lors de la vérification, retourne faux
            return false;
        }
    }
};

module.exports = authService;
