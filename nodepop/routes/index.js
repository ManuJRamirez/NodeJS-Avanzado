const express = require('express');
const router = express.Router();
const Anuncio = require('../models/Anuncio');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const filtroByTag = req.query.tags;
    const filtroByVenta = req.query.venta;

    const filtroByPrecio = req.query.precio;

    const filtroByNombre = req.query.nombre;

    const start = req.query.start;
    const limit = req.query.limit;
    const sort = req.query.sort;
    const fields = req.query.fields;

    const filtro = {};
    if (filtroByNombre) {
      filtro.nombre = { $regex: '.*' + filtroByNombre + '.*', $options: 'i' };
    }

    if (filtroByTag) {
      filtro.tags = filtroByTag;
    }

    if (filtroByVenta) {
      filtro.venta = filtroByVenta;
    }

    if (filtroByPrecio) {
      if (!filtroByPrecio.includes('-')) {
        filtro.precio = filtroByPrecio;
      } else {
        let precioArr = filtroByPrecio.split('-');
        console.log(precioArr);
        if (filtroByPrecio.charAt(0) === '-') {
          filtro.precio = { $lte: precioArr[0] };
        } else if (filtroByPrecio.charAt(filtroByPrecio.length - 1) === '-') {
          filtro.precio = { $gte: precioArr[0] };
        } else {
          filtro.precio = { $gte: precioArr[0], $lte: precioArr[1] };
        }
      }
    }

    res.locals.anuncios = await Anuncio.lista(
      filtro,
      start,
      limit,
      sort,
      fields,
    );
    res.render('index', { title: 'NodePoP' });
  } catch (error) {
    next(error);
  }
});

router.get('/tags', async function (req, res, next) {
  res.locals.tags = await Anuncio.listaTags();

  res.render('index', { title: 'NodePoP' });
});

module.exports = router;
