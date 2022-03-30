//Importando o Sequelize
const Sequelize = require('sequelize');

//Conexao com o Banco de Dados
const conexao = require('../banco/database');

//Importação da Tabela de Caegoria para criação da chave estrangeira representando a cardinalidade 1:N
const Categoria = require('./Categoria');

const Livro = conexao.define(

    'tbl_livro',
    {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },

        preco:{
            type: Sequelize.DECIMAL,
            allowNull: false
        },

        imagem_peq:{
            type: Sequelize.STRING,
            allowNull: false
        },

        imagem_grd:{
            type: Sequelize.STRING,
            allowNull: false
        },

        detalhes:{
            type: Sequelize.TEXT,
            allowNull: false
        }
    }

);

// Colocando chave estrangeira | Lado Muitos N
Categoria.hasMany(Livro);

// Colocando chave Primaria | Lado Muitos 1
Livro.belongsTo(Categoria);

// Livro.sync({force:true})

module.exports = Livro;