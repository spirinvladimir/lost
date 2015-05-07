/*jslint node:true*/
var http = require('http'),
    serveFile = require('./server/servefile'),
    Lost = require('./server/lost'),
    lost,
    Server = require('socket.io'),
    server = http.createServer(function (req, res) {
        'use strict';
        var method = req.method,
            url = req.url;
        if (method === 'GET') {
            if (url === '/') {
                serveFile(['public', 'index.html'], res);
            } else if (req.url === '/bundle.js') {
                serveFile(['public', 'bundle.js'], res);
            } else if (req.url === '/s.css') {
                serveFile(['public', 's.css'], res);
            } else if (req.url === '/list.css') {
                serveFile(['public', 'list.css'], res);
            }

        }
    }),
    io = new Server(server);

lost = new Lost(io);

server.listen(80, 'localhost');
