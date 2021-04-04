'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    static associate(models) {
      status.hasMany(models.salesOrder, {
        sourceKey: 'id',
        foreignKey: 'status_id',
        as: 'user_status'
      });
    }
  };
  status.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'status',
  });
  return status;
};