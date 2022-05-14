'use strict';
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Friend extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
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
