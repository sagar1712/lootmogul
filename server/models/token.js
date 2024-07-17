const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Token extends Model {}

Token.init(
	{
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		expire_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		black_listed: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	},
	{
		sequelize,
		modelName: 'Token',
		tableName: 'tokens',
		timestamps: true,
	}
);

module.exports = Token;
