/*jslint node:true*/
'use strict';
var React = require('react'),
    List = require('react-list-select');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            messages: []
        };
    },
    render: function () {
        return React.DOM.div(
            {
                onWheel: this.wheel
            },
            React.createElement(List, {
                items: this.state.messages
            })
        );
    },
    wheel: function (e) {
        var list = this.state.messages.slice();
        if (e.deltaY > 0) {
            this.up(list);
        } else {
            this.down(list);
        }
    },
    up: function (list) {
        list.push(list.shift());
        this.setState({
            messages: list
        });
    },
    down: function (list) {
        list.unshift(list.pop());
        this.setState({
            messages: list
        });
    },
    componentWillMount: function () {
        this.setState({
            messages: this.props.messages
        });
    }
});
