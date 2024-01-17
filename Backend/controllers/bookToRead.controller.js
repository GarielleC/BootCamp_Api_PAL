const { Book } = require("../Models");

const bookToReadController = {
    // Renvoie tous les livres
    getAllBook: function (req, res, next) {
        return async (req, res, next) => {
        try {
            // On récupère tous les livres
            // const books = await Book.find();
            const booksToRead = await BookToRead.find({ where:{statut:'à lire'}});

            // On renvoie les livres en tant que réponse JSON
            res.status(200).json({ booksToRead });
        } catch (error) {
            // Message d'erreur s'il y en a une
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    },

    // Ajoute un nouveau livre à lire
    addBook: function (req, res, next) {
        return async (req, res, next) => {
        try {
            const { title, author, imageUrl } = req.body;
            const newBook = await BookToRead.create({ title, author, imageUrl, statut: 'a lire', });
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    },

    // Renvoie les détails d'un livre spécifique
    getBook: function (req, res, next) {
        return async (req, res, next) => {
        const id = Number(req.params.bookID);
        try {
            const selectedBook = await BookToRead.findByPk(id);

            if (!selectedBook) {
                return res.status(404).send("Book not found");
            }
            res.json(selectedBook);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    },
};

module.exports = bookToReadController;