/*jslint node:true*/
var domready = require('domready'),
    Map = require('./map'),
    map,
    Search = require('./search');//,
    //io = require('socket.io-client')('http://localhost:1337');

domready(function () {
    'use strict';
    var App = React.createClass({
        render: function() {
            return (
                React.createElement(Map, null),
                React.createElement(Search, null)
            );
        }
    });
    React.render(
        React.createElement(App, null),
        document.body
    );
});
