'use strict';
const bcryptjs = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = bcryptjs.hashSync("smartparker", 10)
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        U_NAME: 'Admin',
        U_MAIL: 'admin@example.com',
        U_PASSWORD: hashedPassword,
        U_ROLE: 'admin',
        U_BALANCE: 0,
        U_VERIFY_TOKEN: "",
        U_VERIFY_STATUS: "TRUE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        U_NAME: 'Meyssa Aqila Adikara',
        U_MAIL: 'qilaadikara3@gmail.com',
        U_PASSWORD: hashedPassword,
        U_ROLE: 'user',
        U_BALANCE: 0,
        U_VERIFY_TOKEN: "",
        U_VERIFY_STATUS: "true",
        U_IMG : 'img/users-profile/aqil.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        U_NAME: 'Kalam',
        U_MAIL: 'kalam123@gmail.com',
        U_PASSWORD: hashedPassword,
        U_ROLE: 'parker',
        U_BALANCE: 0,
        U_VERIFY_TOKEN: "",
        U_VERIFY_STATUS: "true",
        U_IMG : '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        U_NAME: 'Daffa Syauqi',
        U_MAIL: 'daffas01gaming@gmail.com',
        U_PASSWORD: hashedPassword,
        U_ROLE: 'parker',
        U_BALANCE: 0,
        U_VERIFY_TOKEN: "",
        U_VERIFY_STATUS: "true",
        U_IMG : '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        U_NAME: 'Nisrina Sovia',
        U_MAIL: 'nsoviaa1@gmail.com',
        U_PASSWORD: hashedPassword,
        U_ROLE: 'parker',
        U_BALANCE: 0,
        U_VERIFY_TOKEN: "",
        U_VERIFY_STATUS: "true",
        U_IMG : '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        U_NAME: 'Yanto Iku',
        U_MAIL: 'yantoikuiku@gmail.com',
        U_PASSWORD: hashedPassword,
        U_ROLE: 'parker',
        U_BALANCE: 0,
        U_VERIFY_TOKEN: "",
        U_VERIFY_STATUS: "true",
        U_IMG : '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        U_NAME: 'Purnomo',
        U_MAIL: 'purnomo21@gmail.com',
        U_PASSWORD: hashedPassword,
        U_ROLE: 'user',
        U_BALANCE: 0,
        U_VERIFY_TOKEN: "",
        U_VERIFY_STATUS: "true",
        U_IMG : '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        U_NAME: 'Adit',
        U_MAIL: 'aditiyass@gmail.com',
        U_PASSWORD: hashedPassword,
        U_ROLE: 'user',
        U_BALANCE: 0,
        U_VERIFY_TOKEN: "",
        U_VERIFY_STATUS: "true",
        U_IMG : '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        U_NAME: 'Danar',
        U_MAIL: 'danarrx@gmail.com',
        U_PASSWORD: hashedPassword,
        U_ROLE: 'parker',
        U_BALANCE: 0,
        U_VERIFY_TOKEN: "",
        U_VERIFY_STATUS: "true",
        U_IMG : '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        U_NAME: 'Sutris',
        U_MAIL: 'sutrisni@gmail.com',
        U_PASSWORD: hashedPassword,
        U_ROLE: 'employee',
        U_BALANCE: 0,
        U_VERIFY_TOKEN: "",
        U_VERIFY_STATUS: "true",
        U_IMG : '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
    ], {})
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
