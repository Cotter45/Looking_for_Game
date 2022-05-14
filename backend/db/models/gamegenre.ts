'use strict';
import { Model } from 'sequelize';

export = (sequelize: any, DataTypes: any) => {
  class GameGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  GameGenre.init({
    game_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GameGenre',
  });
  return GameGenre;
};