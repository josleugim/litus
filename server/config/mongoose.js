/**
 * Created by Mordekaiser on 05/02/16.
 */
var mongoose = require('mongoose'),
    sectionModel = require('../models/Section');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Litus db opened');
    });

    sectionModel.createDefaultSections();
};