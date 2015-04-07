/*jslint node:true*/
var React = require('react');
    
module.exports = function () {
    'use strict';
    var Hello = React.createClass({
        render: function() {
            return React.DOM.input({className: 'search'}, '');
        }
    });
    Hello = React.createFactory(Hello);
    
    React.render(Hello({}), document.body);
};
