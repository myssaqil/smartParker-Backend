'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      U_MAIL: {
        unique: true,
        type: Sequelize.STRING
      },
      U_PASSWORD: {
        type: Sequelize.STRING
      },
      U_IMG: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      U_NAME: {
        type: Sequelize.STRING
      },
      U_BALANCE: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      U_ROLE:{
        type: Sequelize.ENUM('USER', 'PARKER', 'ADMIN', 'STAFF', 'EMPLOYEE'),
        defaultValue: 'USER'
      },
      U_VERIFY_STATUS:{
        type: Sequelize.ENUM('TRUE', 'FALSE'),
        defaultValue: 'FALSE'
      },
      U_VERIFY_TOKEN:{
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Users');
  }
};