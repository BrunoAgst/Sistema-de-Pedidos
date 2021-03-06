const express = require('express');
const router = express.Router();
const Usuario = require('./Usuario');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/logout", (req, res) => {
    req.session.usuario = undefined;
    res.redirect("login");
});

router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var senha = req.body.senha;

    Usuario.findOne({
        where: {
            email: email
        }
    }).then(usuario => {
        if(usuario != undefined){
            var correta = bcrypt.compareSync(senha, usuario.senha);


            if(correta){
                req.session.usuario = {
                    id: usuario.id,
                    email: usuario.email
                }
                res.redirect("/");
            
            }else{
                res.redirect("/login");
            }

        }else{
            res.redirect("/login");
        }
    });
});

router.get("/novo-usuario", auth, (req,res) => {
    res.render("cadastrar-usuario");
});

router.post("/salvar-usuario", auth, (req, res) => {
    var email = req.body.email;
    var senha = req.body.senha;

    Usuario.findOne({
        where:{
            email: email
        }
    }).then(usuario => {
        if(usuario == undefined){
            
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(senha, salt);

            Usuario.create({
                
                email: email,
                senha: hash

            }).then(() => {
                res.redirect("visualizar-usuarios");
            }).catch((err) => {
                console.log(err);
                res.redirect("visualizar-usuarios");
            })
        }
        else{
            res.redirect("/novo-usuarios");
        }
    });
});

router.get("/visualizar-usuarios", auth, (req, res) => {
    Usuario.findAll({raw: true}).then(usuario => {
        res.render("visualizar-usuarios",{usuarios: usuario});
    })
    
});

router.post("/excluir-usuario", auth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Usuario.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("visualizar-usuarios")
            })
        } else{
        res.redirect("visualizar-usuarios")
        }
    } else{
        res.redirect("visualizar-usuarios")
    }
});


module.exports = router;