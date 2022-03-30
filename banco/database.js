// Importação do Modulo do Sequelize
const Sequelize  = require("sequelize");

// CRIAÇÃO DA INSTANCIA DE CONEXÇÃO COM O BANDO DE DADOS COM USO DO SEQUELIZE
// Paramentros
// 1 - Nome do Banco de Dados
// 2 - Usuario do Bando de Dados
// 3 - Senhad o Banco de dados
// 4 - Objeto JSON que determina as configurações da conexação
    // 4.1 - Host do Banco
    // 4.2 - Tipo do Banco - MySQL
    // 4.3 - TimeZone - Determina o local para as horas (FusoHorario)

const conexao = new Sequelize(

    'api_livraria_bd',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }

);

//Deixar para outros arquivos visualizarem esse
module.exports = conexao;