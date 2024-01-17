const { Book } = require("../Models");

const bookController = {
    // Récupérer tous les livres
    getAllBook:  function (req, res, next) {
        return async (req, res, next) => {
        try {
            const books = await Book.findAll();
            res.status(200).json(books);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    },

    // Récupérer un livre spécifique par son ID
    getBook: function (req, res,next) {
        return async (req, res, next) => {
        try {
            const bookId = Number(req.params.bookID);
            const book = await Book.findByPk(bookId);

            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }

            res.json(book);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    },

    // Créer un nouveau livre
    createBook: function (req, res,next) {
        return async (req, res, next) => {
        try {
            const { title, author, prix, buyLink, imageUrl } = req.body;
            const newBook = await Book.create({ title, author, prix, buyLink, imageUrl });
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create book" });
        }
    }
    },

    // Mettre à jour un livre existant
    updateBook: function (req, res,next) {
        return async (req, res, next) => {
        try {
            const bookId = Number(req.params.bookID);
            const { title, author, prix, buyLink, imageUrl } = req.body;
            const book = await Book.findByPk(bookId);

            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }

            await book.update({ title, author, prix, buyLink, imageUrl });
            res.status(200).json({ message: "Book updated" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    },

    // Supprimer un livre
    deleteBook: function (req, res,next) {
        return async (req, res, next) => {
        try {
            const bookId = Number(req.params.bookID);
            const book = await Book.findByPk(bookId);

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

module.exports = bookController;