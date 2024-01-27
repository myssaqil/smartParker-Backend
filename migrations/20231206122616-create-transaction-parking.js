'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionParkings', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      U_ID: {
        type: Sequelize.INTEGER
      },
      EMPLOYEE_ID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      LICENSE_PLATE: {
        type: Sequelize.STRING
      },
      TRX_ID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      AMOUNT: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      PARKING_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      PAY:{
        type: Sequelize.ENUM( 'CASH','XENDIT'),
      },
      INFO: {
        type: Sequelize.STRING
      },
      DATE_START: {
        allowNull: true,
        type: Sequelize.DATE
      },
      DATE_END: {
        allowNull: false,
        type: Sequelize.DATE
      },
      DATE_USER_OUT: {
        allowNull: true,
        type: Sequelize.DATE
      },
      DATE_USER_IN: {
        allowNull: true,
        type: Sequelize.DATE
      },
      UPDATE_SLOT_START:{
        type: Sequelize.ENUM('Y', 'N'),
        allowNull: false,
        defaultValue: 'N',
      },
      UPDATE_SLOT_END:{
        type: Sequelize.ENUM('Y', 'N'),
        allowNull: false,
        defaultValue: 'N',
      },
      TYPE:{
        type: Sequelize.ENUM('MOTORCYCLE', 'CAR'),
        allowNull: false,
      },
      STATUS:{
        type: Sequelize.ENUM('ONGOING',  'WAITINGP', 'FAILED', 'DONE'),
        defaultValue:'WAITINGP',
        allowNull: false,
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
    await queryInterface.dropTable('TransactionParkings');
  }
};