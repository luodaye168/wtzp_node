const mysql = require('mysql')

const db = mysql.createPool({
    host: '10.13.106.227',
    port:'3306',
    user: 'root',
    password:'LLll1817258884',
    database:'my_db_01'
})

module.exports = db
