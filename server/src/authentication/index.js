const authMiddleware = require('./authMiddleware');
const generateJwt = require('./generateJwt');
const hashPassword = require('./hashPassword');
const sendEmailVerification = require('./sendEmailVerification');
const usernameAvailable = require('./usernameAvailable');
const verifyPassword = require('./verifyPassword');

module.exports = {
  authMiddleware,
  generateJwt,
  hashPassword,
  sendEmailVerification,
  usernameAvailable,
  verifyPassword,
};
