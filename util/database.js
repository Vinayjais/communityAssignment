const Sequelize = require('sequelize');

const sequelize = new Sequelize('community','root','241021@Vinay',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;




