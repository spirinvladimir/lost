/*jslint node:true*/
var domready = require('domready'),
    Map = require('./map'),
    map,
    search = require('./search');//,
    //io = require('socket.io-client')('http://localhost:1337');

domready(function () {
    'use strict';
    map = new Map();//io/);
    //search();
});