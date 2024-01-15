const db = require('../Models')
const { Book } = require('../Models/Book.model');
const  { BookToRead } = require('../Models/BookToRead.model')


const bookToReadController = {
    // Renvoie tous les produits (liste complète)
    getAllBook: async (req, res) => {
        try {
            // On récupère tous les livres
            const books = await Book.findAll();
            const booksToRead = await BookToRead.findAll();
    
            // On renvoie les livres en tant que réponse JSON
            res.status(200).json({ books, booksToRead });
        } catch (error) {
            // Message d'erreur s'il y en a une
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    

    addBook: async (req, res) => {
        try {
            const { title, author, imageUrl } = req.body;
            console.log(title, author, imageUrl);
            const newBook = await db.BookToRead.create({ 'title': title, 'author': author, 'imageUrl': iamgeUrl });
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // Renvoie les détails d'un produit spécifique 
    getBook: (req, res) => {
        const id = Number(req.params.bookID);
        const selectedBook = book.find(book => book.id === id);

        if (!selectedBook) {
            return res.status(404).send('Book not found');
        }
        res.json(selectedBook);
    },   
};

module.exports = bookToReadController;