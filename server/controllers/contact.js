/**
 * Created by Mordekaiser on 25/02/16.
 */
var config = require('../config/config'),
    sendgrid = require('sendgrid')(config.development.sendgridApiKey),
    request = require('request'),
    ip = require('ip');

exports.post = function (req, res) {
    var data = {
        secret: config.development.captchaSecret,
        response: req.body['g-recaptcha-response'],
        remoteip: ip.address()
    };

    request({
        method: 'POST',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        form: data,
        headers: {
            'Content-type':'application/x-www-form-urlencoded'
        }},
        function (err, response) {
            if(err) {
                console.log('Captcha err: ');
                console.log(err);
            }
            var resParse = JSON.parse(response.body);
            if(resParse.success) {
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
                    res.status(200).json({success: true});
                    res.end();
                })
            } else {
                var error = {
                    message: "Robots Not allowed (Captcha verification failed)",
                    captchaResult: resParse.success,
                    captcahErrCodes: resParse['error-codes']
                };
                console.log(err);
                res.status(500).json(error);
                res.end();
            }
        });
};