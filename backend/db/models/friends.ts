'use strict';
import { Model } from 'sequelize';

export = (sequelize: any, DataTypes: any) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Friend.init({
    user_one: DataTypes.INTEGER,
    user_two: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};