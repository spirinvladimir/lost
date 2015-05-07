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
        var sm = this.state.messages,
            pm = this.props.messages;
        return React.DOM.div(
            {
                onWheel: this.wheel
            },
            React.createElement(List, {
                items: (sm.length === pm.length) ? sm : pm
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
    componentWillMount: function () {
        var props = this.props,
            ee = props.ee,
            self = this,
            update = function (list) {
                self.setState({
                    messages: props.messages
                });
            };
        update(props.messages);
        ee.on('update', update);
    }
});
