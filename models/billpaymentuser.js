'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillPaymentUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BillPaymentUser.init({
    u_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    status: DataTypes.ENUM('FAILED', 'DONE'),
  }, {
    sequelize,
    modelName: 'BillPaymentUser',
  });
  return BillPaymentUser;
};