const express = require('express');
const app = express();
const connection = require('./database/database');
const Cadastrar = require('./database/Cadastrar');
const bodyParser = require('body-parser');

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

app.get("/cadastrar-pedido", (req, res) => {
    res.render('cadastrar');
})

app.post("/salvarpedido", (req, res) =>{
    var nome = req.body.nome;
    var telefone = req.body.telefone;
    var produtoNome = req.body.produtoNome;
    var produtoQuantidade = req.body.produtoQuantidade;
    var produtoValor = req.body.produtoValor;
    if(produtoQuantidade == ""){ produtoQuantidade = null; }
    
    Cadastrar.create({
        name: nome,
        phone: telefone,
        nameProduct: produtoNome,
        quantity: produtoQuantidade,
        amount: produtoValor
    }).then(() => {
        res.redirect("/");
    })
    
});

app.get("/", (req, res) => {
    Cadastrar.findAll({raw: true}).then(pedido =>{
        res.render("index", {
            pedidos: pedido
        });
    })
});

app.listen("3000", () => { console.log("servidor ok"); });