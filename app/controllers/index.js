/* a lógica das paginas deve ficar separada das rotas */

module.exports.home = function(application, req, res){
    res.render('index', {validacao : {}}); // espera um arquivo com extensão ejs
}