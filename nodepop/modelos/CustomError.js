'use strict';

function CustomError(message, status) {
    this.message = message;
    this.status = status;
}

CustomError.prototype = new Error();

module.exports = CustomError;