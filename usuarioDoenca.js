const Sequelize = require("sequelize")
const database = require("./conexao")

const UsuarioDoenca = database.define('usuarioDoenca' , {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

})

module.exports = UsuarioDoenca; 
