'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionCashOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionCashOut.init({
    u_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    merchantName: DataTypes.STRING,
    merchantNumber: DataTypes.STRING,
    status: DataTypes.ENUM('FAILED', 'PENDING', 'DONE'),
  }, {
    sequelize,
    modelName: 'TransactionCashOut',
  });
  return TransactionCashOut;
};