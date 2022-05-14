'use strict';
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class GameGenre extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    GameGenre.init({
        game_id: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'GameGenre',
    });
    return GameGenre;
};
