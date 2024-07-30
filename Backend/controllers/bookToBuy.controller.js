const { Book } = require("../models");
const { isAuthenticated } = require("../middleware/authMiddleware.js");

const bookToBuyController = {
    // Renvoie tous les livres à acheter
    getAllBook: async (req, res, next) => {
        try {
            const userId = req.userId; // Accès à l'ID de l'utilisateur
            console.log("UserId in getAllBook:", userId);

            if (!userId) {
                return res.status(401).json({
                    error: "L'ID de l'utilisateur est manquant dans la requête",
                });
            }

            const bookToBuy = await Book.findAll({
                where: { userId: userId, statut: "a acheter" },
            });

            // On renvoie les livres à acheter à la réponse JSON
            res.status(200).json(bookToBuy);
        } catch (error) {
            // Message d'erreur s'il y en a une lors de la recherche des livres
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Création d'un nouveau livre à acheter
    createBook: async (req, res, next) => {
        try {
            // Extraire les informations de l'utilisateur de la requête ou du jeton d'authentification
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({
                    error: "L'ID de l'utilisateur est manquant dans la requête",
                });
            }

            const { title, author, prix, buyLink } = req.body;
            const imageUrl = req.file ? req.file.filename : null; // Utilisation du nom du fichier uploadé

            const newBook = await Book.create({
                userId: userId,
                title,
                author,
                statut: "a acheter",
                prix,
                buyLink,
                imageUrl,
            });
            console.log(newBook);
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create book" });
        }
    },

    // Renvoie les détails d'un livre spécifique à acheter
    getBook: async (req, res, next) => {
        const bookID = Number(req.params.bookID);
        try {
            const userId = req.userId;
            console.log("UserId in getBook:", userId);

            if (!userId) {
                return res.status(401).json({
                    error: "L'ID de l'utilisateur est manquant dans la requête",
                });
            }

            // Recherche du livre spécifié par son ID et qui est marqué comme "à acheter"
            const selectedBook = await Book.findOne({
                where: { id: bookID, userId: userId, statut: "a acheter" },
            });

            if (!selectedBook) {
                return res
                    .status(404)
                    .send("Le livre spécifié est soit acheter soit inexistant");
            }
            res.json(selectedBook);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // Suppression d'un livre spécifique à acheter
    deleteBook: async (req, res, next) => {
        const id = Number(req.params.bookID);
        try {
            const book = await Book.findByPk(id);

            if (!book) {
                return res.status(404).send("Book not found");
            }

            // Vérifier si l'utilisateur est autorisé à supprimer le livre
            if (book.userId !== req.userId) {
                return res
                    .status(403)
                    .json({ error: "Non autorisé à supprimer ce livre" });
            }

            await book.destroy();
            res.status(200).json({ message: "Le livre a été supprimé avec succès !" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Mise à jour de tous les livres ou l'ont note les ids dans un tableau
    updateUserId: async (req, res, next) => {
        try {
            const { bookIDs } = req.body; // Récupérer les IDs des livres depuis le corps de la requête
            const newUserId = 13; // Nouvel userId auquel vous voulez mettre à jour

            // Vérifier si les IDs des livres sont présents dans la requête
            if (!bookIDs || !Array.isArray(bookIDs)) {
                return res.status(400).json({
                    error: "Les IDs des livres doivent être fournis dans un tableau",
                });
            }

            // Boucle sur chaque ID de livre et met à jour l'userID
            for (const bookID of bookIDs) {
                const book = await Book.findByPk(bookID); // Trouver le livre par son ID

                if (!book) {
                    console.error("Livre non trouvé pour l'ID :", bookID);
                    continue; // Passer au prochain livre si le livre n'est pas trouvé
                }

                // Mettre à jour l'userID du livre
                await book.update({ userId: newUserId });
            }

            res.status(200).json({
                message: "Les livres ont été mis à jour avec succès",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to update book userId" });
        }
    },

    // Mise a jour d'un livre (statut)
    updateBook: async (req, res, next) => {
        try {
            const bookID = req.params.bookID; // Récupérer l'ID du livre depuis les paramètres de la requête
            const book = await Book.findByPk(bookID); // Trouver le livre par son ID

            if (!book) {
                return res.status(404).json({ error: "Book not found" });
            }

            const updatedBook = await book.update({ statut: "a lire" }); // Mettre à jour le statut

            res.status(200).json(updatedBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to update book status" });
        }
    },
    //     // Mise à jour d'un livre (userId)
    // updateBookUserId: async (req, res, next) => {
    //     try {
    //         const bookID = req.params.bookID; // Récupérer l'ID du livre depuis les paramètres de la requête
    //         const newUserId = 13; // Nouveau userId auquel vous voulez mettre à jour

    //         const book = await Book.findByPk(bookID); // Trouver le livre par son ID

    //         if (!book) {
    //             return res.status(404).json({ error: "Book not found" });
    //         }

    //         const updatedBook = await book.update({ userId: newUserId }); // Mettre à jour le userId

    //         res.status(200).json(updatedBook);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: "Failed to update book userId" });
    //     }
    // },
};

module.exports = bookToBuyController;

// const { Book } = require("../models");
// const { isAuthenticated } = require("../middleware/authMiddleware.js");

// const bookToBuyController = {
//     // Renvoie tous les livres à acheter
//     getAllBook: async (req, res, next) => {
//         try {
//             // Utilisation du middleware isAuthenticated pour vérifier l'authentification
//             isAuthenticated(req, res, async () => {
//                 try {
//                     const userId = req.userId;
//                     console.log("UserId in getAllBook:", userId);

//                     if (!userId) {
//                         return res.status(401).json({
//                             error: "L'ID de l'utilisateur est manquant dans la requête",
//                         });
//                     }

//                     const bookToBuy = await Book.findAll({
//                         where: { userId: userId, statut: "a acheter" },
//                     });
//                     // On renvoie les livres à acheter à la réponse JSON
//                     res.status(200).json(bookToBuy);
//                 } catch (error) {
//                     // Message d'erreur s'il y en a une lors de la recherche des livres
//                     console.error(error);
//                     res.status(500).json({ error: error.message });
//                 }
//             });
//         } catch (error) {
//             // Gestion d'une erreur au niveau du middleware isAuthenticated
//             console.error(error);
//             res.status(500).json({ error: error.message });
//         }
//     },

//     // Création d'un nouveau livre à acheter
//     createBook: async (req, res, next) => {
//         try {
//             // Extraire les informations de l'utilisateur de la requête ou du jeton d'authentification
//             const userId = req.userId;
//             if (!userId) {
//                 return res.status(401).json({
//                     error: "L'ID de l'utilisateur est manquant dans la requête",
//                 });
//             }

//             const { title, author, prix, buyLink } = req.body;
//             const imageUrl = req.file ? req.file.filename : null; // Utilisation du nom du fichier uploadé

//             const newBook = await Book.create({
//                 userId: userId,
//                 title,
//                 author,
//                 statut: "a acheter",
//                 prix,
//                 buyLink,
//                 imageUrl,
//             });
//             console.log(newBook);
//             res.status(201).json(newBook);
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: "Failed to create book" });
//         }
//     },

//     // Renvoie les détails d'un livre spécifique à acheter
//     getBook: async (req, res, next) => {
//         const id = Number(req.params.bookID);
//         try {
//             const selectedBook = await Book.findByPk(id);

//             if (!selectedBook) {
//                 return res.status(404).send("Book not found");
//             }
//             res.json(selectedBook);
//         } catch (error) {
//             res.status(500).send({ error: error.message });
//         }
//     },

//     // Suppression d'un livre spécifique à acheter
//     deleteBook: async (req, res, next) => {
//         const id = Number(req.params.bookID);
//         try {
//             const book = await Book.findByPk(id);

//             if (!book) {
//                 return res.status(404).send("Book not found");
//             }

//             // Vérifier si l'utilisateur est autorisé à supprimer le livre
//             if (book.userId !== req.userId) {
//                 return res
//                     .status(403)
//                     .json({ error: "Non autorisé à supprimer ce livre" });
//             }

//             await book.destroy();
//             res.status(200).json({ message: "Book deleted" });
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     // Mise à jour de tous les livres ou l'ont note les ids dans un tableau
//     updateUserId: async (req, res, next) => {
//         try {
//             const { bookIDs } = req.body; // Récupérer les IDs des livres depuis le corps de la requête
//             const newUserId = 13; // Nouvel userId auquel vous voulez mettre à jour

//             // Vérifier si les IDs des livres sont présents dans la requête
//             if (!bookIDs || !Array.isArray(bookIDs)) {
//                 return res
//                     .status(400)
//                     .json({
//                         error: "Les IDs des livres doivent être fournis dans un tableau",
//                     });
//             }

//             // Boucle sur chaque ID de livre et met à jour l'userID
//             for (const bookID of bookIDs) {
//                 const book = await Book.findByPk(bookID); // Trouver le livre par son ID

//                 if (!book) {
//                     console.error("Livre non trouvé pour l'ID :", bookID);
//                     continue; // Passer au prochain livre si le livre n'est pas trouvé
//                 }

//                 // Mettre à jour l'userID du livre
//                 await book.update({ userId: newUserId });
//             }

//             res.status(200).json({
//                 message: "Les livres ont été mis à jour avec succès",
//             });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: "Failed to update book userId" });
//         }
//     },

//     // Mise a jour d'un livre (statut)
//     updateBook: async (req, res, next) => {
//         try {
//             const bookID = req.params.bookID; // Récupérer l'ID du livre depuis les paramètres de la requête
//             const book = await Book.findByPk(bookID); // Trouver le livre par son ID

//             if (!book) {
//                 return res.status(404).json({ error: "Book not found" });
//             }

//             const updatedBook = await book.update({ statut: "a lire" }); // Mettre à jour le statut

//             res.status(200).json(updatedBook);
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: "Failed to update book status" });
//         }
//     },
//     //     // Mise à jour d'un livre (userId)
//     // updateBookUserId: async (req, res, next) => {
//     //     try {
//     //         const bookID = req.params.bookID; // Récupérer l'ID du livre depuis les paramètres de la requête
//     //         const newUserId = 13; // Nouveau userId auquel vous voulez mettre à jour

//     //         const book = await Book.findByPk(bookID); // Trouver le livre par son ID

//     //         if (!book) {
//     //             return res.status(404).json({ error: "Book not found" });
//     //         }

//     //         const updatedBook = await book.update({ userId: newUserId }); // Mettre à jour le userId

//     //         res.status(200).json(updatedBook);
//     //     } catch (error) {
//     //         console.error(error);
//     //         res.status(500).json({ error: "Failed to update book userId" });
//     //     }
//     // },
// };

// module.exports = bookToBuyController;
