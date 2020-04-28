const express = require('express');
const router = express.Router();
const Cliente = require('../cliente/Cliente');
const Produto = require('./Produto');
const slugify = require('slugify');
const auth = require('../middleware/auth');


router.get("/cadastrar-produto/:slug", auth, (req, res) => {
    var slug = req.params.slug;
    Cliente.findOne({
        where: {slug: slug}
    }).then(cliente => {
        if(cliente != undefined){
            res.render("cadastrar-produto",{
                clientes: cliente
            });
        }else{
            res.redirect("/");
        }
    })
});

router.post("/salvar-produto", auth, (req, res) => {
    var nome = req.body.nome;
    var quantidade = req.body.quantidade;
    var kg = req.body.kg;
    var preco = req.body.preco;
    var id = req.body.id;

    Produto.create({
        name: nome,
        slug: slugify(nome),
        quantity: quantidade,
        kg: kg,
        amount: preco,
        clienteId: id
    }).then(() => {
        res.redirect("/");
    })
});


module.exports = router;