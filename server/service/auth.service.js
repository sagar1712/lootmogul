const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const userService = require('./user.service');
const db = require('../models');
const Token = db.token;
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/token');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
	const user = await userService.getUserByEmail(email);
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return null;
	}
	return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
	const refreshTokenDoc = await Token.findOne({
		where: {
			token: refreshToken,
			type: tokenTypes.REFRESH,
			black_listed: false,
		},
	});
	if (!refreshTokenDoc) {
		return null;
	}
	await refreshTokenDoc.destroy();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
	try {
		const refreshTokenDoc = await tokenService.verifyToken(
			refreshToken,
			tokenTypes.REFRESH
		);
		const user = await userService.getUserById(refreshTokenDoc.user_id);
		if (!user) {
			throw new Error();
		}
		await refreshTokenDoc.destroy();
		return tokenService.generateAuthTokens(user);
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
	}
};

module.exports = {
	loginUserWithEmailAndPassword,
	logout,
	refreshAuth,
};
