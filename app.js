/**
 * Created by Mordekaiser on 05/02/16.
 */

var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});


// port listening setup
http.listen(config.port, function () {
    console.log('Gulp is running my app on PORT: ' + config.port);
});