#!/usr/bin/env node

'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;
const Anuncio = require('../modelos/Anuncio');
const Usuario = require('../modelos/Usuario');
const fs = require('fs');
const {getSHA256FromString} = require('../lib/hash');

mongoose.Promise = global.Promise;

conn.on('error', err => {
    console.log('Error!', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log(`Conectado a MongoDB: ${mongoose.connection.name}`);

    removeDB()
    .then(populateDB)
    .then(() => {
        console.log("DB cleaned and populated!");
        process.exit(0);
    })
    .catch(err => {
        console.log("Error:", err);
        process.exit(1);
    });
});

mongoose.connect('mongodb://localhost/nodepop', {
    useMongoClient: true
});

async function removeDB() {
    console.log("Start removing DB...");

    const remAnuncios = await removeAnuncios();
    const remUsuarios = await removeUsuarios();

    await Promise.all([remAnuncios, remUsuarios])
}

function removeAnuncios() {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.dropCollection('anuncios', (err, result) => {
            if (err) {
                console.log('Error removing \'anuncios\':', err.message);
            } else {
                console.log('Removing \'anuncios\':', result);
            }

            //Resolve called even if fails because the collection could not exist 
            //(i.e when we call this script first time) but we would like to
            //populate the DB.
            resolve();
        });
    });
}

function removeUsuarios() {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.dropCollection('usuarios', (err, result) => {
            if (err) {
                console.log('Error removing \'usuarios\':', err.message);
            } else {
                console.log('Removing \'usuarios\':', result);
            }

            //Resolve called even if fails because the collection could not exist 
            //(i.e when we call this script first time) but we would like to
            //populate the DB.
            resolve();
        });
    });
}

async function populateDB() {
    console.log("Start populating DB...");
    
    await populateAnuncios();
    await populateUsuarios();
}

async function populateAnuncios() {
    let json = JSON.parse(fs.readFileSync(__dirname + "/anuncios.json", 'utf8')).anuncios;
    
    for (let i = 0; i < json.length; i++){            
        await new Anuncio(json[i]).save();
    }
}

async function populateUsuarios() {
    let json = JSON.parse(fs.readFileSync(__dirname + "/usuarios.json", 'utf8')).usuarios;

    for (let i = 0; i < json.length; i++){
        let user = new Usuario(json[i]);
        user.clave = getSHA256FromString(json[i].clave);

        await user.save();
    }
}