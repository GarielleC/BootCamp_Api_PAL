// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const authService = require("../services/auth.service");

// const authController = {
//     register: async (req, res) => {
//         try {
//              // Récupération des données d'authentification de la requête
//             const authData = req.body;

//                   // Hashage du mot de passe
//             const hashedPassword = await bcrypt.hash(authData.password, 10);

//              // Création d'un objet userData contenant les informations de l'utilisateur
//             const userData = {
//                 login: authData.login,
//                 name: authData.name,
//                 prenom: authData.prenom,
//                 email: authData.email,
//                 rue: authData.rue,
//                 codePostal: authData.codePostal,
//                 dateNaissance: authData.dateNaissance,
//                 pays: authData.pays,
//                 ville: authData.ville,
//                 genre: authData.genre,
//                 hashedPassword: hashedPassword,
//                 profileImagePath: req.file ? req.file.path : null,
//             };

//              // Génération d'un token JWT initial avec le login de l'utilisateur
//             const preliminaryPayload = {
//                 login: authData.login,
//             };
//             const token = generateJwtToken(preliminaryPayload);

//             // Ajout du token JWT à l'objet userData
//             userData.jwt = token;

//             //  Insertion de l'utilisateur dans la db
//             const userInserted = await authService.insert(userData);

//               // Vérification si l'insertion a réussi
//             if (userInserted) {
//                 // Configuration de l'en-tête de la réponse avec le token JWT
//                 res.setHeader("Authorization", `Bearer ${token}`);
//                 // Réponse avec l'utilisateur inséré et le token JWT
//                 return res.status(201).json({ user: userInserted, token });
//             } else {
//                 // Si insertion échoué, renvoie d'une erreur
//                 return res
//                     .status(500)
//                     .json({ message: "Erreur lors de l'insertion des données" });
//             }
//         } catch (validationError) {
//             handleControllerError(res, validationError);
//         }
//     },

//     login: async (req, res) => {
//         try {
//             const { login, password } = req.body;

//             // Recherche de l'utilisateur par login
//             const user = await authService.exist(login);

//             // Vérification si l'utilisateur existe
//             if (!user) {
//                 return res.status(401).json({ message: "Utilisateur non trouvé" });
//             }

//             // Vérification du mot de passe
//             const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
//             if (!passwordMatch) {
//                 return res.status(401).json({ message: "Mot de passe incorrect" });
//             }

//             // // Génère le token JWT avec les informations pertinentes
//             // const token = generateJwtToken({ login: user.login });
//             // const token = generateJwtToken({ userId: user.id, login: user.login });

//             // // Ajoute le token JWT à l'utilisateur dans la base de données
//             // await authService.addJwt(token, user.id);

//             // Récupérer le token à partir des données de l'utilisateur dans la base de données
//             const token = user.jwt;

//             // Vérification si le token existe
//             if (!token) {
//                 return res
//                     .status(401)
//                     .json({ message: "Token de l'utilisateur non trouvé" });
//             }

//             // Définit le jeton JWT dans l'en-tête de la réponse
//             res.setHeader("Authorization", `Bearer ${token}`);
//             return res.status(200).json({ token });
//         } catch (error) {
//             handleControllerError(res, error);
//         }
//     },

//     getUserAccount: async (req, res) => {
//         try {
//             // Obtient l'Id de l'utilisateur à partir de la requ^te
//             const userId = req.userId;

//             // Recherche de l'utilisateur dans la db
//             const user = await authService.findUserById(userId);

//             // Verification si l'utilisateur existe
//             if (!user) {
//                 return res.status(404).json({ message: "Utilisateur non trouvé" });
//             }

//             // Si l'utilisateur est trouvé, sélectionne les informations de base à renvoyer
//             const userAccount = {
//                 id: user.id,
//                 login: user.login,
//                 email: user.email,
//             };

//             // Réponds avec les informations de compte de l'utilisateur et un code de statut 200
//             res.status(200).json(userAccount);
//         } catch (error) {
//             // En cas d'erreur pendant le traitement, renvoie une réponse avec un code de statut 500
//             // et un message d'erreur interne du serveur
//             handleControllerError(res, error);
//         }
//     },
// };

// module.exports = authController;

// // Fonction pour générer un token JWT avec un payload donné
// function generateJwtToken(payload) {
//     // Vérifie si un payload est fourni
//     if (!payload) {
//         // Lance une erreur si aucun payload n'est fourni
//         throw new Error("Le payload pour le JWT est manquant!");
//     }

//     // Récupère le secret JWT depuis les variables d'environnement
//     const secret = process.env.JWT_SECRET;
//     // Vérifie si le secret JWT est défini
//     if (!secret) {
//         // Lance une erreur si le secret JWT n'est pas défini
//         throw new Error("Le secret JWT est indéfini!");
//     }

//     // Options pour la création du token JWT
//     const options = {
//         // Durée de validité du token : 30 jours
//         expiresIn: "30d",
//     };

//     // Génère le token JWT avec le payload, le secret et les options spécifiées
//     return jwt.sign(payload, secret, options);
// }

// function handleControllerError(res, error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur interne du serveur" });
// }
