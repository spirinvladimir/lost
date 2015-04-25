/*jslint node:true*/
var React = require('react'),
    ReactGmaps = require('react-gmaps'),
    { Gmaps, Marker } = ReactGmaps;
    
module.exports = React.createClass({
        getInitialState: function () {
            return {
                lat: 51.5258541,
                lng: -0.08040660000006028
            };
        },
        render() {
            return (
                <Gmaps 
                ref='Gmaps'
                width={'100%'}
                height={'100%'}
                lat={this.state.coords.lat}
                lng={this.state.coords.lng}
                zoom={12} 
                onMapCreated={this.onMapCreated}
                onClick={this.onClick}>
                <Marker 
                lat={this.state.coords.lat}
                lng={this.state.coords.lng} />
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
