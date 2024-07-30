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
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // defaultValue: 13,
                references: {
                    model: "Users",
                    key: "id",
                },
            },

            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true, // Active createdAt et updatedAt
            tableName: "Books",
        },
    );
    // Ajout de la relation avec le modèle Auth
    Book.belongsTo(sequelize.models.Auth, { foreignKey: "userId" });

    return Book;
};

module.exports = createBook;
