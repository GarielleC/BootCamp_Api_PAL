// Importation l'object Sequelize
const { Sequelize } = require('sequelize');

// Initilisation une nouvelle instance de l'object avec SQLite en paramètre
const sequelize = new Sequelize({
    dialect: 'mssql',
    database: 'BooksApi',
    username: 'Books',
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 1433 // Le port de base de SQL Server
});

// Création de l'object db
const db = {};
module.exports = db;

//gère l'instance
db.sequelize = sequelize;
//gère d'autres méthodes de sequelize
db.Sequelize = Sequelize;

// Ajout des models
db.Auth = require('./auth.model')(sequelize);
db.Product = require('./Book.model')(sequelize);
db.Panier = require('./BookToRead.model')(sequelize);
db.Favoris = require('./BookToBuy.model')(sequelize);
db.Advices = require('./ReadLibrary.model')(sequelize);
