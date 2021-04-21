const { emit } = require("../../config/server");

module.exports.iniciaChat = function(application, req, res){
    var dadosForm = req.body;
    req.assert('apelido','O nome/apelido é obrigatório.').notEmpty();
    req.assert('apelido','O nome/apelido tem que conter entre 3 - 15 caracteres.').len(3,15);

    var erros = req.validationErrors();
    if (erros){
        res.render('index', {validacao : erros});
        return;
    }

    /* emit explicado no app.js
       servidor executando uma função do lado do cliente (view)*/
    application.get('io').emit(
        'msgParaCliente',
        {   apelido: dadosForm.apelido,
            mensagem: 'acabou de entrar no chat'
        }
    );

    res.render('chat', {dadosForm: dadosForm}); // espera um arquivo com extensão ejs 
}