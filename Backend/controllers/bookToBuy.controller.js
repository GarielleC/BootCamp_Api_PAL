const { BookToBuy } = require("../Models");

const bookToBuyController = {
    // Renvoie tous les livres à acheter
    getAllBook: function (req, res, next) {
        return async (req, res, next) => {
        try {
            const booksToBuy = await BookToBuy.findAll();
            res.status(200).json(booksToBuy);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    },

    // Création d'un nouveau livre à acheter
    createBook:function (req, res, next) {
        return async (req, res, next) => {
        try {
            const { title, author, prix, buyLink, imageUrl } = req.body;
            const newBook = await BookToBuy.create({
                title,
                author,
                prix,
                buyLink,
                imageUrl,
            });
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create book" });
        }
    }
    },
    // Renvoie les détails d'un livre spécifique à acheter
    getBook: function (req, res, next) {
        return async (req, res, next) => {
        const id = Number(req.params.bookID);
        try {
            const selectedBook = await BookToBuy.findByPk(id);

            if (!selectedBook) {
                return res.status(404).send("Book not found");
            }
            res.json(selectedBook);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    },

    // Suppression d'un livre spécifique à acheter
    deleteBook:function (req, res, next) {
        return async (req, res, next) => {
        const id = Number(req.params.bookID);
        try {
            const book = await BookToBuy.findByPk(id);

            if (!book) {
                return res.status(404).send("Book not found");
            }

            await book.destroy();
            res.status(200).json({ message: "Book deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    },
};

module.exports = bookToBuyController;