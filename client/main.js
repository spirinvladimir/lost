/*jslint node:true*/
var domready = require('domready'),
    map = require('./map.jsx');

domready(function () {
    'use strict';
    map();
});
