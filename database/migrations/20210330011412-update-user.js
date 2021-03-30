'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'product',
        'user_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'user',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
    ).then(() => {
        queryInterface.dropTable('user_product');
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'product',
        'user_id'
    );
  }
};
