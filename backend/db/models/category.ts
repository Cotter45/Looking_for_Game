'use strict';
import { Model } from 'sequelize';

export = (sequelize: any, DataTypes: any) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Category.hasMany(models.UserGameCategory, { foreignKey: 'category_id', foreignKeyConstraint: true });
      const gameMapper = {
        through: 'GameCategory',
        foreignKey: 'category_id',
        otherKey: 'game_id',
      }
      Category.belongsToMany(models.Game, gameMapper);
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};