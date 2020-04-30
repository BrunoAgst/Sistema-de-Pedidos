const Sequelize = require('sequelize');

const connection = new Sequelize('sistema_controle_pedidos', 'root', '15121996br.',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;