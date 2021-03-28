'use strict';
module.exports = (sequelize, DataTypes) => {
  const userProduct = sequelize.define('userProduct', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    tableName: 'user_product'
  });
  userProduct.associate = function(models) {
    userProduct.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });
    userProduct.belongsTo(models.product, {
      foreignKey: 'product_id',
      targetKey: 'id'
    });
  };

  return userProduct;
};