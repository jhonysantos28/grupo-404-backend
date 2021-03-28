'use strict';
module.exports = (sequelize, DataTypes) => {
  const productImages =  sequelize.define('productImages', {
    product_id: DataTypes.INTEGER,
    path: DataTypes.STRING
  }, {
    tableName: 'product_images'
  });
  productImages.associate = (models) => {
    productImages.belongsTo(models.product, {
      foreignKey: 'product_id',
      targetKey: 'id'
    });
  }

  return productImages;
};
