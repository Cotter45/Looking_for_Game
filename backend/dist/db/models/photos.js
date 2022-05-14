'use strict';
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Photo extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Photo.belongsTo(models.User, { foreignKey: 'user_id', foreignKeyConstraint: true });
        }
    }
    Photo.init({
        image_url: DataTypes.TEXT,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Photo',
    });
    return Photo;
};
