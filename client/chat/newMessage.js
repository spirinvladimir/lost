/*jslint node:true*/
var React = require('react');
    
module.exports = React.createClass({
    render: function () {
        'use strict';
        return React.DOM.input(
            {
                className: 'newMessage',
                placeholder: 'your message',
                onKeyDown: this.onKeyDown}
        );
    },
    onKeyDown: function (e) {
        'use strict';
        if (e.keyCode === 13) {
            var text = e.target.value,
                props = this.props,
                io = props.io,
                addNewMessage = props.addNewMessage;
            addNewMessage(text);
            io.emit('add', text);
        }
    }
});
