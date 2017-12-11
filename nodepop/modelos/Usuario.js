'use strict';

const mongoose = require('mongoose');

//TODO: Create indexes
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, unique: true},
    clave: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;