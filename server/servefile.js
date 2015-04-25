/*jslint node:true,nomen:true*/
var fs = require('fs'),
    Path = require('path');

module.exports = function (filename, res) {
    'use strict';
    fs.readFile(Path.join(__dirname, '..', filename[0], filename[1]), function (error, content) {
        if (error) {
            res.writeHead(500);
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
};
