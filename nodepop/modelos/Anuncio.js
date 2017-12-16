'use strict';

const mongoose = require('mongoose');

const availableTags = ['work', 'lifestyle', 'motor', 'mobile'];

const anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true,
        required: [true, 'Name mandatory']
    },
    venta: {
        type: Boolean,
        index: true,
        required: [true, 'Type mandatory']
    },
    precio: {
        type: Number,
        index: true,
        required: [true, 'Price mandatory']
    },
    foto: String,
    tags: {
        type: [{
            type: String,
            enum: availableTags
        }],
        index: true
    }
});

anuncioSchema.statics.list = function(filters, start, limit) {
    const query = Anuncio.find(filters);
    query.skip(start);
    query.limit(limit);

    return query.exec();
}

anuncioSchema.index({ nombre: 1 });

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
module.exports.availableTags = availableTags;