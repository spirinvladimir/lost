var React = require('react'),
    Search = require('./search'),
    ReactGmaps = require('react-gmaps'),
    Gmaps = ReactGmaps.Gmaps,
    Marker = ReactGmaps.Marker;
 
var coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028 
}
 
var App = React.createClass({
 
  render() {
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
        onClick={this.onClick}>
        <Marker 
          lat={coords.lat} 
          lng={coords.lng} />
      </Gmaps>
      <Search></Search>
      </div>
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

module.exports = function () {
    React.render(<App />, document.body);
};