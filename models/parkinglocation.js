'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ParkingLocation.init({
    name: DataTypes.STRING,
    u_id: DataTypes.INTEGER,
    street: DataTypes.TEXT,
    imagePath: DataTypes.TEXT,
    subLocality: DataTypes.STRING,
    subAdministrativeArea: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longtitude: DataTypes.STRING,
    slot: DataTypes.INTEGER,
    slotTotal: DataTypes.INTEGER,
    fee: DataTypes.INTEGER,
    byHour: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ParkingLocation',
  });
  return ParkingLocation;
};