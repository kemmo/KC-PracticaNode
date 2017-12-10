'use strict';

const mongoose = require('mongoose');

//TODO: Create indexes
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;