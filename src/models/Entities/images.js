'use strict';
module.exports = (sequelize, DataTypes) => {
  const Images =  sequelize.define('images', {
    product_id: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    timestamps: false
  });
  Images.associate = (models) => {
    Images.belongsTo(models.product, {
      foreignKey: 'id',
      targetKey: 'product_id'
    });
  }
};