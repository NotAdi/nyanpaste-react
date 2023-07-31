const Joi = require('joi');
const { password } = require('./custom.validation');

const auth = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    }),
};

module.exports = {
    auth,
};
