const { Sequelize, DataTypes } = require('sequelize');
const createReadLibrary = require('./Book.model');
/**
 * Fonction pour créer un model Product (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
 */


const createReadLibrary = (sequelize) => {
    // Définition du modèle (table)
    const ReadLibrary = sequelize.define('ReadLibrary', {
       // L'id se crée automatiquement si non spécifié ici
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
}, {
    // Options de création propre à Sequelize 
    createdAt: true,  
    tableName: 'ReadLibrary',
    });

    return ReadLibrary;
};

module.exports = createReadLibrary; 