//Importations
const bookToReadController = require('../controllers/bookToRead.controller');
const bookToReadRouter = require('express').Router(); //Permet de créer une nouvelle instance de routeur Express et la stock dans la variable productRouter

//Route pour récupérer tous les livres
bookToReadRouter.route('/getAll')
    .get(bookToReadController.getAllBook) // get() permet de récupérer les livres
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });
 
//Route pour récupérer un livre
bookToReadRouter.route('/get/:bookID')
    .get(bookToReadController.getBook) // get() permet de récupérer les livres
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

//Route pour ajouter un livre
bookToReadRouter.route('/add')
    .post(bookToReadController.addBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

    // Route pour supprimer un livre
bookToReadRouter.route('/delete/:bookID')
    .delete(bookToReadController.deleteBook)
    .all((req, res) => {
    res.status(405).send('Unavailable');
});
//Route pour mise à jour du livre
bookToReadRouter.route('/update/:bookID')
    .put(bookToReadController.updateBook)
    .all((req, res) => {
    res.status(405).send('Unavailable');
});


module.exports = bookToReadRouter;