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
    PKG_OPEN_TIME: DataTypes.TIME,
    PKG_CLOSE_TIME: DataTypes.TIME,
    PKG_BANNER_BASE64: DataTypes.TEXT,
    LAND_CERTIFICATE: DataTypes.TEXT,
    PKG_SUBLOCALITY: DataTypes.STRING,
    PKG_SUB_ADMINISTRATIVE_AREA: DataTypes.STRING,
    PKG_POSTAL_CODE: DataTypes.STRING,
    LATITUDE: DataTypes.STRING,
    LONGITUDE: DataTypes.STRING,
    FEE: DataTypes.INTEGER,
    TOTAL_SLOT_MOTORCYCLE: DataTypes.INTEGER,
    TOTAL_USED_MOTORCYCLE: DataTypes.INTEGER,
    TOTAL_SLOT_CAR: DataTypes.INTEGER,
    TOTAL_USED_CAR: DataTypes.INTEGER,
    STATUS: DataTypes.ENUM('ACTIVE', 'NO',  'PENDING')
  }, {
    sequelize,
    modelName: 'ParkingHeader',
  });
  ParkingHeader.associate = function (models) {
    ParkingHeader.hasMany(models.Parking_Detail, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingDetailAll'
    });

    //Jika memakai ini wajib beri klausa where STATUS: "ACTIVE" !!!
    ParkingHeader.hasMany(models.Parking_Detail, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingDetailActive',
    });
    //Jika memakai ini wajib beri klausa where STATUS: "USED" !!!
    ParkingHeader.hasMany(models.Parking_Detail, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingDetailUsed',
    });

    //Jika pakai ini harus beri klausa where TYPE: "MOTORCYCLE"
    ParkingHeader.hasMany(models.Parking_Detail, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingDetailMotorAll'
    });

    //Jika memakai ini wajib beri klausa where STATUS: "ACTIVE" !!!
    ParkingHeader.hasMany(models.Parking_Detail, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingDetailMotorActive',
    });
    //Jika memakai ini wajib beri klausa where STATUS: "USED" !!!
    ParkingHeader.hasMany(models.Parking_Detail, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingDetailMotorUsed',
    });
    //Jika pakai ini harus beri klausa where TYPE: "CAR"
    ParkingHeader.hasMany(models.Parking_Detail, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingDetailCarAll'
    });

    //Jika memakai ini wajib beri klausa where STATUS: "ACTIVE" !!!
    ParkingHeader.hasMany(models.Parking_Detail, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingDetailCarActive',
    });
    //Jika memakai ini wajib beri klausa where STATUS: "USED" !!!
    ParkingHeader.hasMany(models.Parking_Detail, {
      foreignKey: 'PKG_HEAD_ID',
      as: 'ParkingDetailCarUsed',
    });
  };
  return ParkingHeader;
};