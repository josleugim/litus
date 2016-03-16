/**
 * Created by Mordekaiser on 03/03/16.
 */
var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat'),
    User = mongoose.model('User');

exports.getChatUsers = function (req, res) {
    console.log('GET chat users');
    var query = {};

    if(req.query.client_id)
        query.client_id = req.query.client_id;

    if(req.query.lawyer_id)
        query.lawyer_id = req.query.lawyer_id;

    Chat.find(query, function (err, chats) {
        if(err) {
            console.log('Error retrieving chat, error: ' + err);
            res.status(500).json({success: false});
            res.end();
        }

        if(chats) {
            // new array to store the client and chat info
            // we send the array until the forEach finish
            var documents = [];
            var waiting = chats.length;
            chats.forEach(function (chat) {
                var innerQuery = {};
                if(query.lawyer_id)
                    innerQuery._id = chat.client_id;
                if(query.client_id)
                    innerQuery._id = chat.lawyer_id;

                User.findOne(innerQuery, function (err, doc) {
                    if(err)
                        console.log('Error retrieving user, error: ' + err);

                    if(doc) {
                        var document = {
                            completeName: doc.name + " " + doc.lastName,
                            chat_id: chat._id
                        };
                        documents.push(document);
                    }
                    waiting--;

                    if(waiting == 0) {
                        res.status(200).json(documents);
                        res.end();
                    }
                });
            });
        }
    });
};

exports.get = function (req, res) {
    console.log('GET chat');
    var query = {};

    if(req.query._id)
        query._id = req.query._id;

    Chat.findOne(query, function (err, chat) {
        if(err) {
            console.log('Error retrieving chat, error: ' + err);
            res.status(500).json({success: false});
            res.end();
        }

        if(chat) {
            res.status(200).json(chat);
            res.end();
        }
    });
};

exports.put = function (req, res) {
    console.log('PUT conversation');
    var query = {};
    var data = {};
    if(req.query.chat_id)
        query._id = req.query.chat_id;
    if(req.body.message)
        data.message = req.body.message;
    if(req.body.completeName)
        data.completeName = req.body.completeName;

    // http://stackoverflow.com/questions/30419575/mongoose-findbyidandupdate-not-returning-correct-model
    Chat.findByIdAndUpdate(query._id, {$addToSet: {"conversation": data}}, {new: true}, function (err, doc) {
        if (err) {
            console.log(err);
            res.status(401).json({success: false, error: err});
        } else {
            var index = doc.conversation.length;
            // send the last message to emit it with socket.io
            res.status(201).json(doc.conversation[index -1]);
            res.end();
        }
    });
};