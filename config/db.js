const mysql = require("mysql2/promise");

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Naman@393',
    database: 'students_db'

})

module.exports = mySqlPool;