/*jslint node:true*/
'use strict';
var React = require('react'),
    Message = require('./message'),
    Search = require('./search'),
    NewMessage = require('./newMessage');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            messages: []
        };
    },
    render: function () {
        return React.DOM.div(
            {className: 'chat'},
            this.state.messages.map(function (message) {
                return React.createElement(Message, null, message);
            }).concat([
                React.createElement(Search),
                React.createElement(NewMessage, {io: this.props.io, addNewMessage: this.addNewMessage})
            ])
        );
    },
    addNewMessage: function (message) {
        this.setState({
            messages: this.state.messages.concat(message)
        });
    },
    componentDidMount: function () {
        var self = this,
            io = this.props.io;
        io.on('messages', function (messages) {
            self.setState({
                messages: messages
            });
        });
        io.on('new', function (message) {
            self.addNewMessage(message);
        });
    }
});
