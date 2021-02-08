const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
	const authcookie = req.cookies.authcookie;
	jwt.verify(authcookie, 'boom', (err) => {
		if (err) {
			res.sendStatus(403);
		} else {
			next();
		}
	});
};

module.exports = checkToken;
