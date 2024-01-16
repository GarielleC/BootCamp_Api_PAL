// Importation
const { Sequelize, DataTypes } = require('sequelize');
const createBooksToBuy = require('./Book.model');
/**
 * Fonction pour créer un model Product (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
 */


const createBooksToBuy = (sequelize) => {
    // Définition du modèle (table)
    const BookToBuy = sequelize.define('BookToBuy', {
        // L'id se crée automatiquement si non spécifié ici
        title: {
            type: DataTypes.STRING,
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


module.exports = createBooksToBuy