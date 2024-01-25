const { Book } = require("../Models");

const readLibraryController = {
    // Récupérer tous les livres de la bibliothèque de lecture
    getAllBook: async (req, res, next) => {
        try {
            const ReadLibrary = await Book.findAll({ where:{statut:'lu'}});
            res.status(200).json(ReadLibrary);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Ajouter un nouveau livre à la bibliothèque de lecture
    addBook:  async (req, res, next) => {
        try {
            const { title, author, prix, buyLink } = req.body;
            
            const imageUrl = req.file ? req.file.filename : null; // Utilisation du nom du fichier uploadé

            const newBook = await Book.create({ title, author, statut:"lu", prix, buyLink, imageUrl });
            console.log(newBook);
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create book" });
        }
    },

    // Récupérer un livre spécifique de la bibliothèque de lecture
    getBook:async (req, res, next) => {
        const id = Number(req.params.bookID);
        try {
            const selectedBook = await Book.findByPk(id);

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

            await book.destroy();
            res.status(200).json({ message: "Book deleted" });
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
            res.status(500).json({ error: "Failed to update book status" });
        }
    }, 
};

module.exports = readLibraryController;
