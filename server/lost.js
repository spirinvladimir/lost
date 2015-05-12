/*jslint node:true,nomen:true*/
var sendLastMessages = require('./sendLastMessages');

module.exports = function (io) {
    'use strict';
    var messages = ['What did you forget?', ['My phone', 22, 22], 'Where?', 'Pisa', 'What about exactly?', 'Railway staition'],
    
    io.on('connection', function (socket) {
        //sendLastMessages(messages, 5);
        socket.emit('messages', messages);

        socket.on('add', function (message) {
            messages.push(message);
            socket.broadcast.emit('new', message);
        });
        
        socket.on('marker', function (marker) {
            markers.push(marker);
            socket.broadcast.emit('markers', markers);
        });

        socket.on('disconnect', function (socket) {
            console.log(socket);
        });
    });
};
