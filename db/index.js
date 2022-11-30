const mysql = require('mysql')

const db = mysql.createPool({
    host: '10.13.106.227', //'sh-cynosdbmysql-grp-rvttdmpg.sql.tencentcdb.com'
    port:'3306',//26904
    user: 'root',
    password:'LLll18172588884',
    database:'my_db_01'
})

module.exports = db
