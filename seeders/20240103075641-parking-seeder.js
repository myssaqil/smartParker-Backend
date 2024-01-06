'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ParkingHeaders', [
      {
        PKG_NAME: 'Zumar Parkir',
        U_ID: 3,
        PKG_STREET: 'Jl. AKBP Agil Kusumadya, Tanggulangin, Jati Wetan, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59346',
        PKG_BANNER_BASE64: "",
        PKG_SUBLOCALITY: "",
        PKG_SUB_ADMINISTRATIVE_AREA: "",
        PKG_POSTAL_CODE: "",
        LATITUDE: "-6.840343081865736",
        LONGITUDE: "110.81871028835766",
        FEE: 50000,
        STATUS: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
