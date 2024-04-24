// Définition d'une classe authDTO 
class authDTO {

     // Déclaration des propriétés de la classe
    id;
    login;
    password;
    hashedPassword;

    // Constructeur de la classe, qui prend un objet 'data' en paramètre
    constructor(data) {
        // Initialisation des propriétés de la classe avec les valeurs fournies dans 'data'
        this.id = data.id;
        this.login = data.login;
        this.password = data.password;
        this.hashedPassword = data.hashedPassword;
    }
}

// Exportation de la classe
module.exports = authDTO;

// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     const token = req.headers["x-access-token"] || req.headers["authorization"];
//     if (!token) return res.status(403).send({ message: "Aucun token fourni." });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.id;
//         next();
//     } catch (error) {
//         return res.status(401).send({ message: "Non autorisé." });
//     }
// };