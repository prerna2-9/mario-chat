const express = require('express');
const app = express();
const http = require('http');
const socket = require('socket.io')
const path = require('path');
require('dotenv/config');

app.set('view engine','ejs');

const port = process.env.PORT ||3000;

const server = app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});


app.use(express.static(path.join(__dirname,'/public')));

const io = socket(server);

io.on('connection',(socket)=>{
    console.log("A new client is connected",socket.id);

    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })

});

app.get('/',(req,res)=>{
    res.render('index.ejs');
})


