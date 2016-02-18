/**
 * Created by Mordekaiser on 17/02/16.
 */
var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

exports.post = function (req, res) {
    console.log('POST User');
    // Create an object, with the params we expect from the scary internet
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
    if(req.body.economicActivities)
        data.economicActivities = req.body.economicActivities;
    if(req.files['constitutiveAct'])
        data.constitutiveAct = req.files['constitutiveAct'].filename;
    if(req.files['professionalLicense'])
        data.professionalLicense = req.files['professionalLicense'].filename;
    if(req.body.specialityArea)
        data.specialityArea = req.body.specialityArea;
    if(req.body.description)
        data.description = req.body.description;
    if(req.body.type && (req.body.type == "cliente" || req.body.type == "abogado")) {
        data.roles = req.body.type;
    }

    var user = new User(data)
    user.save(function (err, collection) {
        if(err) {
            console.log('Error al guardar el registro de usuario: ' + err);
            res.status(500).json({error: 'No se pudo guardar el usuario, error: ' + err.errmsg});
            res.end();
        } else {
            res.status(201).json({success: true});
            res.end();
        }
    });
};