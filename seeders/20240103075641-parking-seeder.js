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
      },
      {
        id :5,
        PKG_NAME: 'Yanto - Parkiran Motor SMK RUS',
        U_ID: 6,
        PKG_STREET: 'Jl. Bae-Besito',
        PKG_BANNER_BASE64: "img/parking/parkiran-yanto.jpeg",
        PKG_SUBLOCALITY: "Kec. Gebog",
        PKG_SUB_ADMINISTRATIVE_AREA: "Kudus",
        PKG_POSTAL_CODE: "59333",
        LATITUDE: "-6.753761",
        LONGITUDE: "110.842616",
        FEE: 2000,
        TOTAL_SLOT_CAR: 0,
        TOTAL_USED_CAR: 0,
        TOTAL_SLOT_MOTORCYCLE: 100,
        TOTAL_USED_MOTORCYCLE: 0,
        STATUS: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id :6,
        PKG_NAME: 'Masjid Taqwa',
        U_ID: 4,
        PKG_STREET: 'Jl. Rahtawu Raya',
        PKG_BANNER_BASE64: "img/parking/masjid-taqwa.jpg",
        PKG_SUBLOCALITY: "Kec. Gebog",
        PKG_SUB_ADMINISTRATIVE_AREA: "Kudus",
        PKG_POSTAL_CODE: "59333",
        LATITUDE: "-6.721725",
        LONGITUDE: "110.847132",
        FEE: 3000,
        TOTAL_SLOT_CAR: 8,
        TOTAL_USED_CAR: 0,
        TOTAL_SLOT_MOTORCYCLE: 40,
        TOTAL_USED_MOTORCYCLE: 0,
        STATUS: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id :7,
        PKG_NAME: 'Holy Tea Besito',
        U_ID: 10,
        PKG_STREET: 'Jl. Besito Kauman',
        PKG_BANNER_BASE64: "img/parking/holytea.jpeg",
        PKG_SUBLOCALITY: "Kec. Gebog",
        PKG_SUB_ADMINISTRATIVE_AREA: "Kudus",
        PKG_POSTAL_CODE: "59333",
        LATITUDE: "-6.756919",
        LONGITUDE: "110.8432934",
        FEE: 3000,
        TOTAL_SLOT_CAR: 2,
        TOTAL_USED_CAR: 0,
        TOTAL_SLOT_MOTORCYCLE: 8,
        TOTAL_USED_MOTORCYCLE: 0,
        STATUS: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id :8,
        PKG_NAME: 'Toko Mebel Pak Joko',
        U_ID: 3,
        PKG_STREET: 'Jl. Wonosari Semin',
        PKG_BANNER_BASE64: "img/parking/amanah-parkir.jpg",
        PKG_SUBLOCALITY: "Kec. Semin",
        PKG_SUB_ADMINISTRATIVE_AREA: "Gunungkidul",
        PKG_POSTAL_CODE: "55854",
        LATITUDE: "-7.8647817",
        LONGITUDE: "110.7368255",
        FEE: 3000,
        TOTAL_SLOT_CAR: 5,
        TOTAL_USED_CAR: 0,
        TOTAL_SLOT_MOTORCYCLE: 20,
        TOTAL_USED_MOTORCYCLE: 0,
        STATUS: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id :9,
        PKG_NAME: 'Pasar Tawangsari',
        U_ID: 5,
        PKG_STREET: 'Jl. Patimura No.76',
        PKG_BANNER_BASE64: "img/parking/fitri-parkir.jpg",
        PKG_SUBLOCALITY: "Kec. Tawangsari",
        PKG_SUB_ADMINISTRATIVE_AREA: "Sukoharjo",
        PKG_POSTAL_CODE: "57561",
        LATITUDE: "-7.735559",
        LONGITUDE: "110.795807",
        FEE: 3000,
        TOTAL_SLOT_CAR: 12,
        TOTAL_USED_CAR: 0,
        TOTAL_SLOT_MOTORCYCLE: 38,
        TOTAL_USED_MOTORCYCLE: 0,
        STATUS: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id :10,
        PKG_NAME: 'RM. Sumber Bestik',
        U_ID: 9,
        PKG_STREET: 'Jl. Honggowongso No.94',
        PKG_BANNER_BASE64: "sumber-bestik.jpg",
        PKG_SUBLOCALITY: "Kec. Laweyan",
        PKG_SUB_ADMINISTRATIVE_AREA: "Surakarta",
        PKG_POSTAL_CODE: "57149",
        LATITUDE: "-7.5746466",
        LONGITUDE: "110.8110892",
        FEE: 4000,
        TOTAL_SLOT_CAR: 27,
        TOTAL_USED_CAR: 0,
        TOTAL_SLOT_MOTORCYCLE: 40,
        TOTAL_USED_MOTORCYCLE: 0,
        STATUS: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
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
