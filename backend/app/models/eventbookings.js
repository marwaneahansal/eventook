'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventBookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EventBookings.init({
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    fullName: Sequelize.STRING,
    email: Sequelize.STRING,
    eventUid: Sequelize.UUID,
    eventTicketId: Sequelize.UUID,
    seats: Sequelize.INTEGER,
    price: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'EventBookings',
  });
  return EventBookings;
};