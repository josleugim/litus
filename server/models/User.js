/**
 * Created by Mordekaiser on 17/02/16.
 */
var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption'),
    timestamps = require('mongoose-timestamp');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: '{PATH} nombre requerido'
    },
    lastName: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String,
        required: '{PATH} email requerido',
        unique: true
    },
    salt: {
        type: String,
        required: '{PATH} requerido'
    },
    hashed_pwd: {
        type: String,
        required: '{PATH} password requerido'
    },
    economicActivities: {type: String},
    constitutiveAct: {type: String},
    professionalLicense: {type: String},
    specialityArea: {type: String},
    description: {type: String},
    roles: [{
        type: String,
        required: 'Requerido',
        default: 'cliente'
    }],
    rating: [{
        _id: false,
        rate: {type: Number},
        user_id: {type: String}
    }],
    isActive: {
        type: Boolean,
        required: 'Requerido',
        default: true
    }
});

userSchema.plugin(timestamps);
userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    toJSON: function () {
        var user = this.toObject();
        delete user.hashed_pwd;
        delete user.salt;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.isActive;
        delete user._id;
        return user;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if(collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'demo');
            User.create({
                name: 'José Miguel',
                lastName: 'Ramírez',
                email: 'josleugim@gmail.com',
                salt: salt,
                hashed_pwd: hash,
                roles: ["admin"],
                isActive: true
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'demo');
            User.create({
                name: 'Pedro',
                lastName: 'Perez Pacheco',
                email: 'cliente@domain.com',
                salt: salt,
                hashed_pwd: hash,
                roles: ["cliente"],
                isActive: true
            });
        }
    })
}

exports.createDefaultUsers = createDefaultUsers;