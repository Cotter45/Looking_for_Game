'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGame.belongsTo(models.Game, { foreignKey: 'game_id', foreignKeyConstraint: true });
      UserGame.belongsTo(models.User, { foreignKey: 'user_id', foreignKeyConstraint: true });
      UserGame.hasMany(models.LookingForGame, { foreignKey: 'game_id', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
    }
  }
  UserGame.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    is_free: DataTypes.BOOLEAN,
    price: DataTypes.STRING,
    game_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    steam_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserGame',
  });
  return UserGame;
};