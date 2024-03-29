var io = require('lib/sio').io;

var middleware = function(socket,next){
	socket.on('message', function (data) {
		// console.log(data);
		
		// io.sockets.emit('an event sent to all connected clients');
		//broad cast to all class
		// io.sockets.in(socket.handshake.headers.token.classIds[0])
		// 			.emit('message',{message:data.text,
		// 							from:socket.handshake.headers.token._id});
		io.sockets.in(data.to).emit('message',{message:data.text,
									from:socket.handshake.headers.token._id});
	});
	next();
}

module.exports = middleware;