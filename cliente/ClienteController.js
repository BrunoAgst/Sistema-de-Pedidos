const express = require('express');
const router = express.Router();
const Cliente = require('./Cliente');
const Produto = require('../produto/Produto');
const slugify = require('slugify');
const auth = require('../middleware/auth');

router.get("/cadastrar-cliente", auth, (req, res) => {
    res.render('cadastrar-cliente');
});

router.post("/salvar-cliente", auth, (req, res) =>{
    var nome = req.body.nome;
    var telefone = req.body.telefone;
    var endereco = req.body.endereco;
    
    Cliente.create({
        name: nome,
        slug: slugify(nome),
        phone: telefone,
        address: endereco

    }).then(() => {
        res.redirect("/");
    })
    
});

router.get("/detalhes/:slug", auth, (req, res) => {
    var slug = req.params.slug;
    Cliente.findOne({
        where: {slug: slug},
        include: [{model : Produto}]
    }).then(produto =>{
        if(produto != undefined){
            Cliente.findAll().then(cliente => {
                res.render("detalhes", {produtos: produto.produtos, clientes: cliente});
            });
        }else{
            res.redirect("/");
        }
    });
});

router.get("/detalhes-pedido", auth, (req, res) => {
    res.render("detalhes");
});

module.exports = router