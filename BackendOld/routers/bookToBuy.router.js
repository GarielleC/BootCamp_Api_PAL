// Importations
const bookToBuyController = require('../controllers/bookToBuy.controller');
const bookToBuyRouter = require('express').Router(); 

// Route pour récupérer tous les livres
bookToBuyRouter.route('/getAll')
    .get(bookToBuyController.getAllBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

// Route pour récupérer un livre
bookToBuyRouter.route('/get/:bookID')
    .get(bookToBuyController.getBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

// Route pour supprimer un livre
bookToBuyRouter.route('/delete/:bookID')
    .delete(bookToBuyController.deleteBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

// Route pour créer un livre
bookToBuyRouter.route('/create')
    .post(bookToBuyController.createBook) 
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

module.exports = bookToBuyRouter;
