//Importations
const bookToBuyController = require('../Backend/controllers/bookToBuy.controller.js');
const bookToBuyRouter = require('express').Router(); //Permet de créer une nouvelle instance de routeur Express et la stock dans la variable productRouter

//Route pour récupérer tous les livres
bookToBuyRouter.route('/getAll')
    .get(bookToBuyController.getAllBook) // get() permet de récupérer les livres
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });
 
//Route pour récupérer un livre
bookToBuyRouter.route('/get/:bookID')
    .get(bookToBuyController.getBook) // get() permet de récupérer les livres
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

//Route pour ajouter un livre
// bookToBuyRouter.route('/add')
//     .post(bookToBuyController.createBook)
//     .all((req, res) => {
//         res.status(405).send('Unavailable');
//     });

//Route pour supprimer un livre
bookToBuyRouter.route('/delete/:bookID')
    .delete(bookToBuyController.deleteBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

//Route pour créer un livre
bookToBuyRouter.route('/create')
    .post(bookToBuyController.createBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

module.exports = bookToBuyRouter;