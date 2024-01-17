const { ReadLibrary } = require("../Models");

const readLibraryController = {
    // Récupérer tous les livres de la bibliothèque de lecture
    getAllBooks: function (req, res, next) {
        return async (req, res, next) => {
        try {
            const readBooks = await ReadLibrary.findAll();
            res.status(200).json(readBooks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    },

    // Ajouter un nouveau livre à la bibliothèque de lecture
    addBook: function (req, res, next) {
        return async (req, res, next) => {
        try {
            const { title, author, imageUrl } = req.body;
            const newBook = await ReadLibrary.create({ title, author, imageUrl });
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    },

    // Récupérer un livre spécifique de la bibliothèque de lecture
    getBook:function (req, res, next) {
        return async (req, res, next) => {
        try {
            const id = Number(req.params.bookID);
            const book = await ReadLibrary.findByPk(id);

            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    },

    // Mettre à jour un livre dans la bibliothèque de lecture
    updateBook: function (req, res, next) {
        return async (req, res, next) => {
        try {
            const bookId = Number(req.params.bookID);
            const { title, author, imageUrl } = req.body;
            const book = await ReadLibrary.findByPk(bookId);
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }

            await book.update({ title, author, imageUrl });
            res.status(200).json({ message: "Book updated" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    },

    // Supprimer un livre de la bibliothèque de lecture
    deleteBook:function (req, res, next) {
        return async (req, res, next) => {
        try {
            const bookId = Number(req.params.bookID);
            const book = await ReadLibrary.findByPk(bookId);

            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }

            await book.destroy();
            res.status(200).json({ message: "Book deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    },
    
};

module.exports = readLibraryController;
