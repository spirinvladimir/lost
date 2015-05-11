/*jslint node:true,nomen:true*/
var http = require('http'),
    config = require('./config'),
    babelify = require('babelify'),
    Moonboots = require('moonboots'),
    Lost = require('./server/lost'),
    lost,
    Server = require('socket.io'),
    server,
    io,
    clientApp;

config(function (config) {
    'use strict';
    clientApp = new Moonboots({
        main: __dirname + '/client/main.js',
        stylesheets: [
            __dirname + '/public/list.css',
            __dirname + '/public/s.css'
        ],
        browserify: {
            debug: config.debug
        },
        developmentMode: config.debug,
        cache: !config.debug,
        minify: !config.debug
    });

    clientApp.on('ready', function () {

        server = http.createServer(function (req, res) {
            var method = req.method,
                url = req.url.replace('/', '');
            if (method === 'GET') {
                if (url === '') {
                    res.end(clientApp.htmlSource());
                } else if (url === clientApp.jsFileName()) {
                    clientApp.jsSource(function (err, js) {
                        res.end(js);
                    });
                } else if (url === clientApp.cssFileName()) {
                    clientApp.cssSource(function (err, css) {
                        res.end(css);
                    });
                }
            }
        });

        io = new Server(server);

        lost = new Lost(io);

        server.listen(config.port, config.host);
    });
});
