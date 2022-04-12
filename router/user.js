const express = require('express')
const router = express()

const user_handler = require('../router_handler/user')

const expressJoi = require('@escook/express-joi')
const {reg_login_schema} = require('../schema/user')

router.post('/reguser',expressJoi(reg_login_schema) ,user_handler.reguser)

router.post('/login',expressJoi(reg_login_schema) , user_handler.login)

module.exports = router