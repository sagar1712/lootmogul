'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NewsArticle extends Model {
    static associate(models) {
      // define association here
      NewsArticle.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }
  NewsArticle.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    publishDate: DataTypes.DATE,
    category: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NewsArticle',
  });
  return NewsArticle;
};