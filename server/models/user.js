const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			defaultValue: 'user',
		},
	},
	{
		sequelize,
		modelName: 'User',
		tableName: 'users',
		timestamps: true,
	}
);

const WeatherReport = require('./WeatherReport');
const NewsArticle = require('./NewsArticle');
const PaymentTransaction = require('./PaymentTransaction');
const Token = require('./Token');

User.hasMany(WeatherReport, { foreignKey: 'user_id' });
WeatherReport.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(NewsArticle, { foreignKey: 'user_id' });
NewsArticle.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(PaymentTransaction, { foreignKey: 'user_id' });
PaymentTransaction.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Token, { foreignKey: 'user_id' });
Token.belongsTo(User, { foreignKey: 'user_id' });

module.exports = User;
