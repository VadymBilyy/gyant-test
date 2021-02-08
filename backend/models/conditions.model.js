const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conditionSchema = new Schema(
	{
		conditions: {
			type: Object,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Conditions = mongoose.model('reasons', conditionSchema);

module.exports = Conditions;
