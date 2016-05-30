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
    console.log(req.body);
    res.status(200);
    res.end();
};