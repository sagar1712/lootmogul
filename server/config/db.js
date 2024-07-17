require('dotenv').config();
const { Pool } = require('pg');
const { Sequelize } = require('sequelize');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const dbConfig = {
	host: PGHOST,
	database: PGDATABASE,
	username: PGUSER,
	password: PGPASSWORD,
	port: 5432,
	dialect: 'postgres',
	ssl: true,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
};

// For direct Postgres connections
const sql = new Pool(dbConfig);

// For Sequelize ORM
const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect,
		port: dbConfig.port,
		ssl: dbConfig.ssl,
		dialectOptions: dbConfig.dialectOptions,
		logging: console.log, // This will log the SQL queries, helpful for debugging
	}
);

// Test the Sequelize connection
sequelize
	.authenticate()
	.then(() =>
		console.log('Database connection has been established successfully.')
	)
	.catch((err) => console.error('Unable to connect to the database:', err));

module.exports = {
	sql,
	sequelize,
	dbConfig,
};
