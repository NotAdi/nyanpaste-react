const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNewPaste = {
    body: Joi.object().keys({
        content: Joi.string().required(),
        title: Joi.string().alphanum().allow(''),
    }),
};

const getPasteById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

// const getAllPastes = {
//     query: Joi.object().keys({
//         title: Joi.string().default(''),
//         limit: Joi.number().integer().default(10),
//         page: Joi.number().integer().default(1),
//     }),
// };

module.exports = {
    createNewPaste,
    getPasteById,
    // getAllPastes,
};
