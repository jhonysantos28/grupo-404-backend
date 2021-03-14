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

  return user;
};