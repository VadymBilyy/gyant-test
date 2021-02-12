const router = require('express').Router();
let Case = require('../models/case.model');

router.route('/').get((req, res) => {
	Case.find()
		.then((cases) => {
			const notProcessedCases = cases.filter((medCase) => !medCase.isResolved);
			return res.json(notProcessedCases);
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/refresh/').post((req, res) => {
	Case.updateMany({
		$set: {
			conditions: [],
			isResolved: false,
		},
	})
		.then(() => res.status(200).json())
		.catch((err) => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
	Case.findByIdAndUpdate(req.params.id, {
		$set: {
			isResolved: true,
			conditions: req.body.conditions,
		},
	})
		.then(() => res.status(200).json())
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
