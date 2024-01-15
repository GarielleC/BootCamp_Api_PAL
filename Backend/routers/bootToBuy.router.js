//Importations
const bookController = require('../Backend/controllers/bookToBuy.controller.js');
const bookRouter = require('express').Router(); //Permet de créer une nouvelle instance de routeur Express et la stock dans la variable productRouter


bookRouter.route('/getAll')
    .get(bookController.getAllBook) // get() permet de récupérer les livres
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });
 
bookRouter.route('/get/:bookID')
    .get(bookController.getBook) // get() permet de récupérer les livres
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

bookRouter.route('/add')
    .post(bookController.createBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });


bookRouter.route('/delete/:bookID')
    .delete(bookController.deleteBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

bookRouter.route('/create')
    .post(bookController.createBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

module.exports = bookRouter;