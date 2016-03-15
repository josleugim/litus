/**
 * Created by Mordekaiser on 14/03/16.
 */
var User = require('mongoose').model('User');

exports.post = function (req, res) {
    console.log('POST rate');
    var data = {};
    var query = {};

    if(req.query._id)
        query._id = req.body._id;

    if(req.body.rate)
        data.rate = Number(req.body.rate);
    if(req.body.user_id)
        data.user_id = req.body.user_id;
    if(req.body.status)
        data.status = req.body.status;

    User.update(query, {$set: data}, function (err) {
        if (err) {
            console.log(err);
            res.status(401).json({success: false, error: err});
        } else {
            res.status(201).json({success: true});
            res.end();
        }
    });
};