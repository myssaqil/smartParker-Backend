'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingHeader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ParkingHeader.init({
    PKG_NAME: DataTypes.STRING,
    U_ID: DataTypes.INTEGER,
    PKG_STREET: DataTypes.TEXT,
    PKG_BANNER_BASE64: DataTypes.TEXT,
    PKG_SUBLOCALITY: DataTypes.STRING,
    PKG_SUB_ADMINISTRATIVE_AREA: DataTypes.STRING,
    PKG_POSTAL_CODE: DataTypes.STRING,
    LATITUDE: DataTypes.STRING,
    LONGITUDE: DataTypes.STRING,
    FEE: DataTypes.INTEGER,
    STATUS: DataTypes.ENUM('ACTIVE', 'NO')
  }, {
    sequelize,
    modelName: 'ParkingHeader',
  });
  return ParkingHeader;
};