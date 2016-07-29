/**
 * Created by Mordekaiser on 05/02/16.
 */

var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
/*app.all(/./, function(req, res, next) {
  var host = req.header("host");
  if (host.match(/^www\../i)) {
    next();
  } else {
    res.redirect(301, "http://www." + host + req.url);
  }
});*/
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

io.on('connection', function(socket){
    // creates an joins a room for each chat_id
    socket.on('joinUser', function (username, room) {
        // store the username and room in the socket session
        socket.username = username;
        socket.room = room;
        // join user to room
        socket.join(room);
        socket.emit('updateConversation', 'Server', 'You have connected to ' + room);
        socket.broadcast.to(room).emit('updateConversation', 'Server', username + ' has connected to the chat');
    });

    // when the user emits a message, this function listens and executes
    socket.on('sendMessage', function (data) {
        io.sockets.in(socket.room).emit('updateConversation', socket.username, data.message);
    });

    // when the user disconnects
    socket.on('disconnect', function () {
        socket.broadcast.emit('updateConversation', 'Server', socket.username + ' has disconnected');
        socket.leave(socket.room);
    })
});

// port listening setup
http.listen(config.port, function () {
    console.log('Gulp is running my app on PORT: ' + config.port);
});