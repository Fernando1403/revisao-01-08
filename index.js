//carregar o modulo express
const { urlencoded } = require('express')
const express = require('express')

//carregar o modulo mongoose
const mongoose = require('mongoose')

//conectar com o banco de dados revisao
const conexao = ()=>{
    mongoose.connect('mongodb+srv://userRevisao:revisao123@cluster1.uman3.mongodb.net/revisao')
}

//conectar com a colletion infos
const modelo = new mongoose.Schema({
    nome:String,
    turma:String,
    disciplina:String
})
const infos = mongoose.model('infos',modelo)

//executar o modulo express
const app = express()

//definir o local padrão para os arquivos ejs
app.set("views",'./')  // o ./ significa pasta principal

//renderizar o arquivo index.ejs na requisição /(root)
app.get('/',async(req,res)=>{
    //conectar com o revisao
    conexao()
    //buscar todos os dados de infos
    const resultado = await infos.find()
    res.render('index.ejs',{resultado})
    //console.log(resultado)
})

//gravar as informações do formulario no banco de dados
app.use(urlencoded({extended:false}))

app.post('/',async(req,res)=>{
    const dados = req.body
    res.send(dados)
})

//ligar o servidor na porta 3050
app.listen(3050,()=>{
    console.log('Servidor local em http://localhost:3050')
})