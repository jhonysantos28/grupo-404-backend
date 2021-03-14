'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user', {
            id: {
                autoIncrement: true,
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            phone: Sequelize.STRING,
            login: Sequelize.STRING,
            enabled: Sequelize.BOOLEAN,
            password: Sequelize.STRING,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },



    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user');
    }
};
