// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
//joi数据验证
const joi = require('joi')

//将参数转化成json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//报错或返回函数res.cc()中间件
app.use((req,res,next)=>{
  console.log(req.body)
  res.cc = function(err,status = 1){
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
//jwt鉴权
const expiresJWT = require('express-jwt')
//全局配置
const config = require('./config')
//url除了带有api的都要验证token
app.use(expiresJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))
//登录注册接口
const userRouter = require('./router/user')
app.use('/api',userRouter)
//带权限的接口
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)

app.use((err,req,res,next)=>{
  if(err instanceof joi.ValidationError) return res.cc(err)
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败,token无效')
  res.cc(err)
})


// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('api server running at http://127.0.0.1:80')
})