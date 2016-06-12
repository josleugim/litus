/**
 * Created by Mordekaiser on 28/02/16.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.get = function (req, res) {
    console.log('GET notifications');
    var query = {};
    if(req.query._id) {
        query._id = req.query._id;
    }

    User.find(query)
        .sort({created: -1})
        .limit(10)
        .exec(function (err, users) {
            if(err) {
                console.log('Error at GET method: ' + err);
                res.status(500);
                res.end()
            } else {
                res.status(200).json(users.notifications);
                res.end();
            }
        })
};

exports.postNotification = function (req, res) {
    console.log('POST notification');
    var query = {};
    var data = {};

    // Get the id of the user, to create the notification
    if(req.query._id) {
        query._id = req.query._id;
    }
    data.status = "Pending";
    if(req.body.referenceCode) {
        data.referenceCode = req.body.referenceCode;
    }

    if(req.body.lawyerEmail) {
        data.receiver = req.body.lawyerEmail;

        // create a user notification
        User.findOneAndUpdate(query, {$addToSet: {notifications: data}}, {new: true}, function (err, doc) {
            if(err) {
                console.log('Error creating the notification, _id: ' + query._id + ' Error: ' + err);
                res.status(500).json({success: false});
                res.end();
            }
            if(doc) {
                res.status(200).json({success: true});
                res.end();
            }

        });
    } else {
        res.status(400).json({success: false});
        res.end();
    }
};

exports.putNotification = function (req, res) {
    console.log('PUT notification');
    // find the client, then find all the lawyers with the email and update their status
    var query = {
        email: req.query.email,
        "notifications._id": req.query.notification_id
    };

    var data = {
        "notifications.$.referenceCode": req.body.referenceCode
    };

    User.findOneAndUpdate(query, {$set: data}, {upsert:true}, function (err, doc) {
        if(err)
            console.log('Error at updating user document with _id: ' + req.body.notification_id);
        if(doc) {
            res.status(200).json({success: true});
            res.end();
        } else {
            res.status(500);
            res.end();
        }
    });
};