'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const events = await queryInterface.sequelize.query('SELECT uid from EVENTS');

    for(let i = 0; i < events[0].length; i++) {
      await queryInterface.bulkInsert('EventTickets', [
        {
          eventUid: events[0][i].uid,
          name: 'standard',
          price: 39,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventUid: events[0][i].uid,
          name: 'premium',
          price: 69,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventUid: events[0][i].uid,
          name: 'vip',
          price: 99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('EventTickets', null, {});
  }
};
