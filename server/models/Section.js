/**
 * Created by Mordekaiser on 09/02/16.
 */
var mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
    title: {
        type: String,
        required:'{PATH} requerido',
        unique: true
    },
    slug: {type: String},
    content: {type: String},
    isActive: {type: Boolean},
    timestamps: true
});

module.exports = mongoose.model('Section', sectionSchema);