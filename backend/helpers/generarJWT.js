// helpers/generarJWT.js
const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'miclaveultrasecreta123', // puedes poner una variable de entorno en producción
      { expiresIn: '2h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generarJWT;
