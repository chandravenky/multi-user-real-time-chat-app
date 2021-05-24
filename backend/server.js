const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });/*initialize io */

const users = {};

io.on('connection', socket => { /*listen to incoming requests on various sockets*/
    socket.on('new-user-joined', username => { /*listen to a particular connection */
        users[socket.id] = username;
        socket.broadcast.emit('user-joined', username);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, username: users[socket.id]}) /* other respective users should receive it */
    });
  
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', {username: users[socket.id]}) /* other respective users should receive it */
        delete users[socket.id];
    });
})