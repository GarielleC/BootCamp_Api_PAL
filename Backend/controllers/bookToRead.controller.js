const { Book } = require("../Models");

const bookToReadController = {
    // Renvoie tous les livres
    getAllBook: async (req, res, next) => {
        try {
            // On récupère tous les livres
            const bookToRead = await Book.findAll({ where:{statut:'a lire'}});

            // On renvoie les livres en tant que réponse JSON
            res.status(200).json(bookToRead);
        } catch (error) {
            // Message d'erreur s'il y en a une
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Ajoute un nouveau livre à lire
    addBook: async (req, res, next) => {
        try {
            const { title, author, prix, buyLink, imageUrl } = req.body;
            const newBook = await Book.create({ title, author, statut:"a lire", prix, buyLink, imageUrl });
            console.log(newBook);
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create book" });
        }
    },

    // Renvoie les détails d'un livre spécifique
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
            const book = await Book.findByPk(bookID); // Trouver le livre par son ID
     
            if (!book) {
                return res.status(404).json({ error: "Book not found" });
            }
     
            const updatedBook = await book.update({ statut: "lu" }); // Mettre à jour le statut
     
            res.status(200).json(updatedBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to update book status" });
        }
    },
};

module.exports = bookToReadController;