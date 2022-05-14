'use strict';
import { Model } from 'sequelize';

export = (sequelize: any, DataTypes: any) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: 'user_id', foreignKeyConstraint: true });
      Message.belongsTo(models.Chat, { foreignKey: 'chat_id', foreignKeyConstraint: true });
    }
  }
  Message.init({
    message: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    video_url: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    chat_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};