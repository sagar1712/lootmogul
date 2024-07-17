const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

class WeatherReport extends Model {}

WeatherReport.init(
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
		location: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		temperature: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		reported_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'WeatherReport',
		tableName: 'weather_reports',
		timestamps: true,
	}
);

WeatherReport.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(WeatherReport, { foreignKey: 'user_id' });

module.exports = WeatherReport;
