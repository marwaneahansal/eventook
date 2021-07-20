'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventTickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Event, {
        foreignKey: 'eventUid'
      });
    }
  };
  EventTickets.init({
    eventUid: Sequelize.UUID,
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }, {
    sequelize,
    modelName: 'EventTickets',
  });
  return EventTickets;
};