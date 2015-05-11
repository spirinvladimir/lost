/*jslint node:true*/
var React = require('react'),
    naviageToAddress = require('./naviageToAddress'),
    id;
    
module.exports = React.createClass({
    getInitialState: function () {
        'use strict';
        return {
            value: '',
            placeholder: 'Enter a location'
        };
    },
    render: function () {
        'use strict';
        return React.DOM.input(
            {
                className: 'search',
                placeholder: this.state.placeholder,
                value: this.state.value,
                onChange: this.onChange,
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
            clearTimeout(id);
            naviageToAddress(this.state.value, this.props.goto);
        }
    },
    onChange: function (e) {
        'use strict';
        var text = e.target.value,
            goto = this.props.goto;
        this.setState({
            value: text
        });
        clearTimeout(id);
        id = setTimeout(function () {
            naviageToAddress(text, goto);
        }, 2000);
    }
});
