/*jshint -W109 */
'use strict';
var React = require('react'),
    Search = require('./search'),
    Chat = require('./chat/chat.jsx'),
    style = require('./style'),
    ReactGmaps = require('react-gmaps'),
    Gmaps = ReactGmaps.Gmaps,
    Marker = ReactGmaps.Marker,
    coords = {
        lat: 0,
        lng: 0
    },
    App = React.createClass({
        render: function () {
            return (
                <div class='app'>
                    <Gmaps 
                        ref='Gmaps'
                        width={'100%'}
                        height={'100%'}
                        lat={coords.lat}
                        lng={coords.lng}
                        zoom={2}
                        onMapCreated={this.onMapCreated}
                        onClick={this.onClick}
                    >
                        <Marker 
                            lat={coords.lat} 
                            lng={coords.lng}
                        />
                    </Gmaps>
                    <Search goto={this.goto}></Search>
                    <Chat/>
                </div>
            );
        },
        onMapCreated: function () {
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
            var map = this.state.map;
            if (map) {
                console.dir(location);
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
