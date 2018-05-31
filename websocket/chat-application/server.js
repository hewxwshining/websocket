var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});


io.on('connection', function(socket) {
    console.log("connection");
    io.emit('this', { will: 'be received by everyone' });
    socket.on('chat message', function(from, msg) {
        console.log(from)
        //用于将消息发送给每个人，包括发送者
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function(msg) {
        console.log("set:" + msg);
    });
});


server.listen(3000, function() {
    console.log('listening on *:3000');
});