/**
 * Created by Mordekaiser on 05/02/16.
 */
var auth = require('./auth'),
    mongoose = require('mongoose');

module.exports = function (app) {
    // passing the function requireApiLogin, not invoke it
    app.get('/api/users', auth.requiresRole('admin'));
    app.post('/api/users');

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function (req, res) {
        // Bootstrapped the user
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};