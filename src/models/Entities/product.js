'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    code: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    price: DataTypes.DECIMAL,
    slug_url: DataTypes.STRING,
    sku: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
   {
      indexes: [
        {
          unique: true,
          fields: ['code', 'sku', 'slug_url']
        }
      ]
  });
  Product.associate = function(models) {
    Product.hasMany(models.product_images, {
      sourceKey: 'id',
      foreignKey: 'product_id'
    });
    Product.hasMany(models.user_product, {
      sourceKey: 'id',
      foreignKey: 'product_id'
    });
  };

  return Product;
};