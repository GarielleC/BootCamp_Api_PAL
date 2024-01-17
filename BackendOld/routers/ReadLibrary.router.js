//Importations
const ReadLibraryController = require('../controllers/ReadLibrary.controller');
const ReadLibraryRouter = require('express').Router(); //Permet de créer une nouvelle instance de routeur Express et la stock dans la variable productRouter

//Route pour récupérer tous les livres
ReadLibraryRouter.route('/getAll')
    .get(ReadLibraryController.getAllBook) // get() permet de récupérer les livres
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });
 
//Route pour récupérer un livre
ReadLibraryRouter.route('/get/:bookID')
    .get(ReadLibraryController.getBook) // get() permet de récupérer les livres
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

//Route pour ajouter un livre
ReadLibraryRouter.route('/add')
    .post(ReadLibraryController.addBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });


module.exports = ReadLibraryRouter;