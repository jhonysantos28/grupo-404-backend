'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProduct = sequelize.define('user_product', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {});
  UserProduct.associate = function(models) {
    UserProduct.belongsTo(models.user, {
      foreignKey: 'id',
      targetKey: 'user_id'
    });
    UserProduct.belongsTo(models.product, {
      foreignKey: 'id',
      targetKey: 'product_id'
    });
  };

  return UserProduct;
};