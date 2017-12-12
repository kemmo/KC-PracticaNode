'use strict';

const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/Usuario');
const {getSHA256FromString} = require('./hash');
const CustomError = require('../modelos/CustomError');

module.exports.authenticate = (email, clave) => {
    return new Promise((resolve, reject) => {
        Usuario.findOne({ email: email }).exec()
        .then((user) => {
            if (user.clave !== getSHA256FromString(clave)) {
                console.log(`Invalid credentials for ${email} with password ${clave}`);
                reject(new CustomError("Invalid credentials", 401));
            }
    
            jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            }, (err, token) => {
                if (err) {
                    console.log(`Error generating token for ${email} with password ${clave}`, err);
                    reject(new CustomError("Login error", 401));
                }
                
                resolve(token);
            });
        }).catch(err => {
            console.log('Undefined error when login', err);
            reject(new CustomError("Login error", 401));
        });
    });
}

module.exports.validateToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new CustomError("No token provided", 401));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(new CustomError("Invalid token", 401));
            }
            // TODO: decoded.user_id nos da el usuario que se ha validado
            resolve();
        });
    });
}