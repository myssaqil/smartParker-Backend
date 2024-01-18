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

      //Ketikapakaixendit
      TRX_ID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      AMOUNT: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      TRX_TYPE:{
        type: Sequelize.ENUM( 'BILLPAYMENT','PARKING' ,'TOPUP'),
      },
      //SAAT SET STATUS AKAN MEMBUAT DATA BODY KECUALI PENDING!!!
      STATUS:{
        type: Sequelize.ENUM( 'FAILED','SUCCESS', 'PENDING', 'REFFUND', 'REFFUND-DONE'),
        defaultValue: 'PENDING'
      },
      //Payment
      PAY:{
        type: Sequelize.ENUM( 'CASH','PAYLATER', 'XENDIT'),
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