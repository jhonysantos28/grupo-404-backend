'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    code: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    price: DataTypes.DECIMAL,
    slug_url: DataTypes.STRING,
    sku: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  },
   {
      indexes: [
        {
          unique: true,
          fields: ['code', 'sku', 'slug_url']
        }
      ]
  });
  product.associate = function(models) {
    product.hasMany(models.productImages, {
      sourceKey: 'id',
      foreignKey: 'product_id'
    });
    product.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });
  };

  return product;
};