/**
 * Created by Mordekaiser on 05/02/16.
 */
var auth = require('./auth'),
    sections = require('../controllers/sections');

module.exports = function (app) {
    // passing the function requireApiLogin, not invoke it
    app.get('/api/sections', sections.get);
    app.get('/api/sections/:slug', sections.getBySlug);
    app.put('/api/sections/', sections.editSectionByID);

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