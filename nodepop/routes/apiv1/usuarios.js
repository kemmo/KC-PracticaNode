'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../../modelos/Usuario');
const shajs = require('sha.js')
const jwt = require('jsonwebtoken');

/**
 * POST /registro
 * Crear un nuevo usuario
 */
router.post('/registro', async (req, res, next) => {
    try {
        let user = new Usuario(req.body);
        user.clave = new shajs.sha256().update(user.clave).digest('hex')

        let userCreated = await user.save();
        res.json({ success: true, result: userCreated });
    } catch(err) {
        next(err);
    }
});

/**
 * POST /login
 * Loguear un usuario
 */
router.post('/login', async (req, res, next) => {
    try {
        const _email = req.body.email;
        const _password = req.body.clave;
        const user = await Usuario.findOne({ email: _email}).exec();

        if (user.email !== _email || user.clave !== new shajs.sha256().update(_password).digest('hex')) {
            res.status = 401;
            res.json({ error: 'Credenciales incorrectas' });

            return;
        }

        jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }, (err, token) => {
            if (err) {
                next(err);
                return;
            }

            res.json({success: true, token: token});
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;