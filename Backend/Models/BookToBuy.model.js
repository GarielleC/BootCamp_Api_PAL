const { DataTypes } = require("sequelize");

/**
 * Fonction pour créer un modèle BookToBuy (table de base de données)
 * @param {Sequelize} sequelize - L'instance Sequelize
 * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
 */
const createBooksToBuy = (sequelize) => {
    const BookToBuy = sequelize.define(
        "BookToBuy",
        {
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
        },
        {
            timestamps: true, // Active createdAt et updatedAt
            tableName: "BookToBuy",
        },
    );

    return BookToBuy;
};

module.exports = createBooksToBuy;