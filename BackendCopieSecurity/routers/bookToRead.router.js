//Importations
const bookToReadController = require('../controllers/bookToRead.controller');
const multer = require('multer');
const bookToReadRouter = require('express').Router(); 
const path = require('path');

// Gestion des images fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/images');
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

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
    .post(upload.single('imageUrl'),
    bookToReadController.addBook)
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