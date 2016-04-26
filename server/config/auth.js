/**
 * Created by Mordekaiser on 08/02/16.
 */
var passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

// Does the authentication trough passport
exports.authenticate = function (req, res, next) {
    req.body.username = req.body.email;
    var auth = passport.authenticate('local', function (err, user) {
        if(err) {
            console.log('Error: ' + err);
            return next(err);
        }
        if(!user) {res.send({success: false})}
        // Passport login the user and create a session
        req.logIn(user, function (err) {
            if(err) {
                console.log('Error: ' + err);
                return next(err);
            }

            console.log(user);
            res.send({success: true, user: user});
        });
    });
    auth(req, res, next);
};

exports.requireApiLogin = function (req, res, next) {
    if(!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

exports.requiresRole = function (role) {
    return function (req, res, next) {
        console.log('requires role function ------->');
        console.log(req.user);
        if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
};