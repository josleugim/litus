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
            Section.create({title: 'Abogados', slug: 'abogados', content: 'Contenido de abogados', isActive: true});
            Section.create({title: 'Referidos', slug: 'referidos', content: 'Contenido de referidos', isActive: true});
            Section.create({title: 'Ayuda', slug: 'ayuda', content: 'Contenido de ayuda', isActive: true});
            Section.create({title: 'Únete a Litus', slug: 'unete-a-litus', content: 'Contenido de únete a Litus', isActive: true});
            Section.create({title: 'Términos y condiciones', slug: 'terminos-y-condiciones', content: 'Contenido de términos y condiciones', isActive: true});
            Section.create({title: 'Contacto', slug: 'contacto', content: 'Contenido de contacto', isActive: true});
            console.log('Seed created');
        }
    });
}

exports.createDefaultSections = createDefaultSections;