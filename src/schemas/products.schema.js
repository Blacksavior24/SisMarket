const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const code = Joi.string().max(13);
const description = Joi.string().min(5);

const createProductSchema = Joi.object({
  name: name.required(),
  code: code.required(),
  description: description.required()
});

const updateProductSchema = Joi.object({
  name: name,
  description: description
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
