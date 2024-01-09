'use script';

const connection = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');
const { read } = require('node:fs');
const initData = require('./anuncios.json');

main().catch(err => console.log('Hubo un error', err));

async function main() {
  // espero a que se conecte a la base de datos
  await new Promise(resolve => connection.once('open', resolve));

  // inicializar la coleccion de anuncios
  await initAnuncios();

  connection.close();
}

async function initAnuncios() {
  // borrar todos los documentos de la coleccion de anuncios
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crear anuncios iniciales
  const inserted = await Anuncio.insertMany(initData.anuncios);
  console.log(`Creados ${inserted.length} anuncios.`);
}
