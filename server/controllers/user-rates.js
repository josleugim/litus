/**
 * Created by Mordekaiser on 14/03/16.
 */
var User = require('mongoose').model('User');

exports.post = function (req, res) {
    console.log('POST rate');
    var data = {};
    var query = {
        'rating.user_id': {
            $nin: [req.body.user_id]
        }
    };

    if(req.query.email)
        query.email = req.query.email;

    if(req.body.rate)
        data.rate = Number(req.body.rate);
    if(req.body.user_id)
        data.user_id = req.body.user_id;
    if(req.body.status)
        data.status = req.body.status;
    if(req.body.comment)
        data.comment = req.body.comment;

    User.update(query, {$addToSet: {rating: data}}, function (err, numAffected) {
        if (err) {
            console.log(err);
            res.status(401).json({success: false, error: err});
        }

        if(numAffected.nModified > 0) {
            res.status(201).json({success: true});
            res.end();
        } else {
            res.status(304).json({success: false, error: 'Ya calificaste al usuario'});
            res.end();
        }
    });
};