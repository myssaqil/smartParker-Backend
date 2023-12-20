'use strict';
const bcryptjs = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = bcryptjs.hashSync("password", 10)
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Admin Zendmind',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        saldo: 0,
        verifyToken: "",
        isVerify: "true",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Meyssa Aqila Adikara',
        email: 'qilaadikara3@gmail.com',
        password: hashedPassword,
        role: 'user',
        saldo: 0,
        verifyToken: "",
        isVerify: "true",
        imgProfileURL : 'img/users-profile/me.jpg',
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
