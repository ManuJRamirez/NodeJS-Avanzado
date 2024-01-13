const amqplib = require('amqplib');

const canal = amqplib.connect(process.env.AMQPLIB_URL).then(connection => {
  return connection.createChannel();
});

module.exports = canal;
