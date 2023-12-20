'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionParking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionParking.init({
    u_id: DataTypes.INTEGER,
    parker_id: DataTypes.INTEGER,
    info: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status: DataTypes.ENUM('ONGOING', 'FAILED', 'DONE'),
    paymentType: DataTypes.ENUM('PAIDOFF', 'BILL'),
  }, {
    sequelize,
    modelName: 'TransactionParking',
  });
  return TransactionParking;
};