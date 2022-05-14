'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
   await queryInterface.bulkInsert('Users', [
    { username: 'demoUser', email: 'demo@user.io', hashedPassword: bcrypt.hashSync('password'), "profile_picture_url": "/static/no_profile_pic.jpeg", phone_number: "4846884141", carrier: "tmobile" },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
