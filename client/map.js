/*jslint node:true*/
var React = require('react'),
    config = require('./config.json'),
    Search = require('./search'),
    Chat = require('./chat/chat'),
    Markers = require('./markers'),
    style = require('./style'),
    ReactGmaps = require('react-gmaps'),
    EE = require('events').EventEmitter,
    ee = new EE(),
    io = require('socket.io-client')(config.host + ':' + config.port),
    Gmaps = ReactGmaps.Gmaps,
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
                        lat: this.props.lat,
                        lng: this.props.lng,
                        zoom: this.props.zoom,
                        onMapCreated: this.onMapCreated,
                        onClick: this.onClick,
                        style: {
                            backgroundColor: style.outBackgroundColor
                        }
                    },
                    React.createElement(Markers, {eeMap: ee, io: io, map: this.state.map})
                ),
                React.createElement(Search, {goto: this.goto}),
                React.createElement(Chat, {io: io, eeMap: ee})
            ]);
        },
        onMapCreated: function () {
            'use strict';
            var map = this.refs.Gmaps.getMap();
            map.setOptions({
                disableDefaultUI: true,
                styles: style.map
            });
            this.setState({
                map: map
            });
        },
        goto: function (location) {
            'use strict';
            var map = this.state.map;
            if (map) {
                map.setCenter(location);
                map.setZoom(14);
            }
        },
        onClick: function (location) {
            'use strict';
            var ee = this.props.ee;
            ee.emit('marker', {
                lat: location.latLng.A,
                lng: location.latLng.F
            });
        },
        componentWillMount: function () {
            'use strict';
            var ee = this.props.ee,
                self = this;
            ee.on('location', function (location) {
                self.goto(location);
            });
        }
    }),
    start = function (opts) {
        'use strict';
        opts = opts || {};
        React.render(
            React.createElement(
                App,
                {
                    lat: opts.lat || 0,
                    lng: opts.lng || 0,
                    zoom: opts.zoom || 3,
                    ee: ee
                }
            ),
            document.body
        );
    };

module.exports = function () {
    'use strict';
    if (navigator.geolocation) {
        var id = setTimeout(function () {
            id = undefined;
            start();
        }, 100);
        navigator.geolocation.getCurrentPosition(function (position) {
            if (id) {
                clearTimeout(id);
                start({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    zoom: 12
                });
            } else {
                ee.emit('location', {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }
        });
    } else {
        start();
    }
};
