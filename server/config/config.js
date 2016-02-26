/**
 * Created by Mordekaiser on 05/02/16.
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/litus-dev',
        rootPath: rootPath,
        port: process.env.PORT || 5002,
        sendgridApiKey: "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",
        captchaSecret: ""

    },
    production: {
        db: 'mongodb://localhost/litus_production',
        rootPath: rootPath,
        port: process.env.PORT || 5000
    }
};