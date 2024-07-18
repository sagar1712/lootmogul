'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WeatherReport extends Model {
    static associate(models) {
      // define association here
      WeatherReport.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }
  WeatherReport.init({
    date: DataTypes.DATE,
    temperature: DataTypes.FLOAT,
    humidity: DataTypes.FLOAT,
    windSpeed: DataTypes.FLOAT,
    conditions: DataTypes.STRING,
    location: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WeatherReport',
  });
  return WeatherReport;
};