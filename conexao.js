const Sequelize = require('sequelize') 
const sequelize = new Sequelize('emergencialsaude', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
}) 

sequelize.authenticate().then(() => {
    console.log('Conectado com sucesso')
}).catch((error) => {
    console.log('Problemas ao se comunicar com o BD: ', error)
})

module.exports = sequelize