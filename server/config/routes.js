/**
 * Created by Mordekaiser on 05/02/16.
 */
var auth = require('./auth'),
    sections = require('../controllers/sections'),
    users = require('../controllers/users'),
    multer = require('multer'),
    upload = multer({dest: 'public/uploads/'});

module.exports = function (app) {
    // passing the function requireApiLogin, not invoke it
    app.get('/api/sections', sections.get);
    app.get('/api/sections/:slug', sections.getBySlug);
    app.put('/api/sections/', sections.editSectionBySlug);

    app.post('/api/users', upload.fields([{name: 'constitutiveAct'}, {name: 'professionalLicense'}]), users.post);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.get('/admin', auth.requiresRole('admin'), function (req, res) {
        // Bootstrapped the user
        res.render('admin', {
            bootstrappedUser: req.user
        });
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