const router = require('express').Router();
let Reasons = require('../models/reasons.model');

router.route('/').get((req, res) => {
	Reasons.find()
		.then((reasons) => res.json(reasons))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
