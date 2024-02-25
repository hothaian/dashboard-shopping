//set up model for table in db

const dbConfig = require('../config/db-config');
const Sequelize = require('sequelize');

// set up sequelize
const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
});

const db = {};
db.sequelize = sequelize;

//attract all the model to db
db.models = {};
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);

module.exports = db;