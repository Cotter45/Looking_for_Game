'use strict';
let game_genres = require('../steam/format_game_genres.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
   await queryInterface.bulkInsert('GameGenres', game_genres, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('GameGenres', null, {});
  }
};
