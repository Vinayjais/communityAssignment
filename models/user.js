const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const uuid = require('uuid');
const User = sequelize.define('users',{
     id:{
        type: Sequelize.UUID,
        defaultValue: uuid.v4(),
        allowNull: false,
        primaryKey: true
     },
     name: Sequelize.STRING,
     email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
     },
     password: Sequelize.STRING,
     phone: {
      type:Sequelize.STRING,
      unique: true

     }


});

module.exports = User;