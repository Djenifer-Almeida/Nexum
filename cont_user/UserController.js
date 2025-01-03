const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/login',(req, res) => {
  req.session.error = 'Usuário inválido';
  req.session.save(() => {
    res.redirect('/login');
  });
});

router.post('/cadadvogado', async (req, res) => {
  try {
    const { login, senha, tipo } = req.body;

    if (!login || !senha || !tipo) {
      req.session.message = "Todos os campos são obrigatórios!";
      return res.redirect('/adm');
    }

    if (!['administrador', 'advogado'].includes(tipo)) {
      req.session.message = "Tipo de usuário inválido!";
      return res.redirect('/adm');
    }

    await User.create({ login, senha, tipo });

    req.session.message = "Advogado cadastrado com sucesso!";
    res.redirect('/adm');
  } catch (err) {
    console.error("Erro ao cadastrar advogado:", err);

    req.session.message = "Erro ao cadastrar advogado.";
    res.redirect('/adm');
  }
});

router.post('/login', async (req, res) => {
  console.log("POST /login acessado");
  console.log("Dados recebidos:", req.body);

  const { login, senha, tipo } = req.body;
  
  
  const user = await User.findOne({ where: { login, tipo } });

  if (!user) {
    console.error("Usuário não encontrado");
    req.session.error = 'Usuário ou senha inválidos';
    return res.redirect('/users/login');
  }

  try {
    
    const senhaValida = await bcrypt.compare(senha, user.senha);
    
    if (!senhaValida) {
      console.error("Senha inválida");
      req.session.error = 'Usuário ou senha inválidos';
      return res.redirect('/login');
    }
    
    req.session.user = { id: user.id, login: user.login, tipo: user.tipo };
    req.session.message = 'Login realizado com sucesso!';

    return res.redirect(user.tipo === 'administrador' ? '/adm' : '/dashboard');
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).send('Erro interno do servidor');
  }
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


module.exports = router;
                 