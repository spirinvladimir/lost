/*jslint node:true,nomen:true*/
module.exports = function (io) {
    'use strict';
    var messages = ['What did you forget?', 'My phone', 'Where?', 'Pisa', 'What about exactly?', 'Railway staition'],
        markers = [{lat: 0, lng: 0}, {lat: 22, lng: 22}],
        sendLastMessages = function (socket, n) {
            var last = [],
                i = 0;
            while ((messages.length !== 0) && (n !== i)) {
                i += 1;
                last.unshift(messages[messages.length - i]);
            }
            socket.emit('messages', last);
        };
    
    io.on('connection', function (socket) {
        //sendLastMessages(socket, 5);
        socket.emit('messages', messages);
        
        socket.on('waitingMarkers', function () {
            socket.emit('markers', markers);
        });
        
        socket.on('add', function (message) {
            messages.push(message);
            socket.broadcast.emit('new', message);
        });
        
        socket.on('disconnect', function (socket) {
            console.log(socket);
        });
    });
};
