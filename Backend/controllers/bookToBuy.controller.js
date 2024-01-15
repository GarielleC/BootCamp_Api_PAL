const db = require('../Models')
const Book = require('../Models/Book.model');


const bookToBuyController = {
    // Renvoie tous les produits (liste complète)
    getAllBook: (req, res) => {
        res.json(book);
    },

    addBook: async (req, res) => {
        try {
            const { title,author, prix, buyLink, ImageUrl } = req.body;
            console.log(title,author, prix, buyLink, ImageUrl);
            const newBook = await db.BookToBuy.create({ 'title': title, 'author' : author, 'price': price, 'buyLink': buyLink, 'ImageUrl' : imageUrl});
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // Renvoie les détails d'un produit spécifique 
    getBook: (req, res) => {
        const id = Number(req.params.booktID);
        const selectedBook = book.find(book => book.id === id);

        if (!selectedBook) {
            return res.status(404).send('Book not found');
        }
        res.json(selectedBook);
    },

    // Suppression d'un produit spécifique 
    deleteBook: (req, res) => {
        const id = Number(req.params.bookID);
        const index = product.findIndex(book => book.id === id);

        if (index === -1) {
            return res.status(404).send('Book not found');
        }

        product.splice(index, 1);
        res.status(200).json('Book deleted');
    },


    
};

module.exports = bookToBuyController;