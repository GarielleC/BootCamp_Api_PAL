const authDTO = require("../dto/auth.dto");

// Importation des modules nécessaires pour interagir avec la base de données et gérer les JWT
const db = require("../models");
const jwt = require("jsonwebtoken");


// Service d'authentification
const authService = {
    // Fonction pour vérifier si un utilisateur existe avec le login spécifié
    exist: async (Email) => {
        try {
            // Recherche de l'utilisateur dans la base de données
            const auth = await db.Auth.findOne({ where: { Email } });
            // Retourne une instance authDTO si l'utilisateur est trouvé, sinon retourne null
            return auth ? new authDTO(auth) : null;
        } catch (error) {
            console.error("Erreur lors de la recherche de l'utilisateur:", error);
            // En cas d'erreur, lance une nouvelle erreur avec un message approprié
            throw new Error("Erreur lors de la recherche de l'utilisateur");
        }
    },

    // Association  d'un JWT à un utilisateur
    addJwt: async (token, userId) => {
        try {
            // Vérification de l'existence de l'utilisateur avec l'ID spécifié
            const userFound = await db.Auth.findOne({ where: { userId: id } });

            if (!userFound) {
                throw new Error("Utilisateur non trouvé");
            }

            // Si l'utilisateur existe, mise à jour de son enregistrement avec le JWT fourni
            await userFound.update({ jwt: token });

            // Retour de l'enregistrement utilisateur mis à jour
            return userFound;
        } catch (error) {
            console.error("Erreur lors de l'ajout du JWT à l'utilisateur:", error);
            throw new Error("Erreur lors de l'ajout du JWT à l'utilisateur");
        }
    },

    // Récupère le JWT associé à un utilisateur en fonction de son ID
    getJwt: async (userId) => {
        try {
            const user = await db.Auth.findOne({ where: { id: userId } });
            return user ? user.jwt : null;
        } catch (error) {
            console.error(
                "Erreur lors de la récupération du JWT de l'utilisateur:",
                error,
            );
            throw new Error("Erreur lors de la récupération du JWT de l'utilisateur");
        }
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
    },

    // Fonction pour décoder un JWT et retourner son contenu
    decodeJwt: (token) => {
        const secret = process.env.JWT_SECRET;
        try {
            const decoded = jwt.verify(token, secret);
            return decoded;
        } catch (err) {
            console.error("Erreur lors du décodage du JWT :", err);
            return null;
        }
    },
    // Vérification de l'expiration d'un JWT
    isJwtExpired: (token) => {
        const secret = process.env.JWT_SECRET;
        try {
            const decoded = jwt.verify(token, secret);
            const isExpired = Date.now() >= decoded.exp * 1000; // Convertir en millisecondes
            console.log("Le jeton JWT a expiré :", isExpired);
            return isExpired;
        } catch (err) {
            console.error(
                "Erreur lors de la vérification de l'expiration du jeton JWT :",
                err,
            );
            return true; // Si une erreur se produit, supposons que le jeton a expiré
        }
    },
    // Fonction pour générer un nouveau jeton
    generateNewToken: (userId) => {
        console.log("Valeur de userId dans generateNewToken :", userId);
        const payload = { userId: userId };

        console.log("Payload avant la génération du token :", payload);

        const options = { expiresIn: "31d" }; // Nouvelle durée de validité du jeton
        try {
            const token = jwt.sign(payload, secret, options);
            return token;
        } catch (error) {
            console.error("Erreur lors de la génération du nouveau token :", error);
            throw new Error("Erreur lors de la génération du nouveau token");
        }
    },

    // Fonction pour extraire l'ID de l'utilisateur à partir du token JWT
    getUserIdFromToken: (token) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.userId; // Supposons que le JWT contienne l'ID de l'utilisateur sous la clé "userId"
        } catch (error) {
            console.error("Erreur lors de la vérification du token JWT :", error);
            return null;
        }
    },
};

module.exports = authService;
