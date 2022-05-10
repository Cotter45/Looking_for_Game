'use strict';
const game_categories = require('../steam/format_game_categories.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
   await queryInterface.bulkInsert('GameCategories', game_categories, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('GameCategories', null, {});
  }
};
