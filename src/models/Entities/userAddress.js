'use strict';
module.exports = (sequelize, DataTypes) => {
  const userAddress = sequelize.define('userAddress', {
    type_name: DataTypes.STRING,
    cep: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    complement: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    tableName: 'user_address'
  });
  userAddress.associate = function(models) {
    userAddress.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return userAddress;
};