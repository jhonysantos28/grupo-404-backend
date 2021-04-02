'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    login: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
  },
      {
        indexes: [
          {
            unique: true,
            fields: ['email', 'login']
          }
        ]
      }
  );
  user.associate = function(models) {
    user.hasMany(models.product, {
      sourceKey: 'id',
      foreignKey: 'user_id'
    });
    user.hasMany(models.userAddress, {
      sourceKey: 'id',
      foreignKey: 'user_id',
      as: 'user_address'
    });
  };

  return user;
};