const hello = (req, res) => {
	res.send({
		status: true,
		code: 200,
		data: {
			message: 'Backend API is ok!',
		},
	});
};

module.exports = {
	hello,
};
