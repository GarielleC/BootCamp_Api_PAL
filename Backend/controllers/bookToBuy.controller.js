const db = require('../Models');
const { BookToBuy } = require('../Models/BookToBuy.model');

const bookToBuyController = {
    // Renvoie tous les produits 
    getAllBook: (req, res) => {
        // Note : Utilisez db.BookToBuy au lieu de book
        res.json(db.BookToBuy); 
    },

    // Création d'un nouveau livre
    createBook: async (req, res) => {
        try {
            // Récupération du livre depuis le corps de la requête
            const { title, author, prix, buyLink, imageUrl } = req.body;

            // Création d'un nouveau livre dans la DB 
            const newBook = await db.BookToBuy.create({
                title,
                author,
                prix,
                buyLink,
                imageUrl,
            });

            // Renvoi du nouveau livre en tant que réponse JSON
            res.status(201).json(newBook);
        } catch (error) {
            // Message d'erreur si la réponse JSON ne fonctionne pas
            console.error(error);
            res.status(500).json({ error: 'Failed to create book' });
        }
    },
    
    addBook: async (req, res) => {
        try {
            const { title, author, prix, buyLink, imageUrl } = req.body;
            console.log(title, author, prix, buyLink, imageUrl);

            // Utilisez db.BookToBuy au lieu de BookToBuy
            const newBook = await db.BookToBuy.create({
                title,
                author,
                prix,
                buyLink,
                imageUrl,
            });

            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // Renvoie les détails d'un produit spécifique 
    getBook: (req, res) => {
        const id = Number(req.params.bookID);
        // Utilisez db.BookToBuy au lieu de book
        const selectedBook = db.BookToBuy.find(book => book.id === id);

        if (!selectedBook) {
            return res.status(404).send('Book not found');
        }
        res.json(selectedBook);
    },

    // Suppression d'un produit spécifique 
    deleteBook: (req, res) => {
        const id = Number(req.params.bookID);
        // Utilisez db.BookToBuy au lieu de book
        const index = db.BookToBuy.findIndex(book => book.id === id);

        if (index === -1) {
            return res.status(404).send('Book not found');
        }

        // Utilisez db.BookToBuy au lieu de book
        db.BookToBuy.splice(index, 1);
        res.status(200).json('Book deleted');
    },
};

module.exports = bookToBuyController;