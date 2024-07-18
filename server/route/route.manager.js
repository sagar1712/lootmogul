const authRoute = require('./auth.route');
const helloRoute = require('./hello.route');

const routeManager = (app) => {
	app.use('/', helloRoute);
	app.use('/auth', authRoute);
};

module.exports = routeManager;
