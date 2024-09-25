const Sequelize  = require("sequelize");
const database = require('../conexao')

const Doenca = database.define('Doenca', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    doenca: {
       type: Sequelize.STRING,
       allowNull: false,
    }
});

module.exports = Doenca;