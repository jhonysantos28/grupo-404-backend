'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salesOrder extends Model {
    static associate(models) {
      salesOrder.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id'
      });
      salesOrder.belongsTo(models.userAddress, {
        foreignKey: 'user_address_id',
        targetKey: 'id'
      });
      salesOrder.belongsTo(models.status, {
        foreignKey: 'status_id',
        targetKey: 'id'
      });
      status.hasMany(models.salesOrderProducts, {
        sourceKey: 'id',
        foreignKey: 'order_id',
        as: 'order_products'
      });
    }
  };
  salesOrder.init({
    user_id: DataTypes.INTEGER,
    user_address_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'salesOrder',
  });
  return salesOrder;
};