const Sequelize = require('sequelize');
const connection = require('./database');

const Cadastrar = connection.define('pedidos',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nameProduct:{
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    amount:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Cadastrar.sync({force: false}).then(() => {});

module.exports = Cadastrar;