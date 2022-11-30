const mysql = require('mysql')

const db = mysql.createPool({
    host: 'sh-cynosdbmysql-grp-rvttdmpg.sql.tencentcdb.com',//'10.13.106.227'
    port:'26904',//3306
    user: 'root',
    password:'LLll1817258884',
    database:'my_db_01'
})

module.exports = db
