/*jslint node:true*/
var React = require('react'),
    naviageToAddress = require('./naviageToAddress'),
    id;
    
module.exports = React.createClass({
    getInitialState: function () {
        'use strict';
        return {
            value: 'moscow'
        };
    },
    render: function () {
        'use strict';
        return React.DOM.input(
            {className: 'search', onChange: this.onChange},
            this.state.value
        );
    },
    onChange: function (e) {
        'use strict';
        var text = e.target.value,
            goto = this.props.goto;
        clearTimeout(id);
        id = setTimeout(function () {
            naviageToAddress(text, goto);
        }, 2000);
        this.setState({
            value: text
        });
    }
});
