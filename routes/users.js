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
        client.on('respondcall', (message) => {
            console.log("rs", message)
            io.to(message.to).emit('answer', message.answer)
        })
        client.on('icecandidate', (message) => {
            io.to(message.to).emit('setice', { iceCandidate: message.candidate })
        })
    }
)

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;