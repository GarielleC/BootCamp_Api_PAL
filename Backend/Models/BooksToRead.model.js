// Importation
const { Sequelize, DataTypes } = require('sequelize');
const Product = require('./product.model');
/**
 * Fonction pour créer un model Product (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
 */


module.exports = (sequelize) => {
    // Définition du modèle (table)
    const BookToRead = require('BookToRead', {
        title : {
            type: DataTypes.STRING(MAX),
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
    }, {
        createdAt: true,
        tableName :'BookToRead'
    });

    return BookToRead; 
};