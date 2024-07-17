require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

module.exports = {
	development: {
		username: PGUSER,
		password: PGPASSWORD,
		database: PGDATABASE,
		host: PGHOST,
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
	test: {
		// Add test configuration if needed
		dialect: 'postgres',
	},
	production: {
		// Add production configuration if needed
		dialect: 'postgres',
	},
};
