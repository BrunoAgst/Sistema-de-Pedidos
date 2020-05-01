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

router.post("/excluir-cliente", auth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Produto.findAll({
                where: {
                    clienteId: id
                }
            }).then(produtos => {
                Produto.destroy({
                    where: {
                        clienteId: id 
                    }
                }).then(() => {
                    Cliente.destroy({
                        where: {
                            id: id
                        }
                    }).then(() => {
                        res.redirect("/");
                    })
                })
            });
        }else{
            res.redirect("/");
        }
    }else{
        res.redirect("/");
    }
});

router.get("/editar-cliente/:slug", (req, res) => {
    var slug = req.params.slug;
    if(slug != undefined){
        Cliente.findOne({where: {slug: slug}}).then(cliente => {
            res.render("editar-cliente", {clientes: cliente});
        });
    }else{
        res.redirect("/");
    }
});


router.post("/editar-cliente/update", auth, (req, res) => {

    var id = req.body.id;
    var nome = req.body.nome;
    var endereco = req.body.endereco;
    var telefone = req.body.telefone;
    var slug = slugify(nome);
    
    Cliente.update({name: nome, slug: slug, phone: telefone, address: endereco}, 
            { where: { 
                id: id 
            }}).then(() => {
                res.redirect("/");
            })


});



module.exports = router;