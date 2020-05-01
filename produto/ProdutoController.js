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


router.post("/excluir-pedido", auth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Produto.destroy({ where: {id: id}}).then(() => {
                res.redirect("/");
            })
        }else{
            res.redirect("/")
        }
    }else{
        res.redirect("/")
    }
})


router.get("/editar-pedido/:id", auth, (req, res) => {
    var id = req.params.id;
    Produto.findByPk(id).then(pedido => {
        if(pedido != undefined){
            if(!isNaN(id)){
                res.render("editar-pedido", {pedidos: pedido});
            } else{
                res.redirect("/");
            }
        }else{
            res.redirect("/");
        }
    })
});

router.post("/editar-pedido/update", auth, (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var slug = slugify(nome);
    var quantidade = req.body.quantidade;
    var kg = req.body.kg;
    var valor = req.body.valor;

    Produto.update({name: nome, slug: slug, quantity: quantidade, kg: kg, amount: valor},
        {where: {
            id: id
        }
    }).then(() => {
        res.redirect("/detalhes/" + slug);
    })
});

module.exports = router;