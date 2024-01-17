
// Importation du module Router d'Express
const router = require('express').Router();

// Importation des routes spécifiques pour chaque fonctionnalité
// const authRouter = require('./auth.router');
const bookRouter = require('./book.router');
const bookToReadRouter = require('./bookToRead.router');
const bookToBuyRouter = require('./bookToBuy.router');
const ReadLibraryRouter = require('./ReadLibrary.router');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });
   
//Utilisation des routes spécifiques avec des préfixes pour créer des chemins complets
router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/bookToRead', bookToReadRouter);
router.use('/bookToBuy', bookToBuyRouter);
router.use('/ReadLibrary', ReadLibraryRouter);




module.exports = router;