'use strict';
import { Model } from 'sequelize';

export = (sequelize: any, DataTypes: any) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Genre.hasMany(models.UserGameGenre, { foreignKey: 'genre_id', foreignKeyConstraint: true });
      const gameMapper = {
        through: 'GameGenre',
        foreignKey: 'genre_id',
        otherKey: 'game_id',
      }
      Genre.belongsToMany(models.Game, gameMapper);
    }
  }
  Genre.init({
    genre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};