/**
 * Created by Mordekaiser on 25/02/16.
 */
var config = require('../config/config'),
    sendgrid = require('sendgrid')(config.development.sendgridApiKey);
exports.post = function (req, res) {
    var email = new sendgrid.Email();

    email.addTo("josleugim@gmail.com");
    email.setFrom("josemiguel@heuristicforge.com");
    email.setSubject("Mensaje desde litus");
    email.setHtml("Nombre: " + req.body.name + "<br>Email: " + req.body.email + "<br>Mensaje: " + req.body.message);

    sendgrid.send(email, function (err, json) {
        if(err) {
            console.log(err);
            res.status(500);
            res.end();
        }
        console.log(json);
        res.status(200).json({success: true});
        res.end();
    })
};