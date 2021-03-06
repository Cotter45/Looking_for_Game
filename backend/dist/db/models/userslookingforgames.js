'use strict';
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UsersLookingForGame extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
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
