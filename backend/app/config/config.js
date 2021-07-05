require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DEV_DB_USER,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DATABASE,
    "host": process.env.DEV_DB_HOST,
    "dialect": process.env.DEV_DB_DIALECT,
    "seederStorage": 'sequelize'
  },
  "test": {
    "username": process.env.TEST_DB_USER,
    "password": process.env.TEST_DB_PASSWORD,
    "database": process.env.TEST_DATABASE,
    "host": process.env.TEST_DB_HOST,
    "dialect": process.env.TEST_DB_DIALECT
  },
  "production": {
    "username": process.env.PROD_DB_USER,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DATABASE,
    "host": process.env.PROD_DB_HOST,
    "dialect": process.env.PROD_DB_DIALECT
  }
}
