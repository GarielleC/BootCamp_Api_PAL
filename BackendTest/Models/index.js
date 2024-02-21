// Importation de l'objet Sequelize
const { Sequelize } = require("sequelize");

// Initialisation d'une nouvelle instance de l'objet avec MSSQL en paramètre
const sequelize = new Sequelize({
    dialect: "mssql",
    database: "BooksApi",
    username: "Books",
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 1433, // Le port de base de SQL Server
});

// Création de l'objet db
const db = {};

// Gère l'instance
db.sequelize = sequelize;
// Gère d'autres méthodes de Sequelize
db.Sequelize = Sequelize;

// Ajout des modèles
db.Auth = require("./auth.model")(sequelize);
db.Book = require("./Book.model")(sequelize);

module.exports = db;