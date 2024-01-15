//importation
const {Sequelize, DataTypes, ModelStatic } = require('sequelize');

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
    // Définition de l'object sequelize (db)
    const Auth = sequelize.define('Auth', {
        // L'id se crée automatiquement si non spécifié ici
        
        genre: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        prenom: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        codePostal: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        dateNaissance: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        pays: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },

        ville: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        
        login: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        hashedPassword: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },

        jwt: {
            type: DataTypes.STRING(500),
            allowNull: true,
        }
    }, {
        // Option de création propre à Sequelize (voir doc)
        createdAt: true,
        tableName: 'Users',
        indexes: [
            {
                // Création de contraintes
                name: 'UK_Auth__jwt',
                fields: ['login', 'jwt'],
                unique: false,
            },
        ]
    })

    return Auth;
}