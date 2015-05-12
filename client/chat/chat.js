/*jslint node:true*/
'use strict';
var React = require('react'),
    Search = require('./search'),
    NewMessage = require('./newMessage'),
    AnimList = require('./AnimList'),
    EE = require('events').EventEmitter,
    ee = new EE(),
    messages = [];

module.exports = React.createClass({
    render: function () {
        return React.DOM.div(
            {className: 'chat'},
            [
                React.createElement(AnimList, {ee: ee, messages: messages}),
                React.createElement(Search, {ee: ee}),
                React.createElement(NewMessage, {ee: ee, eeMap: this.props.eeMap})
            ]
        );
    },
    componentWillMount: function () {
        var self = this,
            io = this.props.io,
            eeMap = this.props.eeMap;
        io.on('messages', function (data) {
            messages = data;
            ee.emit('update', messages);
            eeMap.emit(
                'markers',
                messages.filter(function (message) {
                    return typeof message === 'object';
                }).map(function (message) {
                    return {
                        lat: message[1],
                        lng: message[2]
                    };
                })
            );
        });
        io.on('new', function (message) {
            messages.push(message);
            ee.emit('update', messages);
        });
        ee.on('new', function (message) {
            io.emit('add', message);
            messages.push(message);
            ee.emit('update', messages);
        });
    }
});
