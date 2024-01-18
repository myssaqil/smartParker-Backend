'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHeader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionHeader.init({
    TRX_ID: DataTypes.STRING,
    AMOUNT: DataTypes.INTEGER,
    TRX_TYPE: DataTypes.ENUM('BILLPAYMENT', 'PARKING', 'TOPUP'),
    STATUS: DataTypes.ENUM('FAILED','SUCCESS', 'PENDING', 'REFFUND', 'REFFUND-DONE'),
    PAY: DataTypes.ENUM('CASH','PAYLATER', 'XENDIT'),
  }, {
    sequelize,
    modelName: 'TransactionHeader',
  });
  return TransactionHeader;
};