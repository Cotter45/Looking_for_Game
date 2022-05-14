'use strict';
import { Model } from 'sequelize';

export = (sequelize: any, DataTypes: any) => {
  class UsersLookingForGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  UsersLookingForGame.init({
    user_id: DataTypes.INTEGER,
    lfg_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersLookingForGame',
  });
  return UsersLookingForGame;
};