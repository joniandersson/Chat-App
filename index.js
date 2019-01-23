var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.locals.room = "test";

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

global.room = "nig";

io.on('connection', function(socket){
  console.log('User connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('join', function (room) {
      socket.join(room);
      app.locals.room = room;
      console.log(`Joined room ${room}`);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
