'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../../modelos/Usuario');
const {authenticate} = require('../../lib/authenticate');
const {getSHA256FromString} = require('../../lib/hash');
const CustomError = require('../../modelos/CustomError');

/**
 * POST /registro
 * Crear un nuevo usuario
 */
router.post('/registro', async (req, res, next) => {
    let locale = req.get("Accept-Language");

    try {
        let user = new Usuario(req.body);

        if (!user.clave) {
            next(new CustomError(["Password mandatory"], 400, locale));
        }

        user.clave = getSHA256FromString(user.clave);

        let userCreated = await user.save();
        res.json({ success: true, result: userCreated });
    } catch(err) {
        console.log('Error when POST /usuarios/registro', err);

        if (err.name === 'ValidationError') {
            let errorMessages = []

            var keys = Object.keys(err.errors);
            for (let i = 0; i < keys.length; i++){
                errorMessages.push(err.errors[keys[i]])
            }

            next(new CustomError(errorMessages, 400, locale));
        } else if (err.code === 11000) {
            next(new CustomError(["Email already exist"], 409, locale));
        } else {
            next(new CustomError(["Undefined error"], 500, locale));
        }
    }
});

/**
 * POST /login
 * Loguear un usuario
 */
router.post('/login', async (req, res, next) => {
    let locale = req.get("Accept-Language");

    try {
        const email = req.body.email;
        const clave = req.body.clave;

        if (!email) {
            next(new CustomError(["Email mandatory"], 401, locale));
        }

        if (!clave) {
            next(new CustomError(["Password mandatory"], 401, locale));
        }

        let token = await authenticate(email, clave, locale);
        res.json({success: true, token: token});
    } catch (err) {
        console.log('Error when POST /usuarios/login', err);

        if(err instanceof CustomError) {
            next(err);
        } else {
            next(new CustomError(["Undefined error"], 500, locale));
        }
    }
});

module.exports = router;