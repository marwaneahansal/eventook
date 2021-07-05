'use strict';
const { v4: uuid } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const today = new Date();
    const eventOrganizers = await queryInterface.sequelize.query('SELECT uuid from USERS WHERE isEventOrganizer=true');

    await queryInterface.bulkInsert('Events', [
      {
        uid: uuid(),
        title: 'Best Web Technologies in 2021',
        country: 'Morocco',
        city: 'Agadir',
        adresse: 'nowhere',
        eventDateStart: today.setDate(today.getDate() + 5),
        eventDateEnd: today.setDate(today.getDate() + 7),
        maxSeats: 250,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        coverImage: 'undefined.jpg',
        mainImage: 'undefined.jpg',
        images: '{"image1": "undefined.jpg"}',
        approved: true,
        createdAt: today,
        updatedAt: today,
        Organizer: eventOrganizers[0][0].uuid
      },
      {
        uid: uuid(),
        title: 'Ethical Hacking',
        country: 'Germany',
        city: 'Berline',
        adresse: 'in someplcae',
        eventDateStart: today.setDate(today.getDate() + 12),
        eventDateEnd: today.setDate(today.getDate() + 13),
        maxSeats: 130,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        coverImage: 'undefined.jpg',
        mainImage: 'undefined.jpg',
        images: '{"image1": "undefined.jpg"}',
        approved: true,
        createdAt: today,
        updatedAt: today,
        Organizer: eventOrganizers[0][0].uuid
      },
      {
        uid: uuid(),
        title: 'Meditation Secrets',
        country: 'Spain',
        city: 'Madrid',
        adresse: 'who knows?',
        eventDateStart: today.setDate(today.getDate() + 23),
        eventDateEnd: today.setDate(today.getDate() + 27),
        maxSeats: 50,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        coverImage: 'undefined.jpg',
        mainImage: 'undefined.jpg',
        images: '{"image1": "undefined.jpg"}',
        approved: true,
        createdAt: today,
        updatedAt: today,
        Organizer: eventOrganizers[0][0].uuid
      },
      {
        uid: uuid(),
        title: 'Get better at eating',
        country: 'Morocco',
        city: 'Casablanca',
        adresse: 'anywhere',
        eventDateStart: today.setDate(today.getDate() + 13),
        eventDateEnd: today.setDate(today.getDate() + 20),
        maxSeats: 600,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        coverImage: 'undefined.jpg',
        mainImage: 'undefined.jpg',
        images: '{"image1": "undefined.jpg"}',
        approved: true,
        createdAt: today,
        updatedAt: today,
        Organizer: eventOrganizers[0][0].uuid
      },
      {
        uid: uuid(),
        title: 'Something Better',
        country: 'France',
        city: 'Strasborg',
        adresse: 'somebody actually know\'s',
        eventDateStart: today.setDate(today.getDate() + 10),
        eventDateEnd: today.setDate(today.getDate() + 14),
        maxSeats: 830,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        coverImage: 'undefined.jpg',
        mainImage: 'undefined.jpg',
        images: '{"image1": "undefined.jpg"}',
        approved: false,
        createdAt: today,
        updatedAt: today,
        Organizer: eventOrganizers[0][0].uuid
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
