"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(
            "Users",
            "RefreshToken", // Nom de la table à modifier
            {
                type: Sequelize.DataTypes.STRING,
                allowNull: true, // Autoriser les valeurs nulles
            },
        );
        // Créer la table "RefreshTokens"
        await queryInterface.createTable("RefreshTokens", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            token: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(500),
            },
            expiresAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        // Supprimer la colonne "name" de la table "Users"
        await queryInterface.removeColumn("Users", "name");
    },
};
