const Sequelize = require("sequelize");
const conexao = require("../database/bancodados");
const bcrypt = require("bcrypt");

const User = conexao.define("usuario", {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
    },
    senha: {
        type: Sequelize.STRING, 
        allowNull: false,
    },
    tipo: {
        type: Sequelize.ENUM('administrador', 'advogado'),
        allowNull: false,
    },
});

User.beforeCreate(async (user) => {
  user.senha = await bcrypt.hash(user.senha, 10);
});



User.sync();

module.exports = User;
