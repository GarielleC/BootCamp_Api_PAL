//Importations
const authController = require('../Controllers/auth.controller');
const authRouter = require('express').Router(); //Permet de crée une nouvelle instance de routeur Express et la stocke dans la variable authRouter


authRouter.route('/login')
    .post(authController.login)
    .all((res, req) => {
        res.statusCode(405).send('Unavailable')
    });

    authRouter.route('/register')
    .post(authController.register)
    .all((res, req) => {
        res.statusCode(405).send('Unavailable')
    });

module.exports = authRouter;