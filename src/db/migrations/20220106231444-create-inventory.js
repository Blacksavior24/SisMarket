'use strict';

const {InventorySchema, INVENTORY_TABLE} = require('./../models/inventory.models');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(INVENTORY_TABLE, InventorySchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(INVENTORY_TABLE);
  }
};