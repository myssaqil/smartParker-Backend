'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parking_Details', {
      PARKING_NUMBER: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PKG_HEAD_ID: {
        type: Sequelize.INTEGER
      },
      LATITUDE: {
        type: Sequelize.STRING
      },
      LONGITUDE: {
        type: Sequelize.STRING
      },
      STATUS:{
        type: Sequelize.ENUM('ACTIVE', ''),
        defaultValue: 'ACTIVE'
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