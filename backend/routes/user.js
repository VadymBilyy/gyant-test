const router = require('express').Router();
let User = require('../models/user.model');

router.route('/login').post((req, res) => {
	console.log('request: ', req.body);
	User.find({ userName: req.body.userName })
		.then((users) =>
			users[0] && users[0].password === req.body.password
				? res.status(200).json('Login successfull')
				: res.status(400).json('Invalid Credentials'),
		)
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
