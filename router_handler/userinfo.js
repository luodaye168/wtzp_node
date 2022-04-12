//数据验证
const { result } = require('@hapi/joi/lib/base')
//数据库
const db = require('../db/index')
//哈希加密
const bcrypt = require('bcryptjs')

//设备相关
exports.insert_device = (req, res) => {
    const device_info = req.body
    // console.log(device_info.device_id)
    const sql = 'SELECT * FROM wrqs_device where device_id=?'
    db.query(sql, device_info.device_id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('该设备已存在')
        const insert_sql = 'insert into wrqs_device set ?'
        insert_data = {
            user_id: device_info.user_id,
            owner_id: device_info.owner_id,
            device_id: device_info.device_id,
            device_name: device_info.device_name,
            api_key: device_info.api_key,
            // img_src: device_info.img_src
        }
        db.query(insert_sql, insert_data, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows != 1) return res.cc('添加设备失败')
            res.cc('添加设备成功', 0)
        })
    })
}
exports.delete_device = (req, res) => {
    const sql = 'DELETE FROM wrqs_device where id=?'
    db.query(sql, req.body.id , (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除设备失败')
        res.cc('删除设备成功', 0)
    })
}
exports.update_device = (req, res) => {
    const sql = 'update wrqs_device set ? where id=?'
    db.query(sql, [{ device_name: req.body.device_name }, req.body.id ], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新设备信息失败')
        res.cc('更新设备信息成功', 0)
    })
}
exports.getdevice = (req, res) => {
    const sql = 'SELECT * FROM my_db_01.wrqs_device where user_id=?'
    db.query(sql, req.body.user_id, (err, result) => {
        if (err) return res.cc(err)
        // if (result.length != 1) return res.cc('获取设备列表失败')
        res.send({
            status: 0,
            message: '获取设备列表成功',
            data: result,
        })
    })
}


//传感器相关
exports.getsensor = (req, res) => {
    const sql = 'SELECT * FROM my_db_01.wrqs_sensor where device_id=?'
    db.query(sql, req.body.device_id, (err, result) => {
        if (err) return res.cc(err)
        // if (result.length != 1) return res.cc('获取设备列表失败')
        res.send({
            status: 0,
            message: '获取开关列表成功',
            data: result,
        })
    })
}
exports.insert_sensor = (req, res) => {
    const sensor_info = req.body
    const sql = 'SELECT * FROM wrqs_sensor where stream_name=?'
    // db.query(sql, {stream_name:sensor_info.stream_name,sensor_name:sensor_info.sensor_name}, (err, results) => {
    db.query(sql, sensor_info.stream_name, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('该数据流已存在')
        const insert_sql = 'insert into wrqs_sensor set ?'
        insert_data = {
            device_id: sensor_info.device_id,
            stream_name: sensor_info.stream_name,
            sensor_name: sensor_info.sensor_name,
            unit: sensor_info.unit,
        }
        db.query(insert_sql, insert_data, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows != 1) return res.cc('添加传感器失败')
            res.cc('添加传感器成功', 0)
        })
    })
}
exports.delete_sensor = (req, res) => {
    const sql = 'DELETE FROM wrqs_sensor where id=?'
    db.query(sql, req.body.id , (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除传感器失败')
        res.cc('删除传感器成功', 0)
    })
}
exports.update_sensor = (req, res) => {
    const sql = 'update wrqs_sensor set ? where id=?'
    db.query(sql, [{ sensor_name: req.body.sensor_name }, req.body.id ], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新传感器信息失败')
        res.cc('更新传感器信息成功', 0)
    })
}



//开关相关
exports.getswitch = (req, res) => {
    const sql = 'SELECT * FROM my_db_01.wrqs_switch where device_id=?'
    db.query(sql, req.body.device_id, (err, result) => {
        if (err) return res.cc(err)
        // if (result.length != 1) return res.cc('获取设备列表失败')
        res.send({
            status: 0,
            message: '获取开关列表成功',
            data: result,
        })
    })
}
exports.insert_switch = (req, res) => {
    const switch_info = req.body
    const sql = 'SELECT * FROM wrqs_switch where stream_name=?'
    // db.query(sql, {stream_name:sensor_info.stream_name,sensor_name:sensor_info.sensor_name}, (err, results) => {
    db.query(sql, switch_info.stream_name, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('该数据流已存在')
        const insert_sql = 'insert into wrqs_switch set ?'
        insert_data = {
            device_id: switch_info.device_id,
            high_low: switch_info.high_low,
            on_key: switch_info.on_key,
            off_key: switch_info.off_key,
            stream_name: switch_info.stream_name,
            switch_name: switch_info.switch_name,
        }
        db.query(insert_sql, insert_data, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows != 1) return res.cc('添加开关失败')
            res.cc('添加开关成功', 0)
        })
    })
}
exports.delete_switch = (req, res) => {
    const sql = 'DELETE FROM wrqs_switch where id=?'
    db.query(sql, req.body.id , (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除开关失败')
        res.cc('删除开关成功', 0)
    })
}
exports.update_switch = (req, res) => {
    const sql = 'update wrqs_switch set ? where id=?'
    db.query(sql, [{ switch_name: req.body.switch_name }, req.body.id ], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新开关信息失败')
        res.cc('更新开关信息成功', 0)
    })
}

//用户信息相关
exports.getUserInfo = (req, res) => {
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length != 1) return res.cc('获取用户信息失败')
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: result[0],
        })
    })
}
exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?'
    if (req.body.password != undefined) {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    console.log(req)
    db.query(sql, [req.body, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户信息失败')
        res.cc('更新用户信息成功', 0)
    })
}