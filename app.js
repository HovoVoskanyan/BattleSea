const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname ));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

io.on('connection',socket=>
{
    socket.emit('news',{hello:"hello world"});
    socket.on('my event',(data)=>
    {
        console.log(data);
    });

});

server.listen(3000,()=>console.log('server start on port 3000'));