const {Sequelize}= require('sequelize');
const conexao = new Sequelize ('bancotcc','root','',{
    host:'localhost',
    dialect:'mysql',
    define:{
        timestamps:false,
        freezeTableName:true
    }
})

module.exports = conexao;