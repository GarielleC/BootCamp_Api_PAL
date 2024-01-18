const { Book } = require("../Models");

const bookToBuyController = {
    // Renvoie tous les livres à acheter
    getAllBook: async (req, res, next) => {
        try {
             const booksToBuy = await Book.findAll({where:{statut:'a acheter'}});
            //  On renvoie les livres à acheter à la réponse JSON
            res.status(200).json(booksToBuy);
        } catch (error) {
            //Message d'erreur s'il y en a une
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Création d'un nouveau livre à acheter
    createBook: async (req, res,next) =>{
        
        try { 
            const { title, author, prix, buyLink, imageUrl } = req.body;
            const newBook = await Book.create({ title, author,statut:"a acheter", prix, buyLink, imageUrl });
            console.log(newBook);
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create book" });
        }
    },
    // Renvoie les détails d'un livre spécifique à acheter
    getBook: async (req, res,next) =>{
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
    }
};

module.exports = bookToBuyController;