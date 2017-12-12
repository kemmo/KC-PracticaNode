'use strict';

const shajs = require('sha.js')

module.exports.getSHA256FromString = function (clave) {
    return new shajs.sha256().update(clave).digest('hex');
}