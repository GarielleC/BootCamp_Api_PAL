const jwt = require("jsonwebtoken");
const authService = require("../services/auth.service");

exports.isAuthenticated = async (req, res, next) => {
    try {
        console.log("Middleware d'authentification en cours...");

        // Récupération du token depuis les en-têtes de la requête
        const token = req.headers["x-access-token"] || req.headers["authorization"];
        console.log("Token extrait de l'en-tête de la requête :", token);

          // Comme le token est préfixé par 'Bearer ', extraction du token proprement
          if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length); // Retire le préfixe 'Bearer '
        }


        // Si aucun token n'est fourni, renvoie une réponse d'erreur avec le statut 403.
        if (!token) {
            console.log("Aucun token fourni. Accès refusé.");
            return res.status(403).json({ message: "Non autorisé" });
        }

        console.log("Utilisateur authentifié. Vérification du JWT en cours...");

        // Décodage du token JWT pour obtenir les informations
        const decodedToken = authService.decodeJwt(token);
        console.log("Contenu du JWT décodé :", decodedToken);

        // Vérification si le token est valide
        if (!decodedToken) {
            console.log("JWT invalide. Accès refusé.");
            return res.status(403).json({ message: "Non autorisé" });
        }

        // Récupération de l'ID de l'utilisateur à partir du JWT décodé
        const userId = authService.getUserIdFromToken(token);
        console.log("Valeur de userId après avoir récupéré l'ID :", userId);

        // Stocker l'ID de l'utilisateur dans req.userId
        req.userId = userId;

        // Vérification du token à l'aide du service d'authentification
        const isValidJwt = await authService.verifyJwt(token);

        // Ajout de ce log pour afficher le contenu du payload
        console.log(
            "Contenu du payload JWT :",
            isValidJwt ? decodedToken : "Invalid JWT",
        );

        if (isValidJwt) {
            console.log("JWT valide.");

            // Vérification de l'expiration du token JWT
            if (!authService.isJwtExpired(token)) {
                console.log("Le token JWT n'a pas expiré.");

                // Poursuivre le flux de contrôle
                return next();
            } else {
                console.log(
                    "Le token JWT a expiré. Tentative de renouvellement du jeton...",
                );

                // Générer un nouveau jeton JWT
                const newToken = authService.generateNewToken(userId);
                console.log("Nouveau token JWT généré :", newToken); 

                // Mettre à jour le token dans la base de données
                await authService.addJwt(newToken, userId);

                // Stocker le nouveau jeton dans req.token pour une utilisation ultérieure
                req.token = newToken;
                console.log("Token mis à jour dans la base de données :", newToken);

                // Poursuivre le flux de contrôle
                return next();
            }
        } else {
            console.log("JWT invalide. Accès refusé.");
            return res.status(403).json({ message: "Non autorisé" });
        }
    } catch (err) {
        console.error("Erreur dans le middleware d'authentification :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

