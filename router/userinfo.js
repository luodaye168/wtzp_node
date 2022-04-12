const express = require('express')
const router = express()
const userinfo_handler = require('../router_handler/userinfo')

const expressJoi = require('@escook/express-joi')
const {update_userinfo_schema} = require('../schema/user')
const {insert_device_info_schema} = require('../schema/user')
// const {insert_device_info_schema} = require('../schema/user')

//获取用户个人信息
router.get('/userinfo',userinfo_handler.getUserInfo)
//更新用户个人信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)


//添加设备
router.post('/insert_device', expressJoi(insert_device_info_schema),userinfo_handler.insert_device)
//删除设备
router.post('/delete_device',userinfo_handler.delete_device)
//更新设备
router.post('/update_device',userinfo_handler.update_device)
//获取设备列表
router.post('/device',userinfo_handler.getdevice)


//添加传感器
router.post('/insert_sensor',userinfo_handler.insert_sensor)
//删除传感器
router.post('/delete_sensor',userinfo_handler.delete_sensor)
//修改传感器
router.post('/update_sensor',userinfo_handler.update_sensor)
//获取传感器列表
router.post('/sensor',userinfo_handler.getsensor)


//添加开关
router.post('/insert_switch',userinfo_handler.insert_switch)
//删除开关
router.post('/delete_switch',userinfo_handler.delete_switch)
//修改开关
router.post('/update_switch',userinfo_handler.update_switch)
//获取开关列表
router.post('/switch',userinfo_handler.getswitch)

module.exports = router