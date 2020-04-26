const Sequelize = require('sequelize')
const connection = require('../database/database');


const Cliente = connection.define('clientes',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    address:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

//Cliente.sync({force: true});

module.exports = Cliente;