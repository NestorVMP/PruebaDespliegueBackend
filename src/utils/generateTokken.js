const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId, role) => {
  console.log(process.env.JWT_SECRET);
  //console.log('🗂️ Directorio actual en tokken:', process.cwd());

  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: '3m',
  });
};

module.exports = generateToken;