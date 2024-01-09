const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema(
  {
    nombre: { type: String, index: true },
    venta: { type: Boolean, index: true },
    precio: { type: Number, index: true },
    foto: { type: String },
    tags: [{ type: String }],
  },
  {},
);

// sin filtros
anuncioSchema.statics.listaSimple = function () {
  const query = Anuncio.find();
  return query.exec();
};
// con filtros
anuncioSchema.statics.lista = function (filtro, start, limit, sort, fields) {
  const query = Anuncio.find(filtro);
  query.skip(start);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
};

anuncioSchema.statics.listaTags = function () {
  const query = Anuncio.find().distinct('tags');
  return query.exec();
};

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
