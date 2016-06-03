/**
 * Created by Mordekaiser on 29/05/16.
 */
var uuid = require('uuid'),
    sendGrid = require('../utilities/sendGrid'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Chat = mongoose.model('Chat');

exports.getRefCode = function (req, res) {
    console.log('PAYU GET Reference code');
    var refCode = uuid.v1();
    var signature = require('crypto').createHash("md5").update("4Vj8eK4rloUd272L48hsrarnUA~508029~" + refCode + "~100~MXN").digest("hex");
    res.status(200).json({refCode: refCode, signature: signature});
    res.end();
};

exports.confirmation = function (req, res) {
    console.log('POST client PayU confirmation');
    console.log('Sign: ' + req.body.sign);
    // Only if the payment has success we send a notification to the corresponding reference code
    // it could be a client or a lawyer
    if(req.body.response_message_pol == "APPROVED") {
        // get the reference code that's going to be updated
        var query = {
            "notifications.referenceCode": req.body.reference_sale
        };
        var data = {
            "notifications.$.status": 'Paid out'
        };

        // updates the client status
        User.findOneAndUpdate(query, {$set: data}, function (err, doc) {
            if(err) {
                console.log('Error updating notification, email: ' + doc.email + ' Error: ' + err);
            } else  {
                // create a user notification
                var notificationData = {
                    status: 'Pending',
                    receiver: doc.email
                };
                var lawyerQuery = {};
                for(var i=0; i < doc.notifications.length; i++) {
                    if(doc.notifications[i].referenceCode == req.body.reference_sale) {
                        lawyerQuery.email = doc.notifications[i].receiver;
                        notificationData._id = doc.notifications[i]._id;
                    }
                }
                // creates the lawyer notification, with same _id of the client notification
                User.findOneAndUpdate(lawyerQuery, {$addToSet: {notifications: notificationData}}, {new: true}, function (err, result) {
                    if(err) {
                        console.log('Error creating the notification, _id: ' + query._id + ' Error: ' + err);
                    }
                    if(result) {
                        console.log('Notification created to ' + result.email + ' in response to web checkout (PAYU) from ' + doc.email);
                        // send email notification to user
                        var htmlMessage = "<h4>Tienes una notificación pendiente de " + result.name + " " + result.lastName + "</h4>"
                            + "<p>Para poder concretar una cita entra a Litus e inicia sesión</p>"
                            + "<a href='localhost:5002/login' target='_blank'>Entrar a Litus</a>";
                        if(sendGrid.sendMail(result.email, "josemiguel@heuristicforge.com", "Notificación pendiente", htmlMessage)) {
                            console.log('Email send to ' + result.email);
                        } else
                            console.log('Fail to send email to: ' + result.email);
                    }
                });
            }
        });
        res.status(200).json({success: true});
        res.end();
    } else {
        res.status(403);
        res.end();
    }
};

exports.lawyerConfirmation = function (req, res) {
    console.log('POST lawyer confirmation');

    if(req.body.response_message_pol == "APPROVED") {
        // get the reference code that's going to be updated
        var query = {
            "notifications.referenceCode": req.body.reference_sale
        };
        var data = {
            "notifications.$.status": 'Paid out'
        };

        // updates the lawyer status
        User.findOneAndUpdate(query, {$set: data}, function (err, doc) {
            if(err) {
                console.log('Error updating notification, email: ' + doc.email + ' Error: ' + err);
            }
            
            if(doc) {
                var notificationQuery = {};
                // get the _id of the notification so we can create the chat with the corresponding users
                for(var i=0; i < doc.notifications.length; i++) {
                    if(doc.notifications[i].referenceCode && doc.notifications[i].referenceCode == req.body.reference_sale) {
                        notificationQuery["notifications._id"] = doc.notifications[i]._id;
                    }
                }

                console.log(notificationQuery);
                // finds all the documents that have the same _id notification
                User.find(notificationQuery, function (err, docs) {
                    if(err) {
                        res.status(500).json({success: false});
                        res.end();
                    }

                    if(docs.length > 0) {
                        // create a chat for the current lawyer and user
                        var chat = new Chat();
                        chat.status = 'Active';
                        for(var i=0; i < docs.length; i++) {
                            if(docs[i].roles.indexOf("cliente") != -1) {
                                chat.client_id = docs[i]._id;
                            }
                            if(docs[i].roles.indexOf("abogado") != -1) {
                                chat.lawyer_id = docs[i]._id;
                            }
                        }

                        chat.save();
                    }
                });
            }
        });

        res.status(200).json({success: true});
        res.end();
    } else {
        res.status(500);
        res.end();
    }
};