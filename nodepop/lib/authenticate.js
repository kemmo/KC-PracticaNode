'use strict';

const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/Usuario');
const shajs = require('sha.js')

module.exports.authenticate = function (email, clave) {
    return new Promise((resolve, reject) => {
        Usuario.findOne({ email: email }).exec()
        .then((user) => {
            if (user.email !== email || user.clave !== new shajs.sha256().update(clave).digest('hex')) {
                //TODO: Reject with a "401 Invalid credentials" error
                reject();
            }
    
            jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            }, (err, token) => {
                if (err) {
                    //TODO: Reject with an error
                    reject();
                }
                
                resolve(token);
            });
        }).catch(err => {
            //TODO: Reject with an error
            reject();            
        });
    });
}

module.exports.validateToken = function (token) {
    return new Promise((resolve, reject) => {
        //TODO: Validate token
        resolve();
    });
}