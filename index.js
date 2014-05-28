
var app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	Store = require('./message-store'),
	messages = new Store(10)

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){

  // console.log('a user connected');

  socket.emit('messages', messages.get() )

  socket.on('chat message', function(msg){

    console.log('msg', msg);

    messages.add(msg);

    socket.broadcast.emit('chat message', msg);

  });

  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
