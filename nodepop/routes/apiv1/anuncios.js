'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../modelos/Anuncio');
const {availableTags} = require('../../modelos/Anuncio');
const {validateToken} = require('../../lib/authenticate');
const CustomError = require('../../modelos/CustomError');
const i18n = require('i18n');

/**
 * GET /
 * Obtener lista de anuncios
 */
router.get('/', async (req, res, next) => {
    let locale = req.get("Accept-Language");

    try {
        const token = req.query.token;
        await validateToken(token, locale);

        const filter = {};

        const tag = req.query.tag;
        if (tag) {
            filter.tags = tag;
        }

        const venta = req.query.venta;
        if (venta) {
            filter.venta = venta;
        }

        const nombre = req.query.nombre;
        if (nombre) {
            filter.nombre = new RegExp('^' + req.query.nombre, "i");
        }

        const priceGreater = parseInt(req.query.precioMin);
        const priceLess = parseInt(req.query.precioMax);
        if (priceGreater && priceLess) {
            filter.precio = { $gte: priceGreater, $lte: priceLess };
        } else if (priceGreater) {
            filter.precio = { $gte: priceGreater };
        } else if (priceLess) {
            filter.precio = { $lte: priceLess };
        }

        const start = parseInt(req.query.start);
        const limit = parseInt(req.query.limit);

        let rows = await Anuncio.list(filter, start, limit);
        res.json({ success: true, result: rows });
    } catch(err) {
        console.log('Undefined error when GET /anuncios/', err);

        if(err instanceof CustomError) {
            next(err);
        } else {
            next(new CustomError(["Undefined error"], 500, locale));
        }
    }
});


/**
 * GET /anuncios/tags
 * Obtener lista de tags disponibles
 */
router.get('/tags', (req, res, next) => {
    res.json({ success: true, result: availableTags });
});

module.exports = router;