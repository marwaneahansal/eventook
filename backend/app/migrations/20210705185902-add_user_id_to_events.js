'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'Organizer', Sequelize.UUID);

    await queryInterface.addConstraint('Events', {
      fields: ['Organizer'],
      type: 'foreign key',
      name: 'fkey_events_users',
      references: {
        table: 'Users',
        field: 'uuid'
      },
      onDelete: 'SET NULL',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Events', 'fkey_events_users');
  }
};
