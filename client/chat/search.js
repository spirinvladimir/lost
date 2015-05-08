/*jslint node:true*/
var React = require('react');
    
module.exports = React.createClass({
    getInitialState: function () {
        'use strict';
        return {
            value: '',
            placeholder: 'Search in chat'
        };
    },
    render: function () {
        'use strict';
        return React.DOM.input(
            {
                className: 'searchChat',
                placeholder: this.state.placeholder,
                onChange: this.onChange,
                onFocus: this.onFocus
            },
            this.state.value
        );
    },
    onFocus: function () {
        'use strict';
        this.setState({
            placeholder: ''
        });
    },
    onChange: function (e) {
        'use strict';
        var text = e.target.value,
            ee = this.props.ee;
        this.setState({
            value: text
        });
        ee.emit('filter', text);
    }
});
