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
    timestamps: {}
});

var Section = mongoose.model('Section', sectionSchema);

function createDefaultSections() {
    Section.find({}).exec(function (err, collection) {
        if(collection.length === 0) {
            Section.create({title: 'Nosotros', slug: 'nosotros', content: 'Contenido de nosotros', isActive: true});
            Section.create({title: 'Garantía', slug: 'garantia', content: 'Contenido de garantía', isActive: true});
        }
    });
}

exports.createDefaultSections = createDefaultSections;