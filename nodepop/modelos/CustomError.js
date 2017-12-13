'use strict';

const i18n = require('i18n');

function CustomError(message, status, locale) {
    if (locale != undefined) {
        i18n.setLocale(locale);
    } else {
        i18n.setLocale("en");
    }

    this.message = i18n.__(message);
    this.status = status;
}

CustomError.prototype = new Error();

module.exports = CustomError;