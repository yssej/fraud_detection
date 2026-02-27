const sequlize = require('sequelize');

const sequelize = new sequlize("financial_risk", "postgres", "root", {
    "host": "localhost",
    "dialect": "postgres"
});

module.exports = sequelize;
