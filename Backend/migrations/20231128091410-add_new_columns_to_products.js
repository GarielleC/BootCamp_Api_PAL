'use strict';

const Sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
    queryInterface.addColumn(
      'Product', // Nom de la table à modifier
      'compatibleDrones', {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      
      },
    ),
  ])
}     
};
