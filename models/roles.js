const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Roles = sequelize.define('roles' , {
  name : {
    type :DataTypes.STRING,
    allowNull:false
  }
})

module.exports = Roles;
