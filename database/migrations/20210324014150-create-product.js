'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('product', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.TEXT
        },
        code: {
          type: Sequelize.STRING
        },
        active: {
          type: Sequelize.BOOLEAN
        },
        price: {
          type: Sequelize.DECIMAL
        },
        slug_url: {
          type: Sequelize.STRING
        },
        sku: {
          type: Sequelize.STRING
        },
        qty: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      queryInterface.createTable('images', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'product',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        url: {
          type: Sequelize.STRING
        }
      }),

      queryInterface.addIndex('product', ['code'], {
        unique: true
      }),
      queryInterface.addIndex('product', ['sku'], {
        unique: true
      }),
      queryInterface.addIndex('product', ['slug_url'], {
        unique: true
      })
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('images'),
      queryInterface.dropTable('product')
    ]);
  }
};