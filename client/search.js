/*jslint node:true*/
var React = require('react');
    
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
        this.setState(
            {value: e.target.value}
        );
    }
});
