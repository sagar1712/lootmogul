const authService = require('../service/auth.service');
const tokenService = require('../service/token.service');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const userServices = require('../service/user.service');

const login = catchAsync(async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await authService.loginUserWithEmailAndPassword(
			email,
			password
		);
		if (!user) {
			return res.status(httpStatus.UNAUTHORIZED).json({
				message: 'Invalid credentials',
			});
		}
		const tokens = await tokenService.generateAuthTokens(user);
		res.status(httpStatus.OK).json({ user, tokens });
	} catch (error) {
		console.error('Login error:', error);
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			message: 'An error occurred during login',
		});
	}
});

const register = catchAsync(async (req, res) => {
	try {
		const user = await userServices.createUser(req.body);
		if (user) {
			const tokens = await tokenService.generateAuthTokens(user);
			return res.status(httpStatus.CREATED).json({ user, tokens });
		}
		res.status(httpStatus.CONFLICT).json({
			message: 'User already exists',
		});
	} catch (error) {
		console.error('Registration error:', error);
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			message: 'An error occurred during registration',
		});
	}
});

const logout = catchAsync(async (req, res) => {
	try {
		await authService.logout(req.body.refreshToken);
		res.status(httpStatus.OK).json({ message: 'Logout successful' });
	} catch (error) {
		console.error('Logout error:', error);
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			message: 'An error occurred during logout',
		});
	}
});

const refreshTokens = catchAsync(async (req, res) => {
	try {
		const tokens = await authService.refreshAuth(req.body.refreshToken);
		res.status(httpStatus.OK).json({ ...tokens });
	} catch (error) {
		console.error('Token refresh error:', error);
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			message: 'An error occurred while refreshing tokens',
		});
	}
});

module.exports = {
	login,
	register,
	logout,
	refreshTokens,
};
