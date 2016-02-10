/**
 * Created by Mordekaiser on 09/02/2016.
 */
var Section = require('mongoose').model('Section');

exports.get = function(req, res) {
    Section.find({}).exec(function (err, sections) {
        if(!err)
            res.send(sections);
        else res.status(500);
    })
};