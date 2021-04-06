'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salesOrderProducts extends Model {
    static associate(models) {
      salesOrderProducts.belongsTo(models.salesOrder, {
        foreignKey: 'order_id',
        targetKey: 'id'
      });
      salesOrderProducts.belongsTo(models.product, {
        foreignKey: 'product_id',
        targetKey: 'id'
      });
    }
  }
  salesOrderProducts.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'salesOrderProducts',
    tableName: 'sales_order_products'
  });
  return salesOrderProducts;
};