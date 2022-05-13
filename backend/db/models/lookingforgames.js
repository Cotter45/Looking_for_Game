'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LookingForGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const gameMap = {
        through: models.UsersLookingForGame,
        foreignKey: 'user_id',
        otherKey: 'lfg_id'
      }
      LookingForGame.belongsToMany(models.User, gameMap);
      LookingForGame.hasMany(models.Chat, { foreignKey: 'lfg_id', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
      LookingForGame.belongsTo(models.UserGame, { foreignKey: 'game_id' });
    }
  }
  LookingForGame.init({
    title: DataTypes.STRING,
    image_url: DataTypes.TEXT,
    game_id: DataTypes.INTEGER,
    creator_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LookingForGame',
  });
  return LookingForGame;
};