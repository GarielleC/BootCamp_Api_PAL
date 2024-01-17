const { DataTypes } = require("sequelize");

/**
 * Fonction pour créer un modèle BookToRead (table de base de données)
 * @param {Sequelize} sequelize - L'instance Sequelize
 * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
 */
const createBooksToRead = (sequelize) => {
    const BookToRead = sequelize.define(
        "BookToRead",
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true, // Active createdAt et updatedAt
            tableName: "BookToRead",
        },
    );

    return BookToRead;
};

module.exports = createBooksToRead;

// // Importation
// const { Sequelize, DataTypes } = require('sequelize');
// const createBooksToRead = require('./Book.model');
// /**
//  * Fonction pour créer un model Product (donc table de db)
//  * Le JSDoc sert à l'autocomplétion
//  * @param {Sequelize} sequelize
//  * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
//  */


// const createBooksToRead = (sequelize) => {
//     // Définition du modèle (table)
//     const BookToRead = sequelize.define('BookToRead', {
//         title : {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         author: {
//             type: DataTypes.STRING(100),
//             allowNull: false,
//         },
//         imageUrl: {
//             type: DataTypes.STRING, 
//             allowNull: false, 

//         },
//     }, {
//         createdAt: true,
//         tableName :'BookToRead'
//     });

//     return BookToRead; 
// };

// module.exports = createBooksToRead; 