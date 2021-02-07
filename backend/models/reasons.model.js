const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reasonsSchema = new Schema(
	{
		reasons: {
			type: Object,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Reasons = mongoose.model('Reasons', reasonsSchema);

module.exports = Reasons;
