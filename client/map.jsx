/*jshint -W109 */
'use strict';
var React = require('react'),
    Search = require('./search'),
    ReactGmaps = require('react-gmaps'),
    Gmaps = ReactGmaps.Gmaps,
    Marker = ReactGmaps.Marker,
    coords = {
        lat: 51.5258541,
        lng: -0.08040660000006028 
    },
    App = React.createClass({
        render: function () {
            return (
                <div>
                    <Gmaps 
                        address='moscow'
                        ref='Gmaps'
                        width={'100%'}
                        height={'100%'}
                        lat={coords.lat} 
                        lng={coords.lng} 
                        zoom={12} 
                        onMapCreated={this.onMapCreated}
                        onClick={this.onClick}
                    >
                        <Marker 
                            lat={coords.lat} 
                            lng={coords.lng}
                        />
                    </Gmaps>
                    <Search goto={this.goto}></Search>
                </div>
            );
        },
        onMapCreated: function () {
            var map = this.refs.Gmaps.getMap();
            map.setOptions({
                disableDefaultUI: true
            });
            this.setState({
                map: map
            });
        },
        goto: function (location) {
            var map = this.state.map;
            if (map) {
                map.setCenter(location);
            }
        },
        onClick: function () {
            console.log('onClick');
        }
    });

module.exports = function () {
    React.render(<App />, document.body);
};
