const mysql = require('mysql')

const db = mysql.createPool({
    host: '10.0.224.15',
    port:'27151',
    user: 'root',
    password:'1621710565@qq.COM',
    database:'my_db_01'
})

module.exports = db