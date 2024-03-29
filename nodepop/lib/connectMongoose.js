const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
  console.log('Error de conexcion', err);
});

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect(process.env.DATABASE_URI || process.env.MONGODB_URI);

module.exports = mongoose.connection;
