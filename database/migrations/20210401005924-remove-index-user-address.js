'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('user_address', 'user_address_type_name')
  },
  down: (queryInterface, Sequelize) => {
  }
};