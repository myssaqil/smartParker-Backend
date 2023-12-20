'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TokenDevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TokenDevice.init({
    id_user: DataTypes.INTEGER,
    token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TokenDevice',
  });
  return TokenDevice;
};