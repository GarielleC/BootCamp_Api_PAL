// Importations
const bookToBuyController = require('../controllers/bookToBuy.controller');
const multer = require('multer');
const bookToBuyRouter = require('express').Router(); 
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
    .post(upload.single('imageUrl'), bookToBuyController.createBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

//Route pour mise à jour du livre
bookToBuyRouter.route('/update/:bookID')
    .put(bookToBuyController.updateBook)
    .all((req, res) => {
    res.status(405).send('Unavailable');
});

module.exports = bookToBuyRouter;