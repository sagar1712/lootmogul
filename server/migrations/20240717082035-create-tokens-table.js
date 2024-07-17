'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('tokens', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			token: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			expire_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			black_listed: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('tokens');
	},
};
