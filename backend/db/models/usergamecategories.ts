'use strict';
import { Model } from 'sequelize';

export = (sequelize: any, DataTypes: any) => {
  class UserGameCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      UserGameCategory.belongsTo(models.Category, { foreignKey: 'category_id', foreignKeyConstraint: true });
      UserGameCategory.belongsTo(models.User, { foreignKey: 'user_id', foreignKeyConstraint: true })
    }
  }
  UserGameCategory.init({
    category: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserGameCategory',
  });
  return UserGameCategory;
};