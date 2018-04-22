var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo',function(req, res){
    res.status(200).send('hola desde la ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJs',
    nickname: 'Bot san'
}];

io.on('connection', function(socket){
    console.log('el nodo con IP: '+socket.handshake.address+ " se ha conectado...");

    socket.emit('messages', messages);

    socket.on('add-message',function(data){
        messages.push(data);

        io.sockets.emit('messages',messages);
    });
});




server.listen(3000,function(){
    console.log('Servidor funcionando en http://localhost:3000');
});