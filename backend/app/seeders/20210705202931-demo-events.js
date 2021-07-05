'use strict';
const { v4: uuid } = require('uuid');

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const eventOrganizers = await queryInterface.sequelize.query('SELECT uuid from USERS WHERE isEventOrganizer=true');

    await queryInterface.bulkInsert('Events', [
      {
        uid: uuid(),
        title: 'Best Web Technologies in 2021',
        country: 'Morocco',
        city: 'Agadir',
        adresse: 'nowhere',
        eventDateStart: new Date().addDays(5),
        eventDateEnd: new Date().addDays(7),
        maxSeats: 250,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        coverImage: 'undefined.jpg',
        mainImage: 'undefined.jpg',
        images: '{"image1": "undefined.jpg"}',
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        Organizer: eventOrganizers[0][0].uuid
      },
      {
        uid: uuid(),
        title: 'Ethical Hacking',
        country: 'Germany',
        city: 'Berline',
        adresse: 'in someplcae',
        eventDateStart: new Date().addDays(12),
        eventDateEnd: new Date().addDays(13),
        maxSeats: 130,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        coverImage: 'undefined.jpg',
        mainImage: 'undefined.jpg',
        images: '{"image1": "undefined.jpg"}',
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        Organizer: eventOrganizers[0][0].uuid
      },
      {
        uid: uuid(),
        title: 'Meditation Secrets',
        country: 'Spain',
        city: 'Madrid',
        adresse: 'who knows?',
        eventDateStart: new Date().addDays(23),
        eventDateEnd: new Date().addDays(27),
        maxSeats: 50,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        coverImage: 'undefined.jpg',
        mainImage: 'undefined.jpg',
        images: '{"image1": "undefined.jpg"}',
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        Organizer: eventOrganizers[0][0].uuid
      },
      {
        uid: uuid(),
        title: 'Get better at eating',
        country: 'Morocco',
        city: 'Casablanca',
        adresse: 'anywhere',
        eventDateStart: new Date().addDays(13),
        eventDateEnd: new Date().addDays(20),
        maxSeats: 600,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        coverImage: 'undefined.jpg',
        mainImage: 'undefined.jpg',
        images: '{"image1": "undefined.jpg"}',
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        Organizer: eventOrganizers[0][0].uuid
      },
      {
        uid: uuid(),
        title: 'Something Better',
        country: 'France',
        city: 'Strasborg',
        adresse: 'somebody actually know\'s',
        eventDateStart: new Date().addDays(10),
        eventDateEnd: new Date().addDays(14),
        maxSeats: 830,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        coverImage: 'undefined.jpg',
        mainImage: 'undefined.jpg',
        images: '{"image1": "undefined.jpg"}',
        approved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        Organizer: eventOrganizers[0][0].uuid
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
