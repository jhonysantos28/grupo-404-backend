'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salesOrder extends Model {
    static associate(models) {
      salesOrder.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user_order'
      });
      salesOrder.belongsTo(models.userAddress, {
        foreignKey: 'user_address_id',
        targetKey: 'id',
        as: 'user_address'
      });
      salesOrder.belongsTo(models.status, {
        foreignKey: 'status_id',
        targetKey: 'id'
      });
      salesOrder.hasMany(models.salesOrderProducts, {
        sourceKey: 'id',
        foreignKey: 'order_id',
        as: 'products'
      });
      salesOrder.belongsTo(models.user, {
        foreignKey: 'user_id_seller',
        targetKey: 'id',
        as: 'user_seller'
      });
    }
  }
  salesOrder.init({
    user_id: DataTypes.INTEGER,
    user_address_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    user_id_seller: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'salesOrder',
    tableName: 'sales_order'
  });
  return salesOrder;
};