/**
 * Created by Mordekaiser on 25/02/16.
 */
var config = require('../config/config'),
    sendgrid = require('../utilities/sendGrid'),
    request = require('request'),
    ip = require('ip');

exports.post = function (req, res) {
    var data = {
        secret: config.production.captchaSecret,
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
                res.status(500).json({error: err});
                res.end();
            }
            console.log("respinse: " + response.body);
            var resParse = JSON.parse(response.body);
            if(resParse.success) {
                var htmlMessage = "Nombre: " + req.body.name + "<br>Email: " + req.body.email + "<br>Mensaje: " + req.body.message;
                sendgrid.sendMail("gerardo.flores.slaughter@gmail.com", "gvite1416@hotmail.com", "Mensaje desde litus", htmlMessage , function(status){
                    if(status) {
                        res.status(200).json({success: true});
                        res.end();
                    } else {
                        res.status(500);
                        res.end();
                    }
                });
            } else {
                var error = {
                    message: "Robots Not allowed (Captcha verification failed)",
                    captchaResult: resParse.success,
                    captcahErrCodes: resParse['error-codes']
                };
                console.log('ReCaptcha error: ' + err);
                res.status(500).json(error);
                res.end();
            }
        });
};