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
      this.hasOne(models.User, {
        foreignKey: 'id',
        as: 'Organizer',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
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
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};