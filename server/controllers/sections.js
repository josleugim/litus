/**
 * Created by Mordekaiser on 09/02/2016.
 */
var Section = require('mongoose').model('Section');

exports.get = function(req, res) {
    console.log(req.query);
    Section.find({}).exec(function (err, sections) {
        if(!err) {
            res.send(sections).status(200);
        } else
            res.status(500);
    })
};

exports.getById = function(req, res) {
    console.log(req.params);
    //Section.findOne({})
    res.end();
}