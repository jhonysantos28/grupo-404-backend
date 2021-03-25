'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_images =  sequelize.define('product_images', {
    product_id: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    timestamps: false
  });
  product_images.associate = (models) => {
    product_images.belongsTo(models.product, {
      foreignKey: 'id',
      targetKey: 'product_id'
    });
  }
};