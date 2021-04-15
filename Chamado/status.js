const sql = require('../config/db_con');

module.exports = (Busca_Status, retorno) => {
    let err = null
    id = Busca_Status[0].id
    if (id == '') {
        retorno(err, 'erro')
    } else {
        const sqli = `SELECT * FROM chamado WHERE id = ${id}`;
        sql.query(sqli, function (error, results) {
            var string = JSON.stringify(results);
            var json = JSON.parse(string);

            if (json.nome == '') {
                dados = `OPS!!\nID ${id} não foi encontrado no banco de dados!`;
                retorno(err, dados);
            }
            else {
                var hora = json[0].data;
                var info = new Date(hora);
                info = info.toLocaleString("pt-BR");
                dados = `SOLICITANTE: ${json[0].nome.toUpperCase()}\nSTATUS: ${json[0].status.toUpperCase()}\nDATA: ${info}`;
                retorno(err, dados);
            }
        })
    }
}