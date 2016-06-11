const socketio = require('socket.io');
var io;

function chatServer(server) {
    io = socketio.listen(server); //启动Socket.IO服务器，并且搭载在现有的http服务器上
    io.set('log level', 1);//将socket.io中的debug信息关闭

    //用户连接事件处理
    io.sockets.on('connection', function(socket) {
        var socketId = socket.id;
        console.info(socketId + ' 带着他的小姨子进来了...');

        socket.on('message', function(message) {
            console.info(message);
        });

        socket.on('disconnect',function(){
            console.info(socketId + ' 带着他的小姨子跑路了...');
        });
    });

}

exports.listen = chatServer;