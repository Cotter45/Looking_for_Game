'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.hasMany(models.UserGame, { foreignKey: 'game_id', foreignKeyConstraint: true });
      const categoryMapper = {
        through: 'GameCategory',
        foreignKey: 'category_id',
        otherKey: 'game_id',
      }
      Game.belongsToMany(models.Category, categoryMapper);
      const genreMapper = {
        through: 'GameGenre',
        foreignKey: 'genre_id',
        otherKey: 'game_id',
      }
      Game.belongsToMany(models.Genre, genreMapper);
    }
  }
  Game.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    is_free: DataTypes.BOOLEAN,
    price: DataTypes.STRING,
    steam_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};