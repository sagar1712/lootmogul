const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

class NewsArticle extends Model {}

NewsArticle.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		published_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'NewsArticle',
		tableName: 'news_articles',
		timestamps: true,
	}
);

NewsArticle.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(NewsArticle, { foreignKey: 'user_id' });

module.exports = NewsArticle;
