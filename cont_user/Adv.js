const Sequelize = require("sequelize");
const conexao = require("../database/bancodados");

const Adv = conexao.define("advogado", {
    id_advogado: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    data_nac: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    oab: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    data_registro: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, 
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ativo'
    },
});
Adv.sync();
module.exports = Adv;
