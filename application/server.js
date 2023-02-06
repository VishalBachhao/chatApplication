const express = require("express")
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.Port|| 3000

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

http.listen(PORT,function(){
    console.log("server running")
})

//socket

const io = require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('connected')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})