module.exports = function(application){
    application.get('/', function(req, res){
        //direciona para o controller e ele faz o render da pagina
        application.app.controllers.index.home(application,req,res); 
    })
}