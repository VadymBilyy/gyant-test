const router = require('express').Router();
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

router.route('/login').post((req, res) => {
	User.find({ userName: req.body.userName })
		.then((users) => {
			if (users[0] && users[0].password === req.body.password) {
				const token = jwt.sign({ user: req.body.userName }, 'boom');
				res.cookie('authcookie', token, { maxAge: 900000, httpOnly: true });

				return res.status(200).json({ fullName: users[0].fullName });
			}
			return res.status(400).json('Invalid Credentials');
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/logout').post((req, res) => {
	res.cookie('authcookie', '', { maxAge: 0, httpOnly: true });
	return res.status(200).json();
});

module.exports = router;
