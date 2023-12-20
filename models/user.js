'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imgProfileURL:{
      type: DataTypes.STRING,
    },
    name: DataTypes.STRING,
    saldo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    verifyToken: DataTypes.STRING,
    role: DataTypes.ENUM('user', 'parker', 'trafficOfficer', 'admin'),
    isVerify: DataTypes.ENUM('true', 'false'),
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function (models) {
   
  }
  return User;
};