'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ParkingHeaders', [
      {
        id :2,
        PKG_NAME: 'Mall Ciputra',
        U_ID: 3,
        PKG_STREET: 'Pekunden',
        PKG_BANNER_BASE64: "img/parking/mall-ciputra.png",
        PKG_SUBLOCALITY: "ota Semarang",
        PKG_SUB_ADMINISTRATIVE_AREA: "Jawa Tengah",
        PKG_POSTAL_CODE: "50134",
        LATITUDE: "-6.9886486",
        LONGITUDE: "110.4227324",
        FEE: 1000,
        PKG_CLOSE_TIME: "20:00:00",
        PKG_OPEN_TIME: "07:00:00",
        TOTAL_SLOT_CAR: 10,
        TOTAL_USED_CAR: 0,
        TOTAL_SLOT_MOTORCYCLE: 10,
        TOTAL_USED_MOTORCYCLE: 0,
        STATUS: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id :1,
        PKG_NAME: 'Zumar Parkir',
        U_ID: 3,
        PKG_STREET: 'Jl. AKBP Agil Kusumadya',
        PKG_BANNER_BASE64: "",
        PKG_SUBLOCALITY: "Kabupaten Kudus",
        PKG_SUB_ADMINISTRATIVE_AREA: "Jawa Tengah",
        PKG_POSTAL_CODE: "59346",
        LATITUDE: "-6.840343081865736",
        LONGITUDE: "110.81871028835766",
        FEE: 1000,
        TOTAL_SLOT_CAR: 10,
        TOTAL_USED_CAR: 0,
        TOTAL_SLOT_MOTORCYCLE: 10,
        TOTAL_USED_MOTORCYCLE: 0,
        STATUS: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id :3,
        PKG_NAME: 'Masjid Raya Baiturrahman Semarang',
        U_ID: 3,
        PKG_STREET: 'Jl. Pandanaran',
        PKG_BANNER_BASE64: "img/parking/msjd-baiturahman.jpg",
        PKG_SUBLOCALITY: "Kec. Semarang Tengah",
        PKG_SUB_ADMINISTRATIVE_AREA: "Kota Semarang",
        PKG_POSTAL_CODE: "50241",
        LATITUDE: "-6.989535",
        LONGITUDE: "110.4218338",
        FEE: 0,
        TOTAL_SLOT_CAR: 10,
        TOTAL_USED_CAR: 0,
        TOTAL_SLOT_MOTORCYCLE: 10,
        TOTAL_USED_MOTORCYCLE: 0,
        STATUS: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id :4,
        PKG_NAME: 'Masjid Raya Baiturrahman Semarang Basement',
        U_ID: 3,
        PKG_STREET: 'Jl. Pandanaran',
        PKG_BANNER_BASE64: "",
        PKG_SUBLOCALITY: "Kec. Semarang Tengah",
        PKG_SUB_ADMINISTRATIVE_AREA: "Kota Semarang",
        PKG_POSTAL_CODE: "50241",
        LATITUDE: "-6.9887689",
        LONGITUDE: "110.4223464",
        FEE: 1000,
        TOTAL_SLOT_CAR: 10,
        TOTAL_USED_CAR: 0,
        TOTAL_SLOT_MOTORCYCLE: 10,
        TOTAL_USED_MOTORCYCLE: 0,
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
