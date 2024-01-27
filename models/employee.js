'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    U_ID: DataTypes.INTEGER,
    EMPLOYE_U_ID: DataTypes.INTEGER,
    PARKING_ID: DataTypes.INTEGER,
    STATUS:DataTypes.ENUM('PENDING', 'ACTIVE')
  }, {
    sequelize,
    modelName: 'Employee',
  });
  Employee.associate = function (models) {
    Employee.belongsTo(models.User, {
      foreignKey: 'EMPLOYE_U_ID',
      as: 'EmployeeDetail'
    });
    Employee.belongsTo(models.ParkingHeader, {
      foreignKey: 'PARKING_ID',
      as: 'ParkingDetail'
    });
    Employee.hasMany(models.TransactionParking, {
      foreignKey: 'EMPLOYEE_ID',
      as: 'EmployeeParkingHandle'
    });
  }
  return Employee;
};