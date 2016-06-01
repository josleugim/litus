/**
 * Created by Mordekaiser on 29/05/16.
 */
var uuid = require('uuid');

exports.getRefCode = function (req, res) {
    console.log('PAYU GET Reference code');
    var refCode = uuid.v1();
    var signature = require('crypto').createHash("md5").update("4Vj8eK4rloUd272L48hsrarnUA~508029~" + refCode + "~100~MXN").digest("hex");
    res.status(200).json({refCode: refCode, signature: signature});
    res.end();
};

exports.confirmation = function (req, res) {
    console.log('PAYU POST confirmation');

    //var lastIndex = doc.notifications.length -1;
    console.log(req.body);
    console.log('Reference Code: ' + req.body.reference_sale);
    // save the notification to the lawyers with the same _id
    /*var notification = {
        _id: doc.notifications[lastIndex]._id,
        client_id: doc._id,
        status: 'Pending',
        referenceCode: doc.referenceCode
    };

    User.update({email: req.body.lawyerEmail}, {$addToSet: {notifications: notification}}, function (err, result) {
        if(err) {
            console.log('Error creating notification, email: ' + req.body.lawyerEmail + ' Error: ' + err);
        } else {
            // send email notification to lawyer
            var htmlMessage = "<h4>Tienes una notificación pendiente de " + doc.name + " " + doc.lastName + "</h4>"
                + "<p>Para poder concretar una cita entra a Litus e inicia sesión</p>"
                + "<a href='localhost:5002/login' target='_blank'>Entrar a Litus</a>";
            if(sendGrid.sendMail(req.body.lawyerEmail, "josemiguel@heuristicforge.com", "Notificación pendiente", htmlMessage)) {
                console.log('Email send to ' + req.body.lawyerEmail);
            } else
                console.log('Fail to send email to: ' + req.body.lawyerEmail);
        }
    });*/

    res.status(200);
    res.end();
};