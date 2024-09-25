require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./conexao');
const Usuarios = require('./models/usuarios');
const FichaMedica = require('./models/fichaMedica');
const Doenca = require('./models/doenca');
const { Sequelize, where } = require('sequelize');
const twilio = require('twilio')

const app = express();
app.use(cors());  
app.use(express.json());

(async () => {
    try {
        await database.sync();
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
})();

app.post('/create/', async (req, res) => {
        const novaFichaMedica = await FichaMedica.create({
            medicamentos: req.body.medicamentos,
            alergias: req.body.alergias,
            cancer: req.body.cancer,
            comorbidades: req.body.comorbidades,
            tipoSanguineo: req.body.tiposSanguineo,
            obs: req.body.observacao,
        });

        const novoUsuario = await Usuarios.create({
            nome: req.body.nome,
            nascimento: req.body.nascimento, // Data no formato YYYY-MM-DD
            sexo: req.body.sexo,
            CPF: req.body.cpf,
            senha: req.body.senha,
            telefonePessoal: req.body.telefonePessoal,
            telefoneEmergencia: req.body.telefoneEmergencia,
            CEP: req.body.cep,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            numero: req.body.numero,
            cidade: req.body.cidade,
            estado: req.body.estado,
            IdFichaMedica: novaFichaMedica.id
        });

        const doencasSelecionadas = req.body.doencas

        const doencas = await Doenca.findAll({
            where: {
                id: doencasSelecionadas 
            }
        });
        await novoUsuario.setDoencas(doencas);  
    })
app.post('/logar/', async (req, res) => {
    const cpfUsuario = req.body.cpf
    const senha = req.body.senha


    const verificar = await Usuarios.findOne({
        where: {
            [Sequelize.Op.and]:[ {CPF: cpfUsuario}, {senha: senha}] 
        }
    })
    
    if(verificar){
        console.log('Usuario encontrado: ', verificar)
        
        res.json(verificar);
    }

})

app.post('/pegarInfo/', async (req, res) => {
    const idUsuario = req.body.id; 

    const usuarioCadastrado = await Usuarios.findByPk(idUsuario, {
        include: [
            {
                model: FichaMedica,  // Incluindo a Ficha Médica
                attributes: { exclude: [] }  // Incluindo todos os atributos da Ficha Médica
            },
            {
                model: Doenca,
                through: { attributes: [] } // Isso é para não mostrar a tabela intermediária
            }
        ]
    });

    if (usuarioCadastrado){
        console.log(usuarioCadastrado)
        const usuario = await usuarioCadastrado.toJSON();
    
        res.json(usuario)
    }

})

const accountSid =  process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = new twilio(accountSid, authToken);

app.post('/iniciar-chamada', (req, res) => {
    const { identificacao, age, rua, numero, bairro, saude, medicamentos, alergia, motivo, obs, enderecoAtual} = req.body;
    

 
  
  client.calls
    .create({
      url: `https://tcc-8911.twil.io/welcome?alergia=${encodeURIComponent(alergia)}&saude=${encodeURIComponent(saude)}&enderecoAtual=${encodeURIComponent(enderecoAtual)}&motivo=${encodeURIComponent(motivo)}&identificacao=${encodeURIComponent(identificacao)}&age=${encodeURIComponent(age)}&rua=${encodeURIComponent(rua)}&numero=${encodeURIComponent(numero)}&bairro=${encodeURIComponent(bairro)}&medicamentos=${encodeURIComponent(medicamentos)}&obs=${encodeURIComponent(obs)}`,
      to: '+5516991978947',
      from: '+17275138234',
    })
    .then(call => res.json({ sid: call.sid }))
    .catch(error => {
      console.error('Error making call:', error);
      res.status(500).send('Erro ao fazer a chamada.');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
