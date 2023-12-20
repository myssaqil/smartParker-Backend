'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReportParking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReportParking.init({
    u_id: DataTypes.INTEGER,
    videoPath: DataTypes.TEXT,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    platenumber: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ReportParking',
  });
  return ReportParking;
};