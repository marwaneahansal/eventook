const dbConfig = require('../config/db-config');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


const Event = require('./event.model');
const User = require('./user.model');

db.users = User(sequelize, Sequelize);
db.events = Event(sequelize, Sequelize);




db.events.belongsTo(db.users);

module.exports = db;