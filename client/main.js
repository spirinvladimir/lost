/*jslint node:true*/
var domready = require('domready'),
    map = require('./map.jsx');
    //io = require('socket.io-client')('http://localhost:1337');

domready(function () {
    'use strict';
    map();
});
