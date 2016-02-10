/**
 * Created by Mordekaiser on 05/02/16.
 */
var auth = require('./auth');

module.exports = function (app) {
    // passing the function requireApiLogin, not invoke it
    app.get('/api/sections');

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.get('*', function (req, res) {
        // Bootstrapped the user
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};