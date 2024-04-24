//Importations
const express = require("express");
const authRouter = express.Router();
const upload = require("../middleware/uploadConfig");
const loginValidator = require("../validator/login.validator");
const emailValidator = require("../validator/email.validator");
const userCtrl = require("../controllers/userController");

// Post pour l'inscription'
authRouter
    .route("/register")
        .post(
            upload.single("profileImage"),loginValidator,
            emailValidator,
            userCtrl.register, 
        );

//Post pour la connexion
authRouter
    .route("/login")
    .post(userCtrl.login)
    .all((req, res) => {
        res.status(405).send("Method Not Allowed");
    });
    

// app.use(express.json());

// const authController = require("../controllers/auth.controller");
// const loginValidator = require("../validator/login.validator");
// const emailValidator = require("../validator/email.validator");
// const authRouter = require("express").Router();

// const authMiddleware = require("../middleware/authMiddleware");

// authRouter
//     .route("/login")
//     .post(authMiddleware.isAuthenticated,authController.login)
//     .all((req, res) => {
//         res.status(405).send("Method Not Allowed");
//     });

// authRouter
//     .route("/register")
//     .post(
//         upload.single("profileImage"),
//         loginValidator,
//         emailValidator,
//         authController.register,
//     )
//     .all((req, res) => {
//         res.status(405).send("Unavailable");
//     });

// authRouter
//     .route("/renew")
//     .post(authController.renewJwtToken)
//     .all((req, res) => {
//         res.status(405).send("Unavailable");
//     });

module.exports = authRouter;

// //Importations
// const express = require("express");
// const app = express();
// app.use(express.json());
// const authController = require("../controllers/auth.controller");
// const loginValidator = require("../validator/login.validator");
// const emailValidator = require("../validator/email.validator");
// const authRouter = require("express").Router(); //Permet de crée une nouvelle instance de routeur Express et la stocke dans la variable authRouter
// const upload = require("../middleware/uploadConfig");
// const authMiddleware = require("../middleware/authMiddleware");

// authRouter
//     .route("/login")
//     .post(authMiddleware.isAuthenticated,authController.login)
//     .all((req, res) => {
//         res.status(405).send("Method Not Allowed");
//     });

// authRouter
//     .route("/register")
//     .post(
//         upload.single("profileImage"),
//         loginValidator,
//         emailValidator,
//         authController.register,
//     )
//     .all((req, res) => {
//         res.status(405).send("Unavailable");
//     });

// // authRouter
// //     .route("/renew")
// //     .post(authController.renewJwtToken)
// //     .all((req, res) => {
// //         res.status(405).send("Unavailable");
// //     });

// module.exports = authRouter;
