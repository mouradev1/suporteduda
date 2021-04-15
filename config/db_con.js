const mysql = require("mysql");
const db = require("./db_dados");
var connection = mysql.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

module.exports = connection;