/**
 * Created by Mordekaiser on 28/02/16.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Chat = mongoose.model('Chat'),
    sendGrid = require('../utilities/sendGrid');

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

    if(req.query._id) {
        query._id = req.query._id;
    }
    data.status = "Pending";
    if(req.body.referenceCode) {
        data.referenceCode = req.body.referenceCode;
    }

    if(req.body.lawyerEmail) {
        data.lawyerEmail = req.body.lawyerEmail;

        // create the client notification
        User.findOneAndUpdate(query, {$addToSet: {notifications: data}}, {new: true}, function (err, doc) {
            if(err) {
                console.log('Error creating the notification, _id: ' + query._id + ' Error: ' + err);
                res.status(500).json({success: false});
                res.end();
            }

            // add a notification for each lawyer
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
        "notifications._id": req.body.notification_id
    };

    // finds all the documents that have the same _id notification
    User.find(query, function (err, docs) {
        if(err) {
            res.status(500).json({success: false});
            res.end();
        }

        if(docs) {
            // create a chat for the current lawyer and user
            var chat = new Chat();
            chat.status = 'Active';
            chat.client_id = req.query.client_id;
            chat.lawyer_id = req.body.lawyer_id;
            chat.save();

            console.log(chat);

            docs.forEach(function (user) {
                // For the client and the lawyer that accept the appointment the status is set to active
                if(user._id == req.query.client_id || user._id == req.body.lawyer_id) {
                    // adding the chat id for the user
                    //user.chats.push(chat._id);
                    user.notifications.forEach(function (notification) {
                        if(notification._id == req.body.notification_id) {
                            notification.status = "Active";
                            notification.updateAt = Date.now();
                        }
                    })
                } else {
                    // Change the status for the rest of the lawyers
                    user.notifications.forEach(function (notification) {
                        if(notification._id == req.body.notification_id) {
                            notification.status = "Expired";
                            notification.updateAt = Date.now();
                        }
                    })
                }

                user.save();
            });

            res.status(200).json({success: true});
            res.end();
        }
    });
};