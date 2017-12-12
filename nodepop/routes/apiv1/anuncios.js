'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../modelos/Anuncio');
const {validateToken} = require('../../lib/authenticate');
const CustomError = require('../../modelos/CustomError');

/**
 * GET /anuncios
 * Obtener lista de anuncios
 */
router.get('/', async (req, res, next) => {
    try {
        const token = req.query.token;
        await validateToken(token);

        let rows = await Anuncio.find().exec();
        res.json({ success: true, result: rows });
    } catch(err) {
        console.log('Undefined error when GET /anuncios/', err);
        next(new CustomError("Undefined error", 500));
    }
});

module.exports = router;