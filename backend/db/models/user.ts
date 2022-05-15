'use strict';
import { Model } from 'sequelize';

const bcrypt = require("bcryptjs");

interface Login {
  credential: string;
  password: string;
}

interface Signup {
  username: string;
  email: string;
  password: string;
}

export = (sequelize: any, DataTypes: any) => {
  class User extends Model {
    declare id: number;
    declare username: string;
    declare email: string;
    declare phone_number: string;
    declare carrier: string;
    declare profile_picture_url: string;
    declare hashedPassword: string;

    toSafeObject() {
      const { id, username, email, phone_number, carrier, profile_picture_url } = this; // context will be the User instance
      return { id, username, email, phone_number, carrier, profile_picture_url };
    }
    validatePassword(password: string) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id: number) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }: Login) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password }: Signup) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models: any) {
      // define association here
      User.hasMany(models.Video, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
      User.hasMany(models.Photo, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
      User.hasMany(models.Message, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
      User.hasMany(models.UserGameGenre, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
      User.hasMany(models.UserGameCategory, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
      User.hasMany(models.UserGame, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
      
      const friendMap = {
        through: models.Friend,
        foreignKey: 'user_one',
        otherKey: 'user_two',
        as: 'userFriends'
      }
      User.belongsToMany(models.User, friendMap);

      const gameMap = {
        through: models.UsersLookingForGame,
        foreignKey: 'lfg_id',
        otherKey: 'user_id'
      }
      User.belongsToMany(models.LookingForGame, gameMap);
    }
  };
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      phone_number: DataTypes.STRING,
      carrier: DataTypes.STRING,
      profile_picture_url: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword"]
        },
      },
      scopes: {
        currentUser: {
          attributes: { 
            exclude: ["hashedPassword"]
          },
        },
        loginUser: {
          attributes: { exclude: [] },
        },
      },
    }
  );
  return User;
};