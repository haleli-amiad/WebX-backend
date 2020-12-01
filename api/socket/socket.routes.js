
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg=>{
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket._id).emit('chat addMsg', msg)
        })
        socket.on('chat startTyping', user => {
            io.to(socket._id).emit('chat startTyping', user)
            setTimeout(()=>{
                    io.to(socket._id).emit('chat endTyping')
            },2000)
        })
        socket.on('chat endTyping', user => {
            io.to(socket._id).emit('chat endTyping', user)
        })
        socket.on('chat id', _id=>{
            if (socket._id) {
                socket.leave(socket._id)
            }
            socket.join(_id)
            console.log('user joined room id:', _id);
            socket._id = _id;
        })
    })
}