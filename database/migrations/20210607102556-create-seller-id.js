'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'sales_order',
        'user_id_seller',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'user',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'sales_order',
        'user_id_seller'
    );
  }
};
