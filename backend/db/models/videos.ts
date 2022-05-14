'use strict';
import { Model } from 'sequelize';

export = (sequelize: any, DataTypes: any) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Video.belongsTo(models.User, { foreignKey: 'user_id', foreignKeyConstraint: true });
    }
  }
  Video.init({
    video_url: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};