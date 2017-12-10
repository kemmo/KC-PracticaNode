'use strict';

const mongoose = require('mongoose');

//TODO: Create indexes
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;