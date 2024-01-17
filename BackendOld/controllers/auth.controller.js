
const loginValidator = require('../validator/login.validator');
const EmailValidator = require('../validator/email.validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

const authController = {

    register: async (req, res) => {
        try {
            // Récupération des données utilsateur
            const authData = req.body;

            // Validation les informations récupérées depuis les données utilisateur
            const validatedData = await loginValidator.validate(authData);

            // Destructuring des données vérifées
            const { genre, name, prenom, codePostal, dateNaissance, pays, ville, email, login, password } = validatedData;
            
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Création de l'objet utilisateur à insérer
            const userData = {
                login,
                name,
                prenom,
                email,
                codePostal,
                dateNaissance,
                pays,
                ville,
                genre,
                password: hashedPassword, 
            };

            // Envoi des données validées et hashées à la DB
            const authInserted = await authService.insert(userData);

            if (authInserted) {
                res
                    // Information que l'insertion des données s'est correctement déroulée, et que le compte est crée
                    .status(201)
                    // Redirection des informations utilisateur sur la route login 
                    .location(`api/auth/login`)
                    .json(authInserted)
            } else {
                return res.status(500).json({ message: 'Erreur lors de l\'insertion des données' });
            }
        } catch (validationError) {
            console.error(validationError);
            return res.status(400).json({ message: 'Erreur de validation', errors: validationError.errors });
        }
    },

    login: async (req, res) => {
        try {
            const { login, password } = req.body;

            // Vérification de l'existence de l'utilisateur via son login
            const user = await authService.exist(login);
            if (!user) {
                // Si l'utilisateur n'existe pas, renvoi une réponse 401 (Unauthorized)
                return res.status(401).json({ message: 'Utilisateur non trouvé' })
            }

            // Vérification de l'existence d'un token (jwt) pour cet utilisateur
            const existingToken = await authService.getJwt(user.id);
            if (existingToken.jwt) {
                // Vérification de la validité du token (jwt)
                const tokenValid = await authService.verifyJwt(existingToken.jwt);

                if (tokenValid) {
                    // Le token (jwt) est valide, envoi de l'information dans le header de la requête
                    res.setHeader('Authorization', `Bearer ${existingToken.jwt}`);
                    return res.status(200).json({ token: existingToken.jwt });
                }
            }

            // Vérification du password fourni par l'utilisateur avec le password hashé dans la DB
            const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
            if (!passwordMatch) {
                // Si les mots de passe ne correspondent pas, renvoi une réponse 401 (Unauthorized)
                return res.status(401).json({ message: 'Mot de passe incorrect' })
            }

            // Si les password correspondent, on va créer un token (jwt) pour l'utilisateur
            const payload = {
                userId: user.id,
                login: user.login
            };
            const options = {
                expiresIn: '2d',
            };

            // Signer le token (jwt) avec le SECRET
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, options);

            // Stocker le token (jwt) dans la DB
            const clientJwt = await authService.addJwt(token, user.id);

            if (clientJwt) {
                // Si l'insertion s'est correctement déroulée, on envoi les informations dans le header et au front en json
                res.setHeader('Authorization', `Bearer ${token}`);
                return res.status(200).json({ token });
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(404);
        }
    }

}

module.exports = authController;
