'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parking_Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PARKING_NUMBER: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      PKG_HEAD_ID: {
        type: Sequelize.INTEGER
      },
      STATUS:{
        type: Sequelize.ENUM('ACTIVE', 'USED', 'CLOSE'),
        defaultValue: 'ACTIVE'
      },
      TYPE:{
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
    await queryInterface.dropTable('Parking_Details');
  }
};