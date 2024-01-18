'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParkingHeaders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PKG_NAME: {
        type: Sequelize.STRING
      },
      PKG_BANNER_BASE64: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      U_ID: {
        type: Sequelize.INTEGER
      },
      //JALAN
      PKG_STREET: {
        type: Sequelize.TEXT
      },
      //KECAMATAN
      PKG_SUBLOCALITY: {
        type: Sequelize.STRING
      },
      //KABUPATEN
      PKG_SUB_ADMINISTRATIVE_AREA: {
        type: Sequelize.STRING
      },
      //KODEPOS
      PKG_POSTAL_CODE: {
        type: Sequelize.STRING
      },
      LATITUDE: {
        type: Sequelize.STRING
      },
      LONGITUDE: {
        type: Sequelize.STRING
      },
      FEE: {
        type: Sequelize.INTEGER
      },
      PKG_CLOSE_TIME: {
        type: Sequelize.TIME,
        allowNull: true
      },
      PKG_OPEN_TIME: {
        type: Sequelize.TIME,
        allowNull: true
      },
      TOTAL_SLOT_CAR: {
        type: Sequelize.INTEGER
      },
      TOTAL_USED_CAR: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      TOTAL_SLOT_MOTORCYCLE: {
        type: Sequelize.INTEGER
      },
      TOTAL_USED_MOTORCYCLE: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      STATUS:{
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
    await queryInterface.dropTable('ParkingHeaders');
  }
};