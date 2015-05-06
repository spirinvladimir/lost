/*jslint node:true*/
var React = require('react');
    
module.exports = React.createClass({
    getInitialState: function () {
        'use strict';
        return {
            value: '',
            placeholder: 'Your message'
        };
    },
    render: function () {
        'use strict';
        return React.DOM.input(
            {
                className: 'newMessage',
                placeholder: this.state.placeholder,
                onKeyDown: this.onKeyDown,
                onFocus: this.onFocus
            }
        );
    },
    onFocus: function () {
        'use strict';
        this.setState({
            placeholder: ''
        });
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
            e.target.value = '';
        }
    }
});
