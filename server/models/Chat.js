/**
 * Created by Mordekaiser on 01/03/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var chatSchema = new Schema({
    status: {type: String},
    conversation: [{
        _id: false,
        user_id: {type: String},
        message: {type: String},
        createdAt: {type: Date, default: Date.now}
    }],
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Chat', chatSchema);