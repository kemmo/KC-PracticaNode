'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../../modelos/Usuario');
const shajs = require('sha.js')
const {authenticate} = require('../../lib/authenticate');

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
        const _clave = req.body.clave;

        let token = await authenticate(_email, _clave);
        res.json({success: true, token: token});
    } catch (err) {
        next(err);
    }
});

module.exports = router;