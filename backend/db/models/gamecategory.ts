'use strict';
import { Model } from 'sequelize';

export = (sequelize: any, DataTypes: any) => {
  class GameCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  GameCategory.init({
    game_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GameCategory',
  });
  return GameCategory;
};