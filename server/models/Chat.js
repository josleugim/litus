/**
 * Created by Mordekaiser on 01/03/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var chatSchema = new Schema({
    client_id: {type: String},
    lawyer_id: {type: String},
    status: {type: String},
    conversation: [{
        _id: false,
        completeName: {type: String},
        message: {type: String},
        createdAt: {type: Date, default: Date.now}
    }],
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Chat', chatSchema);