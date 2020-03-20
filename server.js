var express = require('express')

var app = express()

// socket.io实例化，要依赖于http模块所创建的服务
var http = require('http').createServer(app)
var io = require('socket.io')(http)

var id = 0

io.on('connect', function(socket) {
  id++
  // 服务端向客户端发送消息
  io.emit('server-chat', id+'：上线了')

  socket.on('disconnect', function() {
    io.emit('server-chat', id+'：下线了')
  })

  // 监听客户端消息
  socket.on('client-chat', function(msg) {
    // 发送给所有用户
    io.emit('server-chat', id+"："+msg)
  })
})

app.use(express.static('public'))

// 不能用express的app监听
http.listen(9090, function() {
  console.log('server is running on 9090')
})
