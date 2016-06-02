/**
 * Created by Mordekaiser on 29/05/16.
 */
var uuid = require('uuid'),
    sendGrid = require('../utilities/sendGrid');

exports.getRefCode = function (req, res) {
    console.log('PAYU GET Reference code');
    var refCode = uuid.v1();
    var signature = require('crypto').createHash("md5").update("4Vj8eK4rloUd272L48hsrarnUA~508029~" + refCode + "~100~MXN").digest("hex");
    res.status(200).json({refCode: refCode, signature: signature});
    res.end();
};

exports.confirmation = function (req, res) {
    console.log('PAYU POST confirmation');
    console.log('Sign: ' + req.body.sign);
    // Only if the payment has success we send a notification to the corresponding reference code
    // it could be a client or a lawyer
    if(req.body.response_message_pol == "APPROVED") {
        // get the reference code that's going to be updated
        var query = {
            referenceCode: req.body.reference_sale
        };
        var data = {
            status: 'Paid out'
        };

        User.update(query, {$addToSet: {notifications: data}}, function (err, doc) {
            if(err) {
                console.log('Error updating notification, email: ' + doc.email + ' Error: ' + err);
            } else {
                // create a user notification
                var notificationData = {
                    status: 'Pending',
                    receiver: doc.email
                };
                User.findOneAndUpdate({email: doc.notifications.receiver}, {$addToSet: {notifications: notificationData}}, {new: true}, function (err, result) {
                    if(err) {
                        console.log('Error creating the notification, _id: ' + query._id + ' Error: ' + err);
                    }
                    if(result) {
                        console.log('Notification created to ' + result.email + ' in response to web checkout (PAYU) from ' + doc.email);
                        // send email notification to user
                        var htmlMessage = "<h4>Tienes una notificación pendiente de " + doc.name + " " + doc.lastName + "</h4>"
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
    }

    res.status(200).json({success: true});
    res.end();
};