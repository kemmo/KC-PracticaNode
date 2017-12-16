'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Name mandatory']
    },
    email: {
        type: String,
        index: true,
        required: [true, 'Email mandatory'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Wrong email'],
        unique: true
    },
    clave: {
        type: String,
        required: [true, 'Password mandatory']
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;