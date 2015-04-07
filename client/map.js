/*jslint node:true*/
var React = require('react'),
    ReactGmaps = require('react-gmaps'),
    { Gmaps, Marker } = ReactGmaps;
    
module.exports = function (io) {
    'use strict';
    
    var coords = {
        lat: 51.5258541,
        lng: -0.08040660000006028 
    }
    
    var App = React.createClass({
        
        render() {
            return (
                <Gmaps 
                ref='Gmaps'
                width={'100%'}
                height={'100%'}
                lat={coords.lat} 
                lng={coords.lng} 
                zoom={12} 
                onMapCreated={this.onMapCreated}
                onClick={this.onClick}>
                <Marker 
                lat={coords.lat} 
                lng={coords.lng} />
                </Gmaps>
            );
        },
        
        onMapCreated() {
            console.log('onMapCreated', this.refs.Gmaps.getMap());
            this.refs.Gmaps.getMap().setOptions({
                disableDefaultUI: true
            });
        },
        
        onClick() {
            console.log('onClick');
        }
        
    });

    React.render(<App />, document.body);
};
