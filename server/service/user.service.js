const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.user;
const createUser = async (params) => {
	const { firstname, lastname, address, username, email, password, role } =
		params;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	const user = {
		firstname,
		lastname,
		username,
		email,
		password: hash,
		role,
		active: 0,
		deleted: 0,
		balance: 0,
		current: 0,
		previous: 0,
	};

	const [row, created] = await User.findOrCreate({
		where: { email: user.email },
		defaults: user,
	});
	return row;
};

const getAllUsers = async (filter, options) => {
	const users = await User.findAll();
	return users;
};

const getUserById = async (id) => {
	return User.findOne({ where: { id } });
};

const getUserByEmail = async (email) => {
	return User.findOne({ where: { email } });
};

module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	getUserByEmail,
};
