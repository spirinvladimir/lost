/*jslint node:true*/
var fs = require('fs');

module.exports = function (cb) {
    'use strict';
    var config = {
        host: 'lost.eu01.aws.af.cm',
        debug: false,
        port: process.env.VCAP_APP_PORT
    };
    if (process.env.DEBUG) {
        config.host = '127.0.0.1';
        config.debug = true;
        config.port = 8080;
    }
    fs.writeFile(
        'client/config.json',
        JSON.stringify({
            host: config.host,
            port: config.port
        }),
        function () {
            cb(config);
        }
    );
};
