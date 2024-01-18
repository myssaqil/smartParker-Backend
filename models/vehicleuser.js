'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VehicleUser.init({
    U_ID: DataTypes.INTEGER,
    LICENSE_PLATE: DataTypes.STRING,
    VHC_NAME: DataTypes.STRING,
    VHC_TYPE: DataTypes.ENUM('MOTORCYCLE', 'CAR', )
  }, {
    sequelize,
    modelName: 'VehicleUser',
  });
  return VehicleUser;
};