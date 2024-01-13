'use strict';
const thumbnailController = require('../controllers/thumbnailController');

require('dotenv').config();

const amqplib = require('amqplib');

const QUEUE = 'thumbnail-maker';

main().catch(err => console.log('Hubo un error', err));

//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  const connection = await amqplib.connect(process.env.AMQPLIB_URL);

  const canal = await connection.createChannel();

  await canal.assertQueue(QUEUE, {
    durable: true,
  });

  canal.prefetch(1);

  canal.consume(QUEUE, async mensaje => {
    const payload = JSON.parse(mensaje.content.toString());
    console.log(payload);
    await thumbnailController(payload.url);
    canal.ack(mensaje);
  });
}
