'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return  Promise.all([
          queryInterface.bulkDelete(
              'user',
              {}
          ),
           queryInterface.addIndex('user', ['email'], {
              unique: true
          }),
          queryInterface.addIndex('user', ['login'], {
              unique: true
          })
      ]);
  },

  down: (queryInterface, Sequelize) => {
      return  Promise.all([
              queryInterface.removeIndex('user', 'user_email'),
              queryInterface.removeIndex('user', 'user_login')
          ]);
  }
};
