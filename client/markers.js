/*jslint node:true*/
var React = require('react'),
    Marker = require('react-gmaps').Marker;

module.exports = React.createClass({
    getInitialState: function () {
        'use strict';
        return {
            markers: []
        };
    },
    render: function () {
        'use strict';
        return React.DOM.div(
            {},
            this.state.markers.map(function (marker) {
                return React.createElement(
                    Marker,
                    {
                        map: this.map,
                        lat: marker.lat,
                        lng: marker.lng
                    }
                );
            }, this.props)
        );
    },
    componentDidMount: function () {
        'use strict';
        var self = this,
            ee = this.props.eeMap,
            io = this.props.io;
        io.emit('waitingMarkers');
        io.on('markers', function (markers) {
            self.setState({
                markers: markers
            });
        });
        ee.on('newMarker', function (marker) {
            self.setState({
                markers: self.state.markers.concat(marker)
            });
        });
    }
});
