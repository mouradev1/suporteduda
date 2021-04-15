const sql = require('../config/db_con');

module.exports = (Criar_Chamados, callback) => {
    let error = null
    nome = Criar_Chamados[0].nome;
    id_telegram = Criar_Chamados[0].id_telegram
    assunto = Criar_Chamados[0].assunto
    status = Criar_Chamados[0].status
    data = Criar_Chamados[0].data
    const sqli = "INSERT INTO chamado(nome,id_telegram,assunto,status,data) VALUES ?"; //INSERI O CHAMADO NO BANCO DE DADOS 
    const values = [[nome, id_telegram, assunto, status, data]];

    sql.query(sqli, [values], function (error, results, fields) {
        if (error) return console.log(error);
        console.log('adicionou Chamado!');
        const sqli = "SELECT * FROM chamado ORDER BY id DESC LIMIT 1"; //RETORNA O ULTIMO CHAMADO CRIADO 
        sql.query(sqli, function (error, results) {
            if (error) return console.log(error);
            var string = JSON.stringify(results);
            var json = JSON.parse(string);
            id = json[0].id;
            dados = `${json[0].nome}! O Chamado foi criado com sucesso\nID do chamado é ${id}\nPara obter o status do chamado digite o comando /status ${id}.`;
            callback(error, dados) // Retorno dos dados 
        })
    })
}