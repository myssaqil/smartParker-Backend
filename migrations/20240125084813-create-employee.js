'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      U_ID: {
        type: Sequelize.INTEGER
      },
      EMPLOYE_U_ID: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      PARKING_ID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      STATUS:{
        type: Sequelize.ENUM('PENDING', 'ACTIVE'),
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
    await queryInterface.dropTable('Employees');
  }
};