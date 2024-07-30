const { Auth } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Fonction pour enregistrer un nouvel utilisateur
exports.register = async (req, res, next) => {
    try {
        console.log("Requête de création d'utilisateur reçue :", req.body);

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log("Mot de passe hashé avec succès :", hashedPassword);

        const profileImagePath = req.file ? req.file.path : null;

        // Générer un jeton JWT
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
            expiresIn: "31d",
        });

        // Création d'un nouvel utilisateur avec le jeton JWT
        const newUser = await Auth.create({
            genre: req.body.genre,
            profileImagePath: profileImagePath,
            name: req.body.name,
            prenom: req.body.prenom,
            dateNaissance: req.body.dateNaissance,
            codePostal: req.body.codePostal,
            rue: req.body.rue,
            ville: req.body.ville,
            pays: req.body.pays,
            email: req.body.email,
            login: req.body.login,
            hashedPassword: hashedPassword,
            jwt: token,
        });

        console.log("Utilisateur sauvegardé avec succès");

        res.status(201).json({ auth: true, token });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(400).json({ error: error.message });
    }
};

// Fonction pour connecter un utilisateur
exports.login = async (req, res, next) => {
    console.log("Requête de connexion reçue :", req.body);
    try {
        const user = await Auth.findOne({ where: { email: req.body.email } });
        if (!user) {
            console.log("Utilisateur non trouvé pour l'email :", req.body.email);
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.hashedPassword,
        );
        if (!validPassword) {
            console.log(
                "Mot de passe incorrect pour l'utilisateur avec l'email :",
                req.body.email,
            );
            return res.status(401).json({ message: "Votre mot de passe est incorrect" });
        }
        console.log(
            "Connexion réussie pour l'utilisateur avec l'email :",
            req.body.email,
        );

        // Générer un nouveau jeton JWT
        const token = jwt.sign({ email: req.body.email, userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "31d",
        });

        // Mettre à jour le jeton JWT dans la base de données
        await user.update({ jwt: token });

        res.status(200).json({
            userId: user.id,
            token: token,
        });
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour récupérer le profil utilisateur
exports.getUserProfile = async (req, res) => {
    try {
        // Récupérer l'ID utilisateur depuis req.userId (ajouté par le middleware d'authentification)
        const userId = req.userId;

        // Récupérer le profil utilisateur
        const userProfile = await Auth.findOne({ where: { id: userId } });

        if (!userProfile) {
            return res.status(404).json({ message: "Profil utilisateur non trouvé" });
        }

        // Répondre avec les informations de l'utilisateur
        res.status(200).json(userProfile);
    } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

// Fonction pour mettre à jour le profil utilisateur
exports.updateUserProfile = async (req, res) => {
    try {
        // Récupérer l'ID utilisateur depuis req.userId
        const userId = req.userId;

        // Récupérer les données utilisateur à mettre à jour
        const { name, prenom, dateNaissance, codePostal, rue, ville, pays } = req.body;

        // Trouver l'utilisateur à mettre à jour
        const user = await Auth.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Mettre à jour les informations de l'utilisateur
        await user.update({
            name: name || user.name,
            prenom: prenom || user.prenom,
            dateNaissance: dateNaissance || user.dateNaissance,
            codePostal: codePostal || user.codePostal,
            rue: rue || user.rue,
            ville: ville || user.ville,
            pays: pays || user.pays
        });

        res.status(200).json({ message: "Profil mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil utilisateur:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};




// const { Auth } = require("../models");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res, next) => {
//     try {
//         console.log("Requête de création d'utilisateur reçue :", req.body); // Ajouter un journal pour afficher les détails de la requête

//         // Hashage du mot de passe
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         console.log("Mot de passe hashé avec succès :", hashedPassword);

//         const profileImagePath = req.file ? req.file.path : null;

//         // Générer un jeton JWT
//         const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
//             expiresIn: "31d", // Durée de validité du jeton
//         });

//         // Création d'un nouvel utilisateur avec le jeton JWT
//         const newUser = await Auth.create({
//             genre: req.body.genre,
//             profileImagePath: profileImagePath,
//             name: req.body.name,
//             prenom: req.body.prenom,
//             dateNaissance: req.body.dateNaissance,
//             codePostal: req.body.codePostal,
//             rue: req.body.rue,
//             ville: req.body.ville,
//             pays: req.body.pays,
//             email: req.body.email,
//             login: req.body.login,
//             hashedPassword: hashedPassword,
//             jwt: token, // Assigner le jeton JWT à l'utilisateur
//         });

//         console.log("Utilisateur sauvegardé avec succès");

//         res.status(201).json({ auth: true, token }); // Répondre avec le token JWT
//     } catch (error) {
//         console.error("Erreur lors de la création de l'utilisateur :", error);
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.login = async (req, res, next) => {
//     console.log("Requête de connexion reçue :", req.body);
//     try {
//         const user = await Auth.findOne({ where: { email: req.body.email } });
//         if (!user) {
//             console.log("Utilisateur non trouvé pour l'email :", req.body.email);
//             return res.status(401).json({ message: "Utilisateur non trouvé" });
//         }
//         const validPassword = await bcrypt.compare(
//             req.body.password,
//             user.hashedPassword,
//         );
//         if (!validPassword) {
//             console.log(
//                 "Mot de passe incorrect pour l'utilisateur avec l'email :",
//                 req.body.email,
//             );
//             return res.status(401).json({ message: "Votre mot de passe est incorrecte" });
//         }
//         console.log(
//             "Connexion réussie pour l'utilisateur avec l'email :",
//             req.body.email,
//         );

//         // Générer un nouveau jeton JWT
//         const token = jwt.sign({ email: req.body.email,
//             userId: user.id }, process.env.JWT_SECRET, {
//             expiresIn: "31d", // Durée de validité du jeton
//         });

//         // Mettre à jour le jeton JWT dans la base de données
//         await user.update({ jwt: token });

//         res.status(200).json({
//             userId: user.id,
//             token: token,
//         });
//     } catch (error) {
//         console.error("Erreur lors de la connexion de l'utilisateur :", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // const jwt = require('jsonwebtoken');

// // const authService = require('../services/auth.service');

// // const userController = {
// //     getUserAccount: async (req, res, next) => {
// //         try {
// //             // Récupération de l'utilisateur à partir du token JWT
// //             const token = req.headers.authorization.split(" ")[1];
// //             const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
// //             const userId = decodedToken.userId;

// //             // Récupération des informations de l'utilisateur depuis la DB
// //             const userAccount = await authService.getUserAccount(userId);

// //             if (userAccount) {
// //                 // Récupération du JWT associé à l'utilisateur depuis les données utilisateur
// //                 const userJWT = userAccount.jwt;

// //                 return res.status(200).json({ userAccount, userJWT });
// //             } else {
// //                 return res.status(404).json({ message: "Utilisateur non trouvé" });
// //             }
// //         } catch (err) {
// //             console.error(err);
// //             res.status(500).json({ message: "Erreur interne du serveur" });
// //         }
// //     },

// //     updateUserAccount: async (req, res, next) => {
// //         try {
// //             // Récupération des données utilisateur à mettre à jour
// //             const userData = req.body;

// //             // Récupération de l'utilisateur à partir du token JWT
// //             const token = req.headers.authorization.split(" ")[1];
// //             const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
// //             const userId = decodedToken.userId;

// //             // Mise à jour du profil utilisateur dans la DB
// //             const updatedUser = await authService.updateUserAccount(userId, userData);

// //             if (updatedUser) {
// //                 return res.status(200).json({ user: updatedUser });
// //             } else {
// //                 return res.status(404).json({ message: "Utilisateur non trouvé" });
// //             }
// //         } catch (err) {
// //             console.error(err);
// //             res.status(500).json({ message: "Erreur interne du serveur" });
// //         }
// //     },

// //     // Ajouter une méthode pour récupérer le JWT associé à l'utilisateur lors de l'inscription ou de la connexion
// //     getJWT: async (userId) => {
// //         try {
// //             // Récupération des informations de l'utilisateur depuis la DB
// //             const userAccount = await authService.getUserAccount(userId);

// //             if (userAccount) {
// //                 // Récupération du JWT associé à l'utilisateur depuis les données utilisateur
// //                 const userJWT = userAccount.jwt;
// //                 return userJWT;
// //             } else {
// //                 return null;
// //             }
// //         } catch (err) {
// //             console.error(err);
// //             return null;
// //         }
// //     }
// // };

// // module.exports = userController;

// // other test
// // const Auth = require('../models/auth.model'); // Utilisez le modèle Auth au lieu de User
// // const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcrypt");
// // const { Op } = require("sequelize");

// // exports.getAllAuth = async (req, res) => {
// //     try {
// //         const user = await Auth.findAll(); // Utilisez le modèle Auth pour obtenir tous les utilisateurs
// //         res.status(200).json(user);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // exports.register = async (req, res) => {
// //     try {
// //         const { name, email, hashedPassword } = req.body; // Utilisez les champs du modèle Auth

// //         // Vérifier si l'utilisateur existe déjà
// //         const userExists = await Auth.findOne({ where: { email } }); // Utilisez le modèle Auth
// //         if (userExists) {
// //             return res
// //                 .status(400)
// //                 .json({ message: "Un utilisateur avec cet email existe déjà." });
// //         }

// //         // Création de l'utilisateur
// //         const newUser = await Auth.create({ name, email, hashedPassword }); // Utilisez le modèle Auth

// //         // Générer un token JWT
// //         const token = jwt.sign({ id: newUser.userId }, process.env.JWT_SECRET, {
// //             expiresIn: '31d', // 24 heures
// //         });

// //         res.status(201).send({ auth: true, token });
// //     } catch (error) {
// //         console.error("Erreur lors de l'inscription:", error);
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // exports.login = async (req, res) => {
// //     try {
// //         const { login, hashedPassword } = req.body; // Utilisez les champs du modèle Auth

// //         // Trouvez l'utilisateur par email ou login
// //         const user = await Auth.findOne({ // Utilisez le modèle Auth
// //             where: {
// //                 [Op.or]: [{ email: login }, { login }],
// //             },
// //         });

// //         if (!user) {
// //             return res.status(404).json({ message: "Utilisateur non trouvé." });
// //         }

// //         // Vérifiez le mot de passe
// //         const passwordIsValid = bcrypt.compareSync(hashedPassword, user.hashedPassword); // Utilisez les champs du modèle Auth
// //         if (!passwordIsValid) {
// //             return res.status(401).json({
// //                 auth: false,
// //                 token: null,
// //                 message: "Mot de passe invalide.",
// //             });
// //         }

// //         // Si le mot de passe est correct, générez un token
// //         const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
// //             expiresIn: '31d', // expire en 24 heures
// //         });

// //         res.status(200).json({ auth: true, token, user: { name: user.name } });
// //     } catch (error) {
// //         res.status(500).json({ message: "Il y a eu un problème à se connecter." });
// //     }
// // };

// // exports.getUserAccount = async (req, res) => {
// //     try {
// //         const user = await Auth.findByPk(req.userId); // Utilisez le modèle Auth
// //         if (!user) return res.status(404).send({ message: "Utilisateur non trouvé." });

// //         // Sélectionner les informations spécifiques à renvoyer
// //         const userAccount = {
// //             id: user.userId,
// //             name: user.name,
// //             email: user.email,
// //         };

// //         res.status(200).send(userAccount);
// //     } catch (error) {
// //         res.status(500).send({
// //             message: "Erreur lors de la récupération du profil de l'utilisateur.",
// //         });
// //     }
// // };

// // exports.updateUserAccount= async (req, res) => {
// //     try {
// //         const { name, email } = req.body; // Utilisez les champs du modèle Auth
// //         const user = await Auth.findByPk(req.userId); // Utilisez le modèle Auth
// //         if (!user) return res.status(404).send({ message: "Utilisateur non trouvé." });

// //         user.name = name || user.name;
// //         user.email = email || user.email;

// //         await user.save();
// //         res.status(200).send({ message: "Profil mis à jour avec succès." });
// //     } catch (error) {
// //         res.status(500).send({
// //             message: "Erreur lors de la mise à jour du profil de l'utilisateur.",
// //         });
// //     }
// // };
