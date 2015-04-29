/*jslint node:true*/
var React = require('react');
    
module.exports = React.createClass({
    render: function () {
        'use strict';
        return React.DOM.div(
            {className: 'message'},
            this.props.children
        );
    }
});
