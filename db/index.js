const mysql = require('mysql')

const db = mysql.createPool({
    host: 'sh-cynosdbmysql-grp-9p26zf5e.sql.tencentcdb.com:27151',
    user: 'root',
    password:'1621710565@qq.COM',
    database:'my_db_01'
})

module.exports = db