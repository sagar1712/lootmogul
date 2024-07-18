'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PaymentTransaction extends Model {
    static associate(models) {
      // define association here
      PaymentTransaction.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }
  PaymentTransaction.init({
    amount: DataTypes.DECIMAL(10, 2),
    currency: DataTypes.STRING,
    transactionDate: DataTypes.DATE,
    status: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PaymentTransaction',
  });
  return PaymentTransaction;
};