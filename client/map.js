/*jslint node:true*/
var React = require('react'),
    Search = require('./search'),
    Chat = require('./chat/chat'),
    Markers = require('./markers'),
    style = require('./style'),
    ReactGmaps = require('react-gmaps'),
    io = require('socket.io-client')('http://localhost:1337'),
    Gmaps = ReactGmaps.Gmaps,
    coords = {
        lat: 0,
        lng: 0
    },
    App = React.createClass({
        getInitialState: function () {
            'use strict';
            return {
                map: undefined
            };
        },
        render: function () {
            'use strict';
            return React.DOM.div({className: 'app'}, [
                React.createElement(
                    Gmaps,
                    {
                        ref: 'Gmaps',
                        width: '100%',
                        height: '100%',
                        lat: coords.lat,
                        lng: coords.lng,
                        zoom: 2,
                        onMapCreated: this.onMapCreated,
                        onClick: this.onClick
                    },
                    React.createElement(Markers, {io: io, map: this.state.map})
                ),
                React.createElement(Search, {goto: this.goto}),
                React.createElement(Chat, {io: io})
            ]);
        },
        onMapCreated: function () {
            'use strict';
            var map = this.refs.Gmaps.getMap();
            map.setOptions({
                disableDefaultUI: true,
                styles: style
            });
            this.setState({
                map: map
            });
        },
        goto: function (location) {
            'use strict';
            var map = this.state.map;
            if (map) {
                console.dir(location);
                map.setCenter(location);
                map.setZoom(6);
            }
        },
        onClick: function () {
            'use strict';
            console.log('onClick');
        }
    });

module.exports = function () {
    'use strict';
    React.render(
        React.createElement(App),
        document.body
    );
};
