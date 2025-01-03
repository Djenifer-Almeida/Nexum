function verificaSessao(req, res, next) {
    console.log("Sessão atual:", req.session);
    if (!req.session.user) {
      req.session.error = 'Você precisa estar logado para acessar esta página';
      return res.redirect('/login');
    }
    next();
  }
  
  
  function verificaAdmin(req, res, next) {
    if (req.session.user?.tipo !== 'administrador') {
      req.session.error = 'Acesso negado!';
      return res.redirect('/login');
    }
    next();
  }
  
  module.exports = { verificaSessao, verificaAdmin };