/*jslint node:true*/
module.exports = function (messages, n) {
    'use strict';
    var last = [],
        i = 0;
    while ((messages.length !== 0) && (n !== i)) {
        i += 1;
        last.unshift(messages[messages.length - i]);
    }
    return last;
};
