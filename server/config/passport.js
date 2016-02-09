/**
 * Created by Mordekaiser on 05/02/16.
 */
var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    //User = mongoose.model('User'),
    request = require('request');

module.exports = function() {

    // Using our db to make the login trough passport
    passport.use(new LocalStrategy(
        function (username, password, done) {
            /*User.findOne({username:username}).exec(function (err, user) {
             console.log(user);
             if(user && user.authenticate(password)) {
             return done(null, user);
             } else {
             return done(null, false);
             }
             });*/
            // request the login trough the API
            request({
                url: "http://localhost:5000/api/v1/login/",
                method: "POST",
                json: true,
                body: {username: username, hashed_pwd: password}
            }, function (err, response, body) {
                var user = body.user,
                    token = body.token;
                if(err) {return next(err);}

                if(!user) return done(null, false);

                return done(null, user, token);
            });
        }
    ));

    // Serialize our User, passport uses this function
    passport.serializeUser(function(user, done) {
        if(user) {
            done(null, user._id);
        }
    });

    // Deserialize our user, passport uses this function
    passport.deserializeUser(function (id, done) {
        User.findOne({_id:id}).exec(function (err, user) {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    });
};