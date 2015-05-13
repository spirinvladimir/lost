/*jslint node:true*/
'use strict';
var React = require('react'),
    List = require('react-list-select');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            messages: [],
            filter: ''
        };
    },
    render: function () {
        var sm = this.state.messages,
            pm = this.props.messages,
            m = (sm.length === pm.length) ? sm : pm,
            filter = this.state.filter;
        if (filter !== '') {
            m = m.filter(function (message) {
                return message.indexOf(filter) !== -1;
            });
        }
        return React.DOM.div(
            {
                onWheel: this.wheel
            },
            React.createElement(List, {
                items: m
            })
        );
    },
    wheel: function (e) {
        var list = this.state.messages.slice();
        if (e.deltaY < 0) {
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
    componentDidMount: function () {
        var props = this.props,
            ee = props.ee,
            self = this,
            update = function (list) {
                self.setState({
                    messages: list
                });
            };
        update(props.messages);
        ee.on('update', update);
        ee.on('filter', function (text) {
            self.setState({
                filter: text
            });
        });
    }
});
