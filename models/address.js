const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Address = sequelize.define('address', {
    city: {
        type: Sequelize.STRING,
        allowNull:false
    },
    state: {
      type: Sequelize.STRING,
      allowNull:false
    },
    pincode:{
      type:Sequelize.INTEGER,
      allowNull:false
    },
    street:{
      type:Sequelize.STRING,
      allowNull:false
    }
});

module.exports = Address;
