/**
 * Created by Mordekaiser on 09/02/2016.
 */
var Section = require('mongoose').model('Section');

exports.get = function(req, res) {
    console.log('GET All Sections');
    Section.find({isActive: true}).exec(function (err, sections) {
        if(!err) {
            res.status(200).json(sections);
        } else
            res.status(500);
    })
};

exports.getBySlug = function(req, res) {
    console.log('GET Section by ID');
    var query = {
        slug: req.params.slug,
        isActive: true
    };

    // Mongoose queries, more info at: http://mongoosejs.com/docs/queries.html
    Section.findOne(query, 'title slug content', function (err, section) {
        if(err) {
            console.log('GET sectionByID Error: ' + err);
            res.status(500);
            res.end();
        }
        else {
            res.status(200).json(section);
            res.end();
        }
    });
};

exports.editSectionByID = function (req, res) {
    console.log('PUT Section by ID');
    var data = {
        content: req.body.content
    };

    var query = {_id: req.params._id};

    Section.update(query, {$set: data}, function (err) {
        if (err) {
            console.log(err);
            res.status(401).json({success: false, error: err});
        } else {
            res.status(201).json({success: true});
            res.end();
        }
    });
};