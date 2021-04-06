'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('status', [
          {
            name: 'Pendente',
            code: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Processando',
            code: 'processing',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Aprovado',
            code: 'approved',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Negado',
            code: 'denied',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
    {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('status', null, {});
  }
};
