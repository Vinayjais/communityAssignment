const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const group = sequelize.define('groups',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name : Sequelize.STRING,

});

module.exports = group;