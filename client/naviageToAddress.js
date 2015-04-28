/*jslint node:true*/
/*global google*/
module.exports = function (text, cb) {
    'use strict';
    var gc = new google.maps.Geocoder();
    gc.geocode(
        {
            address: text
        },
        function (results, status) {
            if (status === 'OK') {
                var latlng = results[0].geometry.location;
                cb(latlng);
            }
        }
    );
};
