const jws = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function postJWTAPI(req, res, next) {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email: email });
    console.log(usuario);
    if (!usuario || !(await usuario.comparePassword(password))) {
      res.json({ error: 'Datos incorrectos' });
      return;
    }

    const apiJWTtoken = await jws.sign(
      { _id: usuario._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '300s',
      },
    );
    res.json({ jwt: apiJWTtoken });
  } catch (error) {
    next(error);
  }
}

module.exports = postJWTAPI;
