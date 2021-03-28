// import { DataTypes } from "sequelize/types"

module.exports =  (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: 'userEmailIndex',
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    eventCreator: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return User;
}