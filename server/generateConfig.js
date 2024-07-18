require('dotenv').config();
const fs = require('fs');

const config = {
	development: {
		username: process.env.PG_USERNAME,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
	test: {
		username: process.env.PG_USERNAME,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
	production: {
		username: process.env.PG_USERNAME,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};

fs.writeFileSync('config/config.json', JSON.stringify(config, null, 2));
console.log('config.json has been generated');
