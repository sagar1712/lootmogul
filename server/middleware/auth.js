const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const { getUserById } = require('../service/user.service');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const verifyCallback =
	(req, resolve, reject, requiredRights) => async (err, user, info) => {
		console.log(user, info);
		if (err || info || !user) {
			return reject(
				new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
			);
		}
		req.user = user;
		if (requiredRights.length) {
			const userRights = roleRights.get(user.role);
			const hasRequiredRights = requiredRights.every((requiredRight) =>
				userRights.includes(requiredRight)
			);
			if (!hasRequiredRights && req.params.userId !== user.id) {
				return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
			}
		}

		resolve();
	};

const auth =
	(...requiredRights) =>
	async (req, res, next) => {
		passport.use(
			new JwtStrategy(
				{
					jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
					secretOrKey: process.env.JWT_SECRET,
				},
				async (jwtPayload, done) => {
					const userId = jwtPayload.sub;
					const user = await getUserById(userId);
					return done(null, user);
				}
			)
		);
		return new Promise((resolve, reject) => {
			passport.authenticate(
				'jwt',
				{ session: false },
				verifyCallback(req, resolve, reject, requiredRights)
			)(req, res, next);
		})
			.then(() => next())
			.catch((err) => next(err));
	};

module.exports = auth;
