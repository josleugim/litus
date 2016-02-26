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
        sendgridApiKey: "",

    },
    production: {
        db: 'mongodb://localhost/litus_production',
        rootPath: rootPath,
        port: process.env.PORT || 5000
    }
};