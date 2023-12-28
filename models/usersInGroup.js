const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const userGroup = sequelize.define('userGroup',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull:false,
        primaryKey: true
    }
   
});

module.exports = userGroup;