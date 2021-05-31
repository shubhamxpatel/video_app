var express = require('express');
var router = express.Router();
var io = require('../bin/www').socket
io.on(
    'connection', (client) => {
        console.log(client.id)
        client.on('data', data => { console.log(data) })
        client.on('makeCall', (calldetail) => {
            console.log(calldetail)
            io.to(calldetail.to).emit('offer', {
                offer: calldetail.offer,
                to: client.id
            })
        })
        client.on('create_connection', id1 => {
            console.log('create_connection', id1)
            io.to(id1).emit('create_connection', client.id)
        })

        client.on('respondcall', (message) => {
            console.log("rs", message)
            io.to(message.to).emit('answer', { answer: message.answer, to: client.id })
        })
        client.on('icecandidate', (message) => {
            console.log(message)
            io.to(message.to).emit('setice', { iceCandidate: message.candidate, to: client.id })
        })
        client.on('disconnect', () => {
            socket.emit('user disconnected', client.id)
        })

    }
)

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;