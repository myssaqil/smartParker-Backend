'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Parking_Details', [
      {
        PARKING_NUMBER: 1,
        PKG_HEAD_ID: 1,
        TYPE: 'CAR',
        STATUS: 'ACTIVE'
      },
      {
        PARKING_NUMBER: 2,
        PKG_HEAD_ID: 2,
        TYPE: 'CAR',
        STATUS: 'ACTIVE'
      },
      {
        PARKING_NUMBER: 1,
        PKG_HEAD_ID: 2,
        TYPE: 'CAR',
        STATUS: 'USED'
      },
      {
        PARKING_NUMBER: 3,
        PKG_HEAD_ID: 2,
        TYPE: 'MOTORCYCLE',
        STATUS: 'USED'
      },
      {
        PARKING_NUMBER: 4,
        PKG_HEAD_ID: 2,
        TYPE: 'CAR',
        STATUS: 'USED'
      },
      {
        PARKING_NUMBER: 5,
        PKG_HEAD_ID: 3,
        TYPE: 'CAR',
        STATUS: 'USED'
      },
      {
        PARKING_NUMBER: 6,
        PKG_HEAD_ID: 5,
        TYPE: 'MOTORCYCLE',
        STATUS: 'USED'
      },
      {
        PARKING_NUMBER: 7,
        PKG_HEAD_ID: 6,
        TYPE: 'CAR',
        STATUS: 'ACTIVATE'
      },
      {
        PARKING_NUMBER: 8,
        PKG_HEAD_ID: 7,
        TYPE: 'CAR',
        STATUS: 'ACTIVATE'
      },
      {
        PARKING_NUMBER: 9,
        PKG_HEAD_ID: 6,
        TYPE: 'CAR',
        STATUS: 'USED'
      },
      {
        PARKING_NUMBER: 10,
        PKG_HEAD_ID: 8,
        TYPE: 'MOTORCYCLE',
        STATUS: 'USED'
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
