const {User, UserSchema} = require('./user.model');

const {Category, CategorySchema} = require('./category.model');
const {Product, ProductSchema} = require('./product.model');
const {Inventory, InventorySchema} = require('./inventory.model');

const {Provider, ProviderSchema} = require('./provider.model');
const {PurchaseOrder, PurchaseOrderSchema} = require('./purchaseorder.model')

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));

  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Inventory.init(InventorySchema, Inventory.config(sequelize));

  Provider.init(ProviderSchema, Provider.config(sequelize));
  PurchaseOrder.init(PurchaseOrderSchema, PurchaseOrder.config(sequelize));

  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Inventory.associate(sequelize.models);

  Provider.associate(sequelize.models);
  PurchaseOrder.associate(sequelize.models);
}


module.exports = setupModels;
