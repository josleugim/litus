/**
 * Created by Mordekaiser on 22/05/16.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp');

var imageSchema = mongoose.Schema({
    name: {
        type: String,
        required:'{PATH} requerido'
    },
    isActive: {type: Boolean, default: true}
});

imageSchema.plugin(timestamps);
module.exports = mongoose.model('Image', imageSchema);