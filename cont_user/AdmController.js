const express = require('express');
const router = express.Router();
const Advogado = require('./Adv');
const app = express();
const { where } = require('sequelize');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

app.get("/adv_info",(req,res) =>{
    Adv.findAll().then((advogado)=>{
    res.render("administrador/adv_info",{advogado});
})
})

app.get("/lista_adv",(req,res) =>{
    Adv.findAll().then((advogado)=>{
    res.render("administrador/lista_adv",{advogado});
})
})
router.get('/adm',(req,res)=>{
    const error = req.session.error;
req.session.error = null;
res.render('administrador/adm', { error });
})

router.post('/criadvogado', (req, res) => {
    const {nome, data_nac, email, telefone, endereco, cidade, estado, oab } = req.body;

    Advogado.create({
        nome,
        data_nac,
        email,
        telefone,
        endereco,
        cidade,
        estado,
        oab
    })
    .then(() => {
        req.session.message = "Advogado cadastrado com sucesso!";
        res.redirect('/cad_adv');
    })
    .catch(err => {
        console.error("Erro ao cadastrar advogado:", err);
        res.redirect('/adm');
    });
});

router.get("/editadv/:id", (req, res) => {
    const id = req.params.id; 
    Advogado.findByPk(id) 
        .then((advogado) => {
            if (advogado) {
                res.render("administrador/edit_adv", { advogado }); 
            } else {
                res.status(404).send("Advogado não encontrado.");
            }
        })
        .catch((err) => {
            console.error("Erro ao carregar advogado:", err);
            res.status(500).send("Erro ao carregar advogado.");
        });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Erro ao encerrar sessão:', err);
        return res.status(500).send('Erro interno ao encerrar sessão');
      }
      res.redirect('/login'); 
    });
  });

router.get("/advinfo/:id", (req, res) => {
    const id = req.params.id; 
    Advogado.findByPk(id) 
        .then((advogado) => {
            if (advogado) {
                res.render("administrador/adv_info", { advogado }); 
            } else {
                res.status(404).send("Advogado não encontrado.");
            }
        })
        .catch((err) => {
            console.error("Erro ao carregar advogado:", err);
            res.status(500).send("Erro ao carregar advogado.");
        });
}); 



router.post("/updateadv", (req, res) => {
    const id = req.body.id;
    const { id_advogado, nome, data_nac, email, telefone, endereco, cidade, estado, oab } = req.body;
    Advogado.update(
        { nome, data_nac, email, telefone, endereco, cidade, estado, oab }, 
        { where: {  id_advogado } } 
    )
        .then(() => {
            res.redirect("/lista_adv");  
        })
        .catch((err) => {
            console.error("Erro ao atualizar advogado:", err);
            res.status(500).send("Erro ao atualizar advogado.");
        });
});

router.post("/deletadv", (req, res) => {
    const id = req.body.id;

    Advogado.destroy({
        where: { id_advogado: id }
    })
    .then(() => {
        res.redirect("/lista_adv"); 
    })
    .catch((err) => {
        console.error("Erro ao excluir advogado:", err);
        res.status(500).send("Erro ao excluir advogado.");
    });
});

module.exports = router;
