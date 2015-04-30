/*jslint node:true*/
var React = require('react');
    
module.exports = React.createClass({
    getInitialState: function () {
        'use strict';
        return {
            value: ''
        };
    },
    render: function () {
        'use strict';
        return React.DOM.input(
            {
                className: 'searchChat',
                placeholder: 'search in chat',
                onChange: this.onChange,
                onKeyDown: this.onKeyDown
            },
            this.state.value
        );
    },
    onKeyDown: function (e) {
        'use strict';
        //if (e.keyCode === 13) {
        //    clearTimeout(id);
        //    naviageToAddress(this.state.value, this.props.goto);
            //}
    },
    onChange: function (e) {
        'use strict';
        //var text = e.target.value,
        //    goto = this.props.goto;
        //this.setState({
            //    value: text
        //});
            //clearTimeout(id);
        //id = setTimeout(function () {
        //    naviageToAddress(text, goto);
        //}, 2000);
    }
});
