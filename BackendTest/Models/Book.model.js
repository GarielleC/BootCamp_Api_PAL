const { DataTypes } = require("sequelize");

/**
 * Fonction pour créer un modèle Book (table de la base de données)
 * @param {Sequelize} sequelize - L'instance Sequelize
 * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
 */
const createBook = (sequelize) => {
    const Book = sequelize.define(
        "Book",
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            statut: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            prix: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            buyLink: {
                type: DataTypes.STRING,
                allowNull: true, // Mis en true car le lien n'est pas obligatoire
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                // Ajoutez cette colonne pour stocker l'ID de l'utilisateur associé
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true, // Active createdAt et updatedAt
            tableName: "Books",
        },
    );

    return Book;
};

module.exports = createBook;
