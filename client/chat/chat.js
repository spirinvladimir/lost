/*jslint node:true*/
'use strict';
var React = require('react'),
    Search = require('./search'),
    NewMessage = require('./newMessage'),
    AnimList = require('./AnimList');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            messages: []
        };
    },
    render: function () {
        if (this.state.messages.length === 0) {
            return null;
        }
        return React.DOM.div(
            {className: 'chat'},
            [

                React.createElement(
                    AnimList,
                    {
                        messages: this.state.messages
                    }
                ),
                React.createElement(Search),
                React.createElement(NewMessage, {io: this.props.io, addNewMessage: this.addNewMessage})
            ]
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
