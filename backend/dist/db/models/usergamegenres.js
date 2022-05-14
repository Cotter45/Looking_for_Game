'use strict';
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserGameGenre extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserGameGenre.belongsTo(models.Genre, { foreignKey: 'genre_id', foreignKeyConstraint: true });
            UserGameGenre.belongsTo(models.User, { foreignKey: 'user_id', foreignKeyConstraint: true });
        }
    }
    UserGameGenre.init({
        genre: DataTypes.STRING,
        genre_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'UserGameGenre',
    });
    return UserGameGenre;
};
