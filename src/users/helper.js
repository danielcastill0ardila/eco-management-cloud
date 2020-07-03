const { body } = require('express-validator');

const validateBody = () => [
  body('username').isString(),
  body('email').isEmail(),
  body('password').isString(),
  body('name').isString()
];

module.exports = {
  validateBody
};
