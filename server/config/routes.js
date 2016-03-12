/**
 * Created by Mordekaiser on 05/02/16.
 */
var auth = require('./auth'),
    sections = require('../controllers/sections'),
    users = require('../controllers/users'),
    multer = require('multer'),
    upload = multer({dest: 'public/uploads/'}),
    contact = require('../controllers/contact'),
    notifications = require('../controllers/notifications'),
    chats = require('../controllers/chats');

module.exports = function (app) {
    // passing the function requireApiLogin, not invoke it
    app.get('/api/sections', sections.get);
    app.get('/api/sections/:slug', sections.getBySlug);
    app.put('/api/sections/', auth.requiresRole('admin'), sections.editSectionBySlug);

    app.get('/api/users', auth.requiresRole('user'), users.get);
    app.post('/api/users', upload.fields([{name: 'constitutiveAct'}, {name: 'professionalLicense'}]), users.post);
    app.put('/api/users', auth.requiresRole('user'), users.put);
    app.post('/api/users/verify', users.verifyAccount);

    app.post('/api/notifications', auth.requiresRole('user'), notifications.postNotification);
    app.put('/api/notifications', auth.requiresRole('user'), notifications.putNotification);

    app.get('/api/chat/users', auth.requiresRole('user'), chats.getChatUsers);
    app.get('/api/chat', auth.requiresRole('user'), chats.get);
    app.put('/api/chat', auth.requiresRole('user'), chats.put);

    app.post('/api/contact', contact.post);

    app.get('/api/lawyers', auth.requiresRole('user'), users.getLawyers);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.all("/admin/*", auth.requiresRole('admin'), function(req, res, next) {
        next(); // if the middleware allowed us to get here,
                // just move on to the next route handler
    });

    app.all("/perfil/*", auth.requiresRole('cliente'), function(req, res, next) {
        next(); // if the middleware allowed us to get here,
                // just move on to the next route handler
    });

    app.get('*', function (req, res) {
        // Bootstrapped the user
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};