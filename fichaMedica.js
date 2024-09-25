const Sequelize  = require("sequelize");
const database = require('../conexao')
// const Usuarios = require('./usuarios')

const FichaMedica = database.define('FichaMedica', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    medicamentos: {
        type: Sequelize.STRING,
        allowNull: false,
     },
    alergias: {
        type: Sequelize.STRING,
        allowNull: false,
     },
    cancer: {
        type: Sequelize.STRING,
        allowNull: false,
     },
    cancer: {
        type: Sequelize.STRING,
        allowNull: false,
     },
    comorbidades: {
        type: Sequelize.STRING,
        allowNull: false,
     },
    tipoSanguineo: {
        type: Sequelize.STRING,
        allowNull: false,
     },
    obs: {
        type: Sequelize.STRING,
        allowNull: false,
     },
})



module.exports = FichaMedica;