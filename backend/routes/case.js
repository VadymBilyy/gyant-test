const router = require('express').Router();
let Case = require('../models/case.model');

router.route('/').get((req, res) => {
	Case.find()
		.then((cases) => {
			// const notProcessedCases = cases.filter((medCase) => !medCase.isResolved);
			return res.json(cases);
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	Case.findById(req.params.id)
		.then((processedCase) => {
			processedCase.isResolved = processedCase.isResolved;
			processedCase.conditions = req.body.conditions;
			processedCase.description = processedCase.description;

			processedCase
				.save()
				.then((processedCase) => res.json(processedCase))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
