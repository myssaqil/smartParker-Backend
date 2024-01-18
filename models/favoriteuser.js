'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FavoriteUser.init({
    U_ID: DataTypes.INTEGER,
    DVC_ID: DataTypes.STRING,
    PKG_HEAD_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoriteUser',
  });
  FavoriteUser.associate = function (models) {
    FavoriteUser.belongsTo(models.ParkingHeader, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingHeader'
    });
  };
  return FavoriteUser;
};