const sql = require('../config/db_con');

module.exports = (Todos, retorno) => {
    let err = null;
    var id_telegram = Todos[0].id_telegram
    var quantidade = Todos[0].quantidade
    var nome = Todos[0].nome

    const sqli = `SELECT * FROM chamado WHERE id_telegram = ${id_telegram} ORDER BY id DESC`;
    sql.query(sqli, function (error, results) {
        var string = JSON.stringify(results);

        var json = JSON.parse(string);

        if (json == '') {

            dados = `Opa! ${nome} você ainda não possui chamados cadastrados no nosso banco de dados! `
            retorno(err, dados)
        } else if (quantidade > json.length) {
            dados = `${nome} infelizmente você informou uma quantidade maior do que os seu chamdos cadastrado no nosso banco de dados..\nTenta novamente usando /todos ${json.length} pra lista todos os seus chamados.`
            retorno(err, dados)
        } else {
            var hora = json[0].data;
            var dados = "";
            var i = 0;
            var ms = `OLÁ ${nome.toUpperCase()}\nSEUS ${quantidade} CHAMADOS SOLICITADOS!!\nVOCÊ POSSUI ${json.length} CHAMADOS`;

            hora = hora.toLocaleString("pt-br");

            for (i = 0; i < quantidade; i++) {

                dados += `\nID:  ${json[i].id}  STATUS:  ${json[i].status}`;

            }
            enviar = ms + dados;
            retorno(err, enviar)
        }
    })

}
