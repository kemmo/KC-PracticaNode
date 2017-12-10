var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncio');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

  //TODO: Remove following test
  //Test saving Anuncio
  const anuncio = new Anuncio({
    nombre: "Bici",
    venta: true,
    precio: 200.15,
    foto: "images/anuncios/photo.jpg",
    tags: ["lifestyle"]
  });

  anuncio.save((err, anuncioGuardado) => {
    if (err) {
      next(err);
      return;
    }

    res.json({result: anuncioGuardado});
  });
  //End test
});

module.exports = router;
