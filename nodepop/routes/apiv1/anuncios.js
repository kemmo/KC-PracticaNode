'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../modelos/Anuncio');

/**
 * GET /anuncios
 * Obtener lista de anuncios
 */
router.get('/', async (req, res, next) => {
    try {
        const rows = await Anuncio.find().exec();
        res.json({ success: true, result: rows });
    } catch(err) {
        next(err);
    }
});

module.exports = router;