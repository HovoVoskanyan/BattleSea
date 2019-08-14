const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var player1;
var player2;
var players=[];
var code;
var connectedUser={};
var index =0;


app.use(express.static(__dirname ));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

io.on('connection',socket=>
{
    socket.emit('news',{hello:"hello world"});
    socket.on('ready',(data)=>
    {

        if(player1==null)
        {
            
            //console.log("player1 null");
            code = makeCode(20);
            player1=
            {
                matrix:data.matrix,
                id:1
            };
            connectedUser["player1"+code]=socket;
            connectedUser["player1"+code].join(code);
            //socket.emit("waitingForOppnent",{player1});
            connectedUser["player1"+code].emit("waitingForOppnent",{id:1,userName:"player1"+code});
            return;
        }else if(player2==null)
        {
            //console.log("player2 null");
            player2=
            {
                matrix:data.matrix,
                id:2
            };
            connectedUser["player2"+code]=socket;
            connectedUser["player2"+code].join(code);
            //socket.emit("waitingForOppnent",{player1});
            connectedUser["player2"+code].emit("waitingForOppnent",{id:2,userName:"player2"+code});
        }
        if(player1!=null && player2!=null)
        {
            players.push({player1,player2,code});
            io.sockets.in(code).emit('readyToStart',{index,code});
            connectedUser["player1"+code].emit('turn',{move:true});
            player1=null;
            player2=null;
            index++;
        }
        //player1=data.matrix;
        //console.log(players);
    });

    socket.on('attacking',(data)=>{
        //console.log(data);
        connectedUser['player'+data.id+data.code].emit('turn',{move:false});

        data.id==1?id=2:id=1;
        connectedUser['player'+id+data.code].emit('turn',{move:true});
        connectedUser['player'+id+data.code].emit('AttackCell',{i:data.i,j:data.j});
    });

    socket.on('damaged',(data)=>
    {
        connectedUser['player'+data.id+data.code].emit('turn',{move:false});
        data.id==1?id=2:id=1;
        connectedUser['player'+id+data.code].emit('turn',{move:true});
    });

    socket.on('AttackRes',(data)=>
    {
        //console.log(data,"Result");
        data.id==1?id=2:id=1;
        if(data.result==4)
        {
            connectedUser['player'+id+data.code].emit('Attack',{points:data.points,result:data.result});
        }else
        {
            connectedUser['player'+id+data.code].emit('Attack',{i:data.i,j:data.j,result:data.result});
        }
    });
    socket.on('Defeated',(data)=>
    {
        data.id==1?id=2:id=1;
     
            connectedUser['player'+data.id+data.code].emit('gameOver',{message:"YouLost"});
      
        
            connectedUser['player'+id+data.code].emit('gameOver',{message:"You Won"});
        
    });

});

function makeCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


server.listen(3000,()=>console.log('server start on port 3000'));