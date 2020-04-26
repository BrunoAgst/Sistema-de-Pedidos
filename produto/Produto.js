const Sequelize = require('sequelize');
const connection = require('../database/database');
const Cliente = require('../cliente/Cliente');

const Produto = connection.define('produtos',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity:{
        type: Sequelize.STRING,
        allowNull: false
    },
    kg:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    amount:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Cliente.hasMany(Produto);
Produto.belongsTo(Cliente);

//Produto.sync({force: true});

module.exports = Produto;