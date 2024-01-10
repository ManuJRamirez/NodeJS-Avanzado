const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

usuarioSchema.statics.cryptedPassword = function (password) {
  return bcrypt.hash(password, 10);
};

usuarioSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
