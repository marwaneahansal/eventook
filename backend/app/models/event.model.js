
module.exports =  (sequelize, Sequelize) => {
  const Event = sequelize.define('Event', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    adresse: {
      type: Sequelize.STRING,
      allowNull: false
    },
    eventDateStart: {
      type: Sequelize.DATE,
      allowNull: false
    },
    eventDateEnd: {
      type: Sequelize.DATE,
      allowNull: false
    },
    maxSeats: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    coverImage: {
      type: Sequelize.STRING,
      allowNull: false
    },
    mainImage: {
      type: Sequelize.STRING,
      allowNull: false
    },
    images: {
      type: Sequelize.JSON,
      allowNull: false
    },
    approved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  });

  return Event;
}