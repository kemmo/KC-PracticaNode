'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../modelos/Anuncio');
const {validateToken} = require('../../lib/authenticate');
const CustomError = require('../../modelos/CustomError');
const i18n = require('i18n');

/**
 * GET /anuncios
 * Obtener lista de anuncios
 */
router.get('/', async (req, res, next) => {
    let locale = req.get("Accept-Language");

    try {
        const token = req.query.token;
        await validateToken(token, locale);

        const filter = {};

        const venta = req.query.venta;
        if (venta) {
            filter.venta = venta;
        }

        let rows = await Anuncio.list(filter);
        res.json({ success: true, result: rows });
    } catch(err) {
        console.log('Undefined error when GET /anuncios/', err);
        next(new CustomError("Undefined error", 500, locale));
    }
});

module.exports = router;