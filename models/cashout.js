'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CashOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CashOut.init({
    u_id: DataTypes.INTEGER,
    account_number: DataTypes.STRING,
    account_holder_name: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    nominal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CashOut',
  });
  return CashOut;
};