<<<<<<< HEAD
console.log('hola ');
console.log('hola ');
console.log('hola ');
console.log('hola ');
console.log('hola ');
console.log('hola ');
console.log('hola ');
=======
const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);

const createProductSchema = Joi.object({
  name: name.required()
});

const updateProductSchema = Joi.object({
  name: name
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
>>>>>>> 8b020aa5f7cbbe868624251da27e3df5c3fa21f1
