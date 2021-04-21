/*importar as configurações do servidor*/
const { set } = require('./config/server');
var app = require('./config/server');

/*parametrizar a porta de escuta*/
var server = app.listen(80, function(){
    console.log('Servidor Online');
});

/* configurando o socket.io */
var io = require('socket.io').listen(server);
app.set('io', io);

/* criar a conexão por websocket 
    - on: fica ouvindo pedidos de execução
        - nome do envento, o que deve ser executado quando esse evento for chamado
    - emit: pedido pra executar alguma ação
        - função que tem que executar, qualquer estrutura de dados (json, string, function) 
    - pega a conexão via socket que está configurada no chat.ejs*/
io.on('connection',function(socket){
    console.log('Usuario conectou');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });


    socket.on('msgParaServidor', function(data){
        /* eventos de dialogo */
        // devolve o evento para quem emitiu
        socket.emit('msgParaCliente',{apelido: data.apelido, mensagem: data.mensagem});
        // distribui o evento pra todos conectados
        socket.broadcast.emit('msgParaCliente',{apelido: data.apelido, mensagem: data.mensagem});

        /* atualiza os participantes */
        if(parseInt(data.atualizado) == 0){
            // devolve o evento para quem emitiu
            socket.emit('participantesParaCliente',data.apelido);
            // distribui o evento pra todos conectados
            socket.broadcast.emit('participantesParaCliente',data.apelido);
        }
    });

});
