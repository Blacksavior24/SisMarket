const Joi = require('joi')
.extend(require('@joi/date'));

const id = Joi.number().integer();
const expirationDate = Joi.date().format('YYYY-MM-DD').utc();
const quantity = Joi.number().integer();
const productId = Joi.number().integer();

const createInventorySchema = Joi.object({
  expirationDate: expirationDate.required(),
  quantity: quantity.required(),
  productId: productId.required()
});

const updateInventorySchema = Joi.object({
  expirationDate: expirationDate,
  quantity: quantity,
  productId: productId
});

const getInventorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createInventorySchema, updateInventorySchema, getInventorySchema }
