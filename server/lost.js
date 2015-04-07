/*jslint node:true,nomen:true*/
module.exports = function (io) {
    'use strict';
    this.add = function (req, res) {
        return;
    };
    io.on('connection', function (socket) {
        socket.on('login', function (name) {
            socket.name = name;
            socket.emit('login', {
                name: name
            });
            console.log(socket.name + ' joined the chat.');
        });
        socket.on('disconnect', function (socket) {
            console.log('disconnect');
        });
    });
};
