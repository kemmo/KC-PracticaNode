'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../../modelos/Usuario');
const shajs = require('sha.js')

/**
 * POST /usuario
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

module.exports = router;