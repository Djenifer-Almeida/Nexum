const express = require('express');
const app = express();
const { where } = require('sequelize');
const conexao = require('./database/bancodados');

const User = require('./cont_user/User')
const UserController = require('./cont_user/UserController')
const session = require('express-session')
const Adv = require("./cont_user/Adv")
const AdmController = require('./cont_user/AdmController');
const bcrypt = require("bcrypt");
const { verificaSessao, verificaAdmin } = require('./middlewares/sessao');

app.use(express.static('public'));
app.use(express.json());

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.set("view engine","ejs");

app.use('/users', UserController);
app.use("/adm", AdmController);


  app.get('/adm', verificaSessao, verificaAdmin, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    User.findAll().then((usuario) => {
      res.render('administrador/adm', { usuario, message });
    });
  });
  
  app.get("/dashboard", verificaSessao, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    const usuariologin = req.session.user ? req.session.user.login : ''; 
    res.render('dashboard', { message, usuariologin });
  });

  app.get("/login",(req,res) =>{
    const error = req.session.error || '';
    req.session.error = null;
    User.findAll().then((usuario) => {
        res.render("login", {usuario,error});
    })
})

app.get("/edit_adv",(req,res) =>{
    Adv.findAll().then((advogado)=>{
        res.render("administrador/edit_adv",{advogado});
    })
})

app.get("/cad_adv",(req,res) =>{
    User.findAll().then((usuario) => {
        res.render("cad_adv", {usuario});
    })
})
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

app.get("/",(req,res) =>{
        res.render("home");
    })


conexao.authenticate().then(() =>{
    console.log("Conexão com o banco sucesso")
}).catch((errMsg) =>{
    console.log(errMsg)
})

app.listen(3000, () => {
    console.log("SERVIDOR RODANDO")
})
