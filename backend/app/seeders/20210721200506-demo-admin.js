'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        uuid: uuid(),
        name: 'Admin',
        email: 'admin@eventook.com',
        password: bcrypt.hashSync('password', 10),
        isEventOrganizer: false,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { isAdmin: true });
  }
};
