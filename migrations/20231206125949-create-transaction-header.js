'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionHeaders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionId: {
        type: Sequelize.STRING
      },
      transactionType:{
        type: Sequelize.ENUM( 'BILLPAYMENT','PARKING' ,'TOPUP'),
      },
      //SAAT SET STATUS AKAN MEMBUAT DATA BODY KECUALI PENDING!!!
      status:{
        type: Sequelize.ENUM( 'FAILED','SUCCESS', 'PENDING'),
        defaultValue: 'PENDING'
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
    await queryInterface.dropTable('TransactionHeaders');
  }
};