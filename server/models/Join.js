var mongoose = require('mongoose'),
	timestamps = require('mongoose-timestamp');

var joinSchema = mongoose.Schema({
	name: {
		type: String,
        required:'{PATH} requerido'
	},
	lastName: {type: String},
	email: {type: String},
	phone: {type: String},
	comments: {type: String}
});

joinSchema.plugin(timestamps);
module.exports = mongoose.model('Join', joinSchema);