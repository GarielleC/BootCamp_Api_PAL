// Importations
const express = require("express");
const router = express.Router();

const bookToBuyController = require("../controllers/bookToBuy.controller");
const multer = require("multer");
const path = require("path");
const { isAuthenticated } = require("../middleware/authMiddleware");

// Gestion des images fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

//Utilisation du middleware ici pour toutes les routes liées à l'achat de livres
// bookToBuyRouter.use(authMiddleware.isAuthenticated);
router.use(isAuthenticated);

// Route pour récupérer tous les livres
router
    .route("/getAll")
    // bookToBuyRouter.route('/getAll/:userId')
    .get(bookToBuyController.getAllBook)
    .all((req, res) => {
        res.status(405).send("Unavailable");
    });

// Route pour récupérer un livre
router
    .route("/get/:bookID")
    .get(bookToBuyController.getBook)
    .all((req, res) => {
        res.status(405).send("Unavailable");
    });

// Route pour supprimer un livre
router
    .route("/delete/:bookID")
    .delete(bookToBuyController.deleteBook)
    .all((req, res) => {
        res.status(405).send("Unavailable");
    });

// Route pour créer un livre
router
    .route("/create")
    .post(upload.single("imageUrl"), bookToBuyController.createBook)
    .all((req, res) => {
        res.status(405).send("Unavailable");
    });

//Route pour mise à jour du livre
router
    .route("/update/:bookID")
    .put(bookToBuyController.updateBook)
    .all((req, res) => {
        res.status(405).send("Unavailable");
    });
// // Nouvelle route pour mettre à jour le userId d'un livre
// router
//     .route("/updateUserId/:bookID")
//     .put(bookToBuyController.updateBookUserId)
//     .all((req, res) => {
//         res.status(405).send("Unavailable");
//     });


// Mise à jour de tous les livres ou l'ont note les ids dans un tableau
router
.route("/updateUser")
.put( bookToBuyController.updateUserId)
.all((req, res) => {
    res.status(405).send("Unavailable");
});


module.exports = router;
