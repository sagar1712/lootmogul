const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller.js');
const validate = require('../middleware/validate.js');
const authValidation = require('../validations/auth.validation.js');
const auth = require('../middleware/auth.js');

router.post('/login', validate(authValidation.login), authController.login);
router.post(
	'/register',
	validate(authValidation.register),
	authController.register
);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post(
	'/refresh-tokens',
	validate(authValidation.refreshTokens),
	authController.refreshTokens
);

module.exports = router;
