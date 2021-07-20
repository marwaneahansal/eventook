'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'Organizer',
      });

      this.hasMany(models.EventTickets, {
        foreignKey: 'eventUid'
      });

      this.hasMany(models.EventBookings, {
        foreignKey: 'eventUid'
      });
    }
  };
  Event.init({
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    title: Sequelize.STRING,
    country: Sequelize.STRING,
    city: Sequelize.STRING,
    adresse: Sequelize.STRING,
    eventDateStart: Sequelize.DATE,
    eventDateEnd: Sequelize.DATE,
    maxSeats: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    coverImage: Sequelize.STRING,
    mainImage: Sequelize.STRING,
    images: Sequelize.JSON,
    approved: Sequelize.BOOLEAN,
    Organizer: Sequelize.UUID
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};