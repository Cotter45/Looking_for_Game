'use strict';
import { Model } from 'sequelize';

export = (sequelize: any, DataTypes: any) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Chat.belongsTo(models.LookingForGame, { foreignKey: 'lfg_id', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
      Chat.hasMany(models.Message, { foreignKey: 'chat_id', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
    }
  }
  Chat.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    public: DataTypes.BOOLEAN,
    lfg_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};