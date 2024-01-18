'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parking_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parking_Detail.init({
    PARKING_NUMBER: DataTypes.INTEGER,
    PKG_HEAD_ID: DataTypes.INTEGER,
    TYPE: DataTypes.ENUM('MOTORCYCLE', 'CAR', )
  }, {
    sequelize,
    modelName: 'Parking_Detail',
  });
  Parking_Detail.associate = function (models) {
    Parking_Detail.belongsTo(models.ParkingHeader, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingHeader'
    });
  };
  return Parking_Detail;
};