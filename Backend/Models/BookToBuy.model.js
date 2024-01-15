// Importation
const { Sequelize, DataTypes } = require('sequelize');
const Product = require('./Book.model');
/**
 * Fonction pour créer un model Product (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
 */


module.exports = (sequelize) => {
    // Définition du modèle (table)
    const BookToBuy = require('BookToBuy', {
        // L'id se crée automatiquement si non spécifié ici
        title: {
            type: DataTypes.STRING(MAX),
            allowNull: false,
        },

        author: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        prix: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        buyLink: {
            type: DataTypes.STRING, 
            allowNull: true, // Mis en true car le lien n'est pas obligatoire
        },
        imageUrl: {
            type: DataTypes.STRING, 
            allowNull: false, 
        },
    }, {
        // Options de création propre à Sequelize 
        createdAt: true,  
        tableName: 'BookToBuy'
    });

    return BookToBuy;
};