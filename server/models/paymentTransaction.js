const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

class PaymentTransaction extends Model {}

PaymentTransaction.init(
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
		amount: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		currency: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		transaction_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'PaymentTransaction',
		tableName: 'payment_transactions',
		timestamps: true,
	}
);

PaymentTransaction.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(PaymentTransaction, { foreignKey: 'user_id' });

module.exports = PaymentTransaction;
