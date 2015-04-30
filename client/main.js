/*jslint node:true*/
var domready = require('domready'),
    map = require('./map');

domready(function () {
    'use strict';
    map();
});
