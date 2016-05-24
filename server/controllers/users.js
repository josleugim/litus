/**
 * Created by Mordekaiser on 17/02/16.
 */
var encrypt = require('../utilities/encryption'),
    sendGrid = require('../utilities/sendGrid'),
    randomPass = require('random-password'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.post = function (req, res) {
    console.log('POST User');
    // Create an object, with the params we expect from the scary internet
    var roles = [];
    var data = {};
    var salt, hash;
    if(req.body.name)
        data.name = req.body.name;
    if(req.body.lastName)
        data.lastName = req.body.lastName;
    if(req.body.email)
        data.email = req.body.email;
    if(req.body.phone)
        data.phone = Number(req.body.phone);
    if(req.body.password) {
        salt = encrypt.createSalt();
        hash = encrypt.hashPwd(salt, req.body.password);
        data.salt = salt;
        data.hashed_pwd = hash;
    }
    if(req.body.address)
        data.address = req.body.address;
    if(req.body.economicActivities)
        data.economicActivities = req.body.economicActivities;
    if(req.files['constitutiveAct'])
        data.constitutiveAct = req.files['constitutiveAct'][0].filename;
    if(req.files['professionalLicense'])
        data.professionalLicense = req.files['professionalLicense'][0].filename;
    if(req.files['curriculum'])
        data.curriculum = req.files['curriculum'][0].filename;
    if(req.files['profilePicture'])
        data.profilePicture = req.files['profilePicture'][0].filename;
    if(req.body.specialityArea)
        data.specialityArea = req.body.specialityArea;
    if(req.body.description)
        data.description = req.body.description;
    if(req.body.keyWords)
        data.keyWords = req.body.keyWords;
    if(req.body.languages)
        data.languages = req.body.languages;
    if(req.body.references)
        data.references = req.body.references
    if(req.body.casePerMonth)
        data.casePerMonth = Number(req.body.casePerMonth);
    if(req.body.type && (req.body.type == "cliente" || req.body.type == "abogado")) {
        roles.push(req.body.type);
        roles.push('user');
        data.roles = roles;
    }

    var user = new User(data);
    user.save(function (err, collection) {
        if(err) {
            console.log('Error al guardar el registro del usuario: ' + err);
            res.status(500).json({success: false, error: 'No se pudo guardar el usuario, error: ' + err.errmsg});
            res.end();
        } else {
            var htmlMessage = "<p>Verifica tu cuenta de Correo Electrónico</p>"
                + "<p>Hola, estas recibiendo el siguiente correo, ya que te registraste en Litus. Para activar tu cuenta por favor dale click en el botón de verificar.</p>"
                + "<p>De no ser así, ignora este correo electrónico.</p>"
                + "<a href='http://www.litus.mx/api/users/verify?_id=" + collection._id + "'>Verificar</a>";
            // send the verification email
            sendGrid.sendMail(data.email, "josemiguel@heuristicforge.com", "Validación de cuenta", htmlMessage);
            res.status(201).json({success: true});
            res.end();
        }
    });
};

exports.get = function (req, res) {
    console.log('GET User');
    var query = {
        roles: {
            $ne: 'admin'
        }
    };

    if(req.query._id) {
        query._id = req.query._id;

        User.findOne(query, function (err, user) {
            if(err) {
                console.log('Error at GET method: ' + err);
                res.status(500);
                res.end();
            } else {
                res.status(200).json(user);
                res.end();
            }
        })
    } else {
        User.find(query)
            .sort({name: -1})
            .limit(10)
            .exec(function (err, users) {
                if(err) {
                    console.log('Error at GET method: ' + err);
                    res.status(500);
                    res.end()
                } else {
                    res.status(200).json(users);
                    res.end();
                }
            })
    }
};

exports.put = function (req, res) {
    console.log('PUT user');

    var query = {
        roles: {
            $ne: 'admin'
        }
    };

    if(req.query._id) {
        query._id = req.query._id;

        var data = {};

        if(req.body.name)
            data.name = req.body.name;
        if(req.body.lastName)
            data.lastName = req.body.lastName;
        if(req.body.description)
            data.description = req.body.description;
        if(req.body.phone)
            data.phone = req.body.phone;
        if(req.body.specialityArea)
            data.specialityArea = req.body.specialityArea;
        if(req.body.keyWords)
            data.keyWords = req.body.keyWords;
        data.isBusy = req.body.isBusy;
        if(req.body.address)
            data.address = req.body.address;
        if(req.body.languages)
            data.languages = req.body.languages;
        if(req.body.experienceYears)
            data.experienceYears = Number(req.body.experienceYears);
        if(req.body.schedule)
            data.schedule = req.body.schedule;

        User.update(query, {$set: data}, function (err) {
            if (err) {
                console.log(err);
                res.status(401).json({success: false, error: err});
            } else {
                res.status(201).json({success: true});
                res.end();
            }
        });
    } else {
        res.status(500);
        res.end();
    }
};

exports.verifyAccount = function (req, res) {
    console.log('Verify account');
    var query = {};
    if(req.query._id)
        query._id = req.query._id;

    User.update(query, {$set: {isActive: true}}, function (err, numAffected) {
        if(err) {
            console.log('No se pudo verificar la cuenta, error: ' + err);
            res.redirect('/account/verify?res=false');
        }

        if(numAffected.nModified > 0) {
            res.redirect('/account/verify');
            res.end();
        } else {
            console.log('No se pudo verificar la cuenta, error: ' + err);
            res.redirect('/account/verify?res=false');
            res.end();
        }

    })
};

exports.getLawyers = function (req, res) {
    console.log('GET Lawyers');

    var query = {
        roles: {
            $nin: ['admin', 'cliente']
        },
        isBusy: false
    };
    var limit, skip;

    if(req.query.specialityArea)
        query.specialityArea = req.query.specialityArea;

    User.find(query)
        .sort({name: -1})
        .limit(10)
        .skip(0)
        .exec(function (err, users) {
            if(err) {
                console.log('Error at GET method: ' + err);
                res.status(500);
                res.end()
            } else {
                res.status(200).json(users);
                res.end();
            }
        })

};

exports.passRecoverNotification = function (req, res) {
    console.log('GET Pass Recover notification');
    var query = {
        email: req.query.email
    };

    console.log(query);
    var htmlMessage = "<p>Has solicitado un cambio de contraseña para litus.mx</p>"
        + "<p>Hola, estas recibiendo el siguiente correo, ya que solicitaste un cambio de contraseña</p>"
        + "<p>De no ser así, ignora este correo electrónico.</p>"
        + "<a href='http://www.litus.mx/api/users/recover?email=" + query.email + "'>Cambiar contraseña</a>";
    // send the verification email
    sendGrid.sendMail(query.email, "josemiguel@heuristicforge.com", "Recuperación de contraseña", htmlMessage)
    res.status(200).json({success: true});
    res.end();
};

exports.passRecover = function (req, res) {
    console.log('GET Pass Recover');
    var salt, hash, newPass;
    var query = {
        email: req.query.email
    };

    var data = {};
    newPass = randomPass(6);

    salt = encrypt.createSalt();
    hash = encrypt.hashPwd(salt, newPass);
    data.salt = salt;
    data.hashed_pwd = hash;

    User.update(query, {$set: data}, function (err, numAffected) {
        if(err) {
            console.log('No se pudo cambiar la contraseña, error: ' + err);
            res.status(500);
            res.end();
        }

        if(numAffected.nModified > 0) {
            var htmlMessage = "<p>Nueva contraseña para litus.mx</p>"
                + "<p>Hola, estas recibiendo el siguiente correo, ya que solicitaste un cambio de contraseña</p>"
                + "<p>Tu nueva contraseña es la siguiente: <b>" + newPass + "</b></p>"
                + "<p>Te recomendamos cambiarla una vez que inicies sesión.</p>";
            // send the verification email
            sendGrid.sendMail(query.email, "josemiguel@heuristicforge.com", "Recuperación de contraseña", htmlMessage);
            res.redirect('/password-recover?res=true');
            res.end();
        } else {
            console.log('No se pudo cambiar la contraseña, error: ' + err);
            res.redirect('/password-recover?res=false');
            res.end();
        }

    })
};

exports.changePassword = function (req, res) {
    console.log('PUT Change password');
    var salt, hash;
    var query = {
        _id: req.query._id
    };

    User.findOne(query).exec(function (err, user) {
        // when the user is return we validate the password
        if (user && user.authenticate(req.body.password)) {
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, req.body.newPass);
            user.salt = salt;
            user.hashed_pwd = hash;
            user.save();
            
            res.status(200).json({success: true});
            res.end();
        } else {
            res.status(500).json({success: false});
            res.end();
        }
    });
};