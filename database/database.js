const Sequelize = require('sequelize');

const connection = new Sequelize('sistema_pedidos', 'brunoagst', '19961215br.',{
    host: 'mysql669.umbler.com',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;