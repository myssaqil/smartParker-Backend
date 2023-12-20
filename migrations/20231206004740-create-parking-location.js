'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParkingLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      imagePath: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      u_id: {
        type: Sequelize.INTEGER
      },
      street: {
        type: Sequelize.TEXT
      },
      subLocality: {
        type: Sequelize.STRING
      },
      subAdministrativeArea: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longtitude: {
        type: Sequelize.STRING
      },
      slot: {
        type: Sequelize.INTEGER
      },
      slotTotal: {
        type: Sequelize.INTEGER
      },
      fee: {
        type: Sequelize.INTEGER
      },
      byHour: {
        type: Sequelize.ENUM('Y', 'N'),
        defaultValue: 'N'
      },
      status:{
        type: Sequelize.ENUM('ACTIVE', 'NO'),
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
    await queryInterface.dropTable('ParkingLocations');
  }
};