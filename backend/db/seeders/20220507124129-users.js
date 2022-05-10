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
    { username: 'demoUser', email: 'demo@user.io', hashedPassword: bcrypt.hashSync('password'), "profile_picture_url": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/26548367-ac89-4427-b6e0-2fbc957e40f1/dac5w6v-62e5b509-9a51-4261-8be5-151eb05539f4.jpg/v1/fill/w_900,h_1198,q_75,strp/death_boy__generic_profile_picture_by_dandy_jon_dac5w6v-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI2NTQ4MzY3LWFjODktNDQyNy1iNmUwLTJmYmM5NTdlNDBmMVwvZGFjNXc2di02MmU1YjUwOS05YTUxLTQyNjEtOGJlNS0xNTFlYjA1NTM5ZjQuanBnIiwiaGVpZ2h0IjoiPD0xMTk4Iiwid2lkdGgiOiI8PTkwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC8yNjU0ODM2Ny1hYzg5LTQ0MjctYjZlMC0yZmJjOTU3ZTQwZjFcL2RhbmR5LWpvbi00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.JE-Xx-XLx7U1ymup2n-vHBvGC7saVVADRdeTtqoSD5Q", phone_number: "4846884141", carrier: "tmobile" },
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
