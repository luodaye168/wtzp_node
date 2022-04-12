const joi = require('joi')
const bcrypt = require('bcryptjs')

/**
* string() 值必须是字符串
* alphanum() 值只能是包含 a-zA-Z0-9 的字符串
* min(length) 最小长度
* max(length) 最大长度
* required() 值是必填项，不能为 undefined
* pattern(正则表达式) 值必须符合正则表达式的规则
*/
const username = joi.string().min(1).max(16).required()
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()
exports.reg_login_schema = {
    body: {
        username,
        password,
    }
}

// const id = joi.number().integer().min(1).required()
const up_username = joi.string().min(1).max(16)
const up_password = joi.string().pattern(/^[\S]{6,12}$/)
const email = joi.string().email()

exports.update_userinfo_schema = {
    body: {
        // id,
        username: up_username,
        password: up_password,
        email,
    }
}


const device_id = joi.string().min(9).max(9)
const api_key = joi.string().min(28).max(28)
const user_id = joi.required()
const owner_id = joi.required()
const device_name = joi.required()
exports.insert_device_info_schema = {
    body: {
        user_id,
        owner_id,
        device_id,
        device_name,
        api_key,
        // img_src,
    }
}