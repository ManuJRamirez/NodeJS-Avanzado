'use script';

const connection = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');
const { read } = require('node:fs');
const initData = require('./anuncios.json');
const Usuario = require('./models/Usuario');

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
  const deletedUsers = await Usuario.deleteMany();

  // crear cuenta admin inicial
  const adminPassword = '1234';
  const codedPassword = await Usuario.cryptedPassword(adminPassword);
  const addAdminUser = await Usuario.insertMany([
    { email: 'user@example.com', password: codedPassword },
  ]);
  const adminUser = addAdminUser.map(user => user.email);

  console.log(
    `Usuario cuenta admin: ${adminUser} |||| Contraseña: ${adminPassword}.`,
  );

  // crear anuncios iniciales
  const inserted = await Anuncio.insertMany(initData.anuncios);
  console.log(`Creados ${inserted.length} anuncios.`);
}
