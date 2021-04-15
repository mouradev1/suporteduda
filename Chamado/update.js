const sql = require('../config/db_con');

module.exports = (updade_status, retorno) => {
    id = updade_status[0].id
    let err = null
    const sqli = `SELECT * FROM chamado WHERE id = ${id}`;
    sql.query(sqli, function (error, results) {
        var string = JSON.stringify(results);
        var json = JSON.parse(string);
        console.log(json)
        console.log(`Valor ${valor}`)
        if (json != "") {
            var valor = json[0].id;
            const sqli = `UPDATE chamado SET status = 'fechado' WHERE id = ${valor}`;
            if (sql.query(sqli)) {
                dados = `Chamado ${valor} atualizado com sucesso!!`;
                retorno(err, dados);
            }
        } else {
            dados = `OPS!!\nID ${id} não foi encontrado no banco de dados!`;
            retorno(err, dados);
        }
    })
}
