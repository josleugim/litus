/**
 * Created by Mordekaiser on 16/02/16.
 */
(function () {
    var config = require('../config/config'),
        sendgrid = require('sendgrid')(config.development.sendgridApiKey);

    exports.sendMail = function (to, from, subject, html) {
        var email = new sendgrid.Email();

        email.addTo(to);
        email.setFrom(from);
        email.setSubject(subject);
        email.setHtml(html);

        sendgrid.send(email, function (err, json) {
            if(err) {
                console.log('Error sending email: ' + err);
                return false;
            }
            return true;
        })
    }
}());