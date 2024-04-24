"use strict";

const Sequelize = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            "Books", // Nom de la table à modifier
            {
                name: Sequelize.DataTypes.STRING,
                userId: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    // defaultValue: 13,
                    references: {
                        model: {
                            tableName: "Users",
                        },
                        key: "id",
                    },
                },
            },
        );
    },
};

// 'use strict';

// const Sequelize = require("sequelize");

// module.exports = {
//     async up(queryInterface, Sequelize) {
//         return queryInterface.addColumn(
//             'Books', // Nom de la table à modifier
//             {
//                 name: Sequelize.DataTypes.STRING,
//                 userId: {
//                     type: Sequelize.DataTypes.INTEGER,
//                     allowNull: false,
//                     defaultValue: false,
//                     references: {
//                         model: {
//                             tableName: 'Users',
//                         },
//                         key: 'id',
//                     },
//                 },
//             }
//         );
//     },
// };
