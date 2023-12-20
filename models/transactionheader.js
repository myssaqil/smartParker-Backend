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
    transactionId: DataTypes.STRING,
    transactionType: DataTypes.ENUM('BILLPAYMENT', 'PARKING', 'TOPUP'),
    status: DataTypes.ENUM('FAILED', 'SUCCESS', 'PENDING'),
  }, {
    sequelize,
    modelName: 'TransactionHeader',
  });
  return TransactionHeader;
};