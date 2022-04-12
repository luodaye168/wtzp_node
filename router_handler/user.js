const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config')
exports.reguser = (req, res) => {
    const userinfo = req.body
    const sqlStr = 'SELECT * FROM ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        if (results.length > 0) {
            // return res.send({ status: 0, message: '用户名被占用' })
            return res.cc('用户名被占用')
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // if(err) return res.send({status: 1, message: err.message})
            if (err) return res.cc(err)
            // if(results.affectedRows != 1) return res.send({status:1,message:'注册失败'})
            if (results.affectedRows != 1) return res.cc('注册失败')
            // res.send({status:0,message:'注册成功'})
            res.cc('注册成功', 0)
        })
    })

    // res.send('reguser ok')
}

exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc('登录失败')
        //验证密码
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('登录失败')
        const user = { ...results[0], password: '', user_pic: '' }
        //生成token
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer '+tokenStr,
        })

    })
}