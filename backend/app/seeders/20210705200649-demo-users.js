'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        uuid: uuid(),
        name: 'Josh Macklemore',
        email: 'macklemore@email.com',
        password: bcrypt.hashSync('password', 10),
        isEventOrganizer: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuid(),
        name: 'Cristiano Ronaldo',
        email: 'cristiano7@email.com',
        password: bcrypt.hashSync('password', 10),
        isEventOrganizer: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuid(),
        name: 'Lionel Messi',
        email: 'lionel10@email.com',
        password: bcrypt.hashSync('password', 10),
        isEventOrganizer: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null);
  }
};
