const { Book } = require("../models");

const readLibraryController = {
    // Récupérer tous les livres de la bibliothèque de lecture
    getAllBook: async (req, res, next) => {
        try {
            const userId = req.userId; // Accès à l'ID de l'utilisateur
            console.log("UserId in getAllBook:", userId);

            if (!userId) {
                return res.status(401).json({
                    error: "L'ID de l'utilisateur est manquant dans la requête",
                });
            }

            const ReadLibrary = await Book.findAll({ where:{ userId: userId,statut:'lu' }});

            res.status(200).json(ReadLibrary);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Ajouter un nouveau livre à la bibliothèque de lecture
    addBook:  async (req, res, next) => {
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
                statut:"lu", 
                prix, buyLink,
                 imageUrl
                 });

            console.log(newBook);
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create book" });
        }
    },

    // Récupérer un livre spécifique de la bibliothèque de lecture
    getBook:async (req, res, next) => {
        const bookID = Number(req.params.bookID);
        try {
            const userId = req.userId;
            console.log("UserId in getBook:", userId);

            if (!userId) {
                return res.status(401).json({
                    error: "L'ID de l'utilisateur est manquant dans la requête",
                });
            }

            // Recherche du livre spécifié par son ID et qui est marqué comme "lu"
            const selectedBook = await Book.findOne({
                where: { id: bookID, userId: userId, statut: "lu" },
            });

            if (!selectedBook) {
                return res.status(404).send("Book not found");
            }
            res.json(selectedBook);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // Suppression d'un livre spécifique à acheter
    deleteBook:async (req, res,next) =>{
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

       // Mise a jour d'un livre (statut)
       updateBook: async (req, res, next) => {
        try {
            const bookID = req.params.bookID; // Récupérer l'ID du livre depuis les paramètres de la requête
            const { statut } = req.body;
            const book = await Book.findByPk(bookID); // Trouver le livre par son ID
     
            if (!book) {
                return res.status(404).json({ error: "Book not found" });
            }
     
            const updatedBook = await book.update({ statut }); // Mettre à jour le statut
     
            res.status(200).json(updatedBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Mise à jour du livre échoué" });
        }
    }, 
};

module.exports = readLibraryController;
