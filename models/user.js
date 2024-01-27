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
    U_MAIL: DataTypes.STRING,
    U_PASSWORD: DataTypes.STRING,
    U_IMG:{
      type: DataTypes.STRING,
    },
    U_NAME: DataTypes.STRING,
    U_BALANCE: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    U_VERIFY_TOKEN: DataTypes.STRING,
    U_ROLE: DataTypes.ENUM('USER', 'PARKER', 'ADMIN', 'STAFF', 'EMPLOYEE'),
    U_VERIFY_STATUS: DataTypes.ENUM('TRUE', 'FALSE'),
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function (models) {
   
  }
  return User;
};