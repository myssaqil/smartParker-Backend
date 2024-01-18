'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VehicleUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      U_ID: {
        type: Sequelize.INTEGER
      },
      LICENSE_PLATE: {
        type: Sequelize.STRING
      },
      VHC_NAME: {
        type: Sequelize.STRING
      },
      VHC_TYPE:{
        type: Sequelize.ENUM('MOTORCYCLE', 'CAR'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VehicleUsers');
  }
};