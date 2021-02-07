const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = new Schema(
	{
		description: {
			type: String,
			required: true,
		},
		isResolved: {
			type: Boolean,
			required: true,
		},
		conditions: {
			type: Array,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
