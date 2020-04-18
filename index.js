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
    if(produtoQuantidade == ""){ produtoQuantidade = 1; }
    
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

app.get("/detalhes/:id",(req, res) => {
    var id = req.params.id;
    Cadastrar.findOne({
        where: {id: id}
    }).then(pedido =>{
        if(pedido != undefined){
            res.render("detalhes",{
                pedidos: pedido
            });
        }else{
            res.redirect("/");
        }
    });
});

app.get("/detalhes-pedido",(req, res) => {
    res.render("detalhes");
});

app.get("/", (req, res) => {
    Cadastrar.findAll({raw: true, order: [ ["id", "DESC"] 
    ]}).then(pedido =>{
        res.render("index", {
            pedidos: pedido
        });
    })
});

app.listen("3000", () => { console.log("servidor ok"); });