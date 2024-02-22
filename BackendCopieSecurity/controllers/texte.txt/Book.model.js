
// const { DataTypes } = require("sequelize");

// /**
//  * Fonction pour créer un modèle Book (table de la base de données)
//  * @param {Sequelize} sequelize - L'instance Sequelize
//  * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
//  */
// const createBook = (sequelize) => {
//     const Book = sequelize.define(
//         "Book",
//         {
//             title: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             author: {
//                 type: DataTypes.STRING(100),
//                 allowNull: false,
//             },
//             statut: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },

//             prix: {
//                 type: DataTypes.INTEGER,
//                 allowNull: true,
//             },
//             buyLink: {
//                 type: DataTypes.STRING,
//                 allowNull: true, // Mis en true car le lien n'est pas obligatoire
//             },
//             imageUrl: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//         },
//         {
//             timestamps: true, // Active createdAt et updatedAt
//             tableName: "Books",
//         },
//     );

//     return Book;
// };

// module.exports = createBook;
// // // Importation
// // const { Sequelize, DataTypes } = require('sequelize');

// // /**
// //  * Fonction pour créer un model Book (donc table de la base de données)
// //  * Le JSDoc sert à l'autocomplétion
// //  * @param {Sequelize} sequelize
// //  * @returns {import('sequelize').ModelCtor<import('sequelize').Model<any, any>>}
// //  */
// // const createBook = (sequelize) => {
// //     // Définition du modèle (table)
// //     const Book = sequelize.define('Book', {
// //         // L'id se crée automatiquement si non spécifié ici
// //         title: {
// //             type: DataTypes.STRING, 
// //             allowNull: false,
// //         },
// //         author: {
// //             type: DataTypes.STRING(100),
// //             allowNull: false,
// //         },
// //         prix: {
// //             type: DataTypes.INTEGER,
// //             allowNull: false,
// //         },
// //         buyLink: {
// //             type: DataTypes.STRING, 
// //             allowNull: true, // Mis en true car le lien n'est pas obligatoire
// //         },
// //         imageUrl: {
// //             type: DataTypes.STRING,
// //             allowNull: false,
// //         },
// //     },{
// //         // options de création propre à Sequelize
// //         createdAt: 'created_at',  
// //         updatedAt: 'updated_at',  
// //         tableName: 'Books',
// //     });
// //     return Book; 
// // };

// // module.exports = createBook;  
