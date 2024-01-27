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
    U_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  EMPLOYEE_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    TRX_ID: {
      type: DataTypes.STRING
    },
    AMOUNT: {
      type: DataTypes.INTEGER
    },
    LICENSE_PLATE: {
      type: DataTypes.STRING
    },
    PARKING_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DATE_START: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    DATE_END: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    DATE_USER_IN: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    DATE_USER_OUT: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    INFO: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    STATUS: {
      type: DataTypes.ENUM('ONGOING',  'WAITINGP', 'FAILED', 'DONE'),
      allowNull: false,
      defaultValue: 'WAITINGP',
    },
    TYPE: {
      type: DataTypes.ENUM('MOTORCYCLE', 'CAR'),
      allowNull: false,
    },
    PAY: {
      type: DataTypes.ENUM('CASH', 'XENDIT'),
      allowNull: false,
    },
    UPDATE_SLOT_START: {
      type: DataTypes.ENUM('Y', 'N'),
      allowNull: false,
      defaultValue: 'N',
    },
    UPDATE_SLOT_END: {
      type: DataTypes.ENUM('Y', 'N'),
      allowNull: false,
      defaultValue: 'N',
    },
  }, {
    sequelize,
    modelName: 'TransactionParking',
  });
  return TransactionParking;
};