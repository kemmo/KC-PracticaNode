'use strict';

const i18n = require('i18n');

function CustomError(messages, status, locale) {
    if (locale != undefined) {
        i18n.setLocale(locale);
    } else {
        i18n.setLocale("es");
    }

    let finalErrorMessage = [];
    for (let i = 0; i < messages.length; i++){
        let msg = i18n.__(String(messages[i]));
        finalErrorMessage.push(msg);
    }

    this.message = finalErrorMessage;
    this.status = status;
}

CustomError.prototype = new Error();

module.exports = CustomError;