// Importation du module Router d'Express
const router = require("express").Router();

// Importation des routes spécifiques pour chaque fonctionnalité
const authMiddleware = require("../middleware/authMiddleware");
const authRouter = require("./auth.router");
const bookToReadRouter = require("./bookToRead.router");
const bookToBuyRouter = require("./bookToBuy.router");
const ReadLibraryRouter = require("./ReadLibrary.router");

router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

// Utilisation du middleware d'authentification pour toutes les routes liées aux livres à acheter
router.use(authMiddleware.isAuthenticated);

//Utilisation des routes spécifiques avec des préfixes pour créer des chemins complets
router.use("/auth", authRouter);
router.use("/bookToRead", bookToReadRouter);
router.use("/bookToBuy", bookToBuyRouter);
router.use("/ReadLibrary", ReadLibraryRouter);

module.exports = router;
