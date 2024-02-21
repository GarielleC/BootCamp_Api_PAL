//Importations
const ReadLibraryController = require('../controllers/ReadLibrary.controller');
const multer = require('multer');
const ReadLibraryRouter = require('express').Router();
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
    .post(upload.single('imageUrl'),
    ReadLibraryController.addBook)
    .all((req, res) => {
        res.status(405).send('Unavailable');
    });

    // Route pour supprimer un livre
ReadLibraryRouter.route('/delete/:bookID')
.delete(ReadLibraryController.deleteBook)
.all((req, res) => {
res.status(405).send('Unavailable');
});

//Route pour mise à jour du livre
ReadLibraryRouter.route('/update/:bookID')
.put(ReadLibraryController.updateBook)
.all((req, res) => {
res.status(405).send('Unavailable');
});


module.exports = ReadLibraryRouter;