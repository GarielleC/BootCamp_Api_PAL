const { DataTypes } = require("sequelize");

/**
 * Fonction pour créer un modèle ReadLibrary (table de base de données)
 * @param {Sequelize} sequelize - L'instance Sequelize
 * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
 */
const createReadLibrary = (sequelize) => {
    const ReadLibrary = sequelize.define(
        "ReadLibrary",
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
            tableName: "ReadLibrary",
        },
    );

    return ReadLibrary;
};

module.exports = createReadLibrary;