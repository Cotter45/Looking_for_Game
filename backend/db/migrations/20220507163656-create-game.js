'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.TEXT
      },
      is_free: {
        type: Sequelize.BOOLEAN
      },
      price: {
        type: Sequelize.STRING
      },
      steam_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  }
};