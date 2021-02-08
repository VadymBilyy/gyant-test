const router = require('express').Router();
let Conditions = require('../models/conditions.model');

router.route('/').get((req, res) => {
	Conditions.find()
		.then((conditions) => res.json(conditions))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
