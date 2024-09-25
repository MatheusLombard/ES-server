const Sequelize  = require("sequelize");
const database = require('./conexao');
const FichaMedica = require("./fichaMedica");
const Doenca = require("./doenca");
const UsuarioDoenca = require("./usuarioDoenca");


const Usuarios = database.define('Usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
       type: Sequelize.STRING,
       allowNull: false,
    },
    nascimento: {
       type: Sequelize.DATEONLY,
       allowNull: false,
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    CPF: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefonePessoal: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefoneEmergencia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    CEP: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    numero: {
        type: Sequelize.INTEGER,
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
});

Usuarios.belongsTo(FichaMedica, {
    constraint: true,
    foreignKey: 'IdFichaMedica'
})


Usuarios.belongsToMany(Doenca, {
    through: {
        model: UsuarioDoenca
    },
    foreignKey: 'idUsuario',
    constraint: true
})

module.exports = Usuarios;

