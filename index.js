const express = require('express');
const app = express();
const connection = require('./database/database');
const bodyParser = require('body-parser');
const clienteController = require('./cliente/ClienteController');
const produtoController = require('./produto/ProdutoController');
const Cliente = require('./cliente/Cliente');

connection
    .authenticate()
    .then(() => {
        console.log("conectado com sucesso");
    })
    .catch((error) => {
        console.log(error);
    })

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/", clienteController);
app.use("/", produtoController);

app.get("/", (req, res) => {
    Cliente.findAll({raw: true, order: [ ["id", "DESC"] 
    ]}).then(cliente =>{
        res.render("index", {
            clientes: cliente
        });
    })
});

app.listen("3000", () => { console.log("servidor ok"); });