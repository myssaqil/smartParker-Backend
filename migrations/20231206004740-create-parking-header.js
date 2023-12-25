'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParkingHeader', {
      PKG_HEAD_ID: {
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
    await queryInterface.dropTable('ParkingHeader');
  }
};