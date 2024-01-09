const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

/**
 * @swagger
 * /api/anuncios:
 *  get:
 *      description: devuelve
 *      responses:
 *        200:
 *          description: Devuelve JSON con todos los anuncios
 */

/**
 * @swagger
 * /api/anuncios/tags:
 *  get:
 *      description: Devuelve
 *      responses:
 *        200:
 *          description: Devuelve JSON con todos los tags
 */

/**
 * @swagger
 * /images/{foto}:
 *  get:
 *      description:
 *      parameters:
 *        - in: path
 *          name: foto
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Devuelve la imagen del anuncio
 */

/**
 * @swagger
 * /api/anuncios:
 *  post:
 *    requestBody:
 *      description: Creación de un anuncio
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - nombre
 *              - venta
 *              - precio
 *              - foto
 *              - tags
 *            properties:
 *              nombre:
 *                type: string
 *                description: Título del anuncio
 *                example: "nombre_artículo"
 *              venta:
 *                type: boolean
 *                description: Si es venta o busqueda
 *                example: true or false
 *              precio:
 *                type: number
 *                description: Precio del artículo
 *              foto:
 *                type: string
 *                description: Foto del artículo
 *                example: nombre.jpg
 *              tags:
 *                description: Tags del artículo
 *                example: ["tag_1", "tag_2"]
 *                schema:
 *                  type: array
 *                  items:
 *                    type: string
 *
 *    responses:
 *      200:
 *        description: Anuncio creado
 */

router.get('/', async (req, res, next) => {
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

    const anuncios = await Anuncio.lista(filtro, start, limit, sort, fields);
    res.locals.anuncios = anuncios;
    res.json({ result: anuncios });
  } catch (error) {
    next(error);
  }
});

router.get('/tags/', async (req, res, next) => {
  try {
    const tags = await Anuncio.listaTags();
    res.json({ result: tags });
  } catch (error) {
    next(error);
  }
});

router.get('/:foto', function (req, res, next) {
  try {
    const img = req.params.foto;
    res.sendFile(__dirname + `../../public/images/${img}`);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const datosAnuncio = req.body;

    const nuevoAnuncio = new Anuncio(datosAnuncio);

    const anuncioGuardado = await nuevoAnuncio.save();

    res.json({ result: anuncioGuardado });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
