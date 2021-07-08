'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EventBookings', {
      uid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      eventUid: {
        type: Sequelize.UUID
      },
      eventTicketId: {
        type: Sequelize.INTEGER
      },
      seats: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
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
    });

    await queryInterface.addConstraint('EventBookings', {
      fields: ['eventUid'],
      type: 'foreign key',
      name: 'fkey_events_bookings',
      references: {
        table: 'Events',
        field: 'uid'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('EventBookings', {
      fields: ['eventTicketId'],
      type: 'foreign key',
      name: 'fkey_events_ticket_bookings',
      references: {
        table: 'EventTickets',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EventBookings');
  }
};