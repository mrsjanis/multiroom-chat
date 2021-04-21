/* importar o modulo framework express 
    - Framework pra melhorar controle de rotas, modulos, etc */
var express = require('express');

/* importar o modulo do consign 
    - modulariza e facilida o uso de rotas*/
var consign = require('consign');

/* importar o modulo do body-parser 
    - faz o request começar a entender o body*/
var bodyParser = require('body-parser');

/* importar express-validator
    - valida varios tipos de dados*/
var expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();

/* Configurar o EJS como engine de views no express
    - Setar as variaveis 'view engine' e 'views' do express */

app.set('view engine', 'ejs');
app.set('views', './app/view'); // Configura onde estão as views do projeto

/* configurar o middleware express.static */
app.use(express.static('./app/public')); // Configura os arquivos staticos da aplicação

/* configura o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/*  configurar o middleware express-validator */
app.use(expressValidator());

/* efetura o autoload das rotas/models/controllers pro objeto app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

/* exportar o objeto do app */
module.exports = app;