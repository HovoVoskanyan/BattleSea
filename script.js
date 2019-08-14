var Mine=[];
var Opponents=[];
var injuriedShips;
var ToMove=undefined;
var flag=false;
var CanMove =true;
var code;
var socket = io('http://localhost:3000');
var id;
var userName;
var turn =false;
var index;
var PointsToSend;
//console.log(Mine);

function initialize(matrix)
{
    for(var i=0; i<10; i++)
    {
        matrix[i]=[];
        for(var j=0; j<10; j++)
        {
            matrix[i][j]=0;
        }
    }
}
initialize(Opponents);
initialize(Mine);
    var table = 
    {
        CreateTable:function(Where,id)
        {
            $(Where).append(`<table id ="${id}"></table>`);
            //console.log($(Where),Where);
        },


        Draw:function(Where,matrix)
        {
            $(`#${Where}`).html('');
          var struct=``;
          for(var i=0;i<matrix.length;i++)
          {
              struct+=`<tr class="${i}">\n`;

              for(var j=0;j<matrix[i].length;j++)
              {
                  ///TOCHANGE
                  struct+=`<td class="${Where}${i}${j}" onclick="Click(this)"></td>\n`;
                    

                  ///TOCHANGE
              }
              struct+=`</tr>\n`;
          }
          //console.log(struct);
          $(`#${Where}`).append(struct);
          for(var i =0 ; i<10;i++)
          {
              for(var j=0;j<10;j++)
              {
                  if(matrix[i][j]==1)
                  {
                      $(`.${Where}${i}${j}`).css({"background-color":"gray"});
                  }
                  if(matrix[i][j]==2)
                  {
                    $(`.${Where}${i}${j}`).css({"background-color":"lightblue"});
                  }
                  if(matrix[i][j]==3)
                  {
                    $(`.${Where}${i}${j}`).css({"background-color":"yellow"});
                  }
                  if(matrix[i][j]==4)
                  {
                    $(`.${Where}${i}${j}`).css({"background-color":"red"});
                  }
                  
              }
          }
        }
    }
    
    ///actions
    
// //creating ships
//     ship=new Ship(4);
//     res=ship.AddToMap(Mine);
//     ship.Surround(res,Mine);

//     console.log(Mine);
//     ship=new Ship(4);
//     res=ship.AddToMap(Mine);
//     ship.Surround(res,Mine);

//     console.log(Mine);
//     ship=new Ship(2);
//     res=ship.AddToMap(Mine);
//     ship.Surround(res,Mine);
    
                

                //  function bla(){
                //     socket.emit('private message','valod','priv');
                //  }
                //     socket.on('news', function (data) {
                //     console.log(data);
                //     socket.emit('my event', { my: 'data' });
                //     socket.on('valod',function(data){
                //         console.log(data);
                //     });
                    
                //   });
    
$( document ).ready(function() {
    //console.log( "ready!" );
    table.CreateTable("#main1",'play1');
    table.Draw('play1',Mine);
    $('#main1').prepend('<h1>Mine</h1>');

    table.CreateTable("#main2",'play2');
    table.Draw('play2',Opponents);
    $('#main2').prepend('<h1>Opponents</h1>');



    $(document).keyup(function(event)
    {
        //console.log(event.keyCode);
        if(ToMove==undefined)
        {
            return;
        }
        if(!CanMove)
        {
            return;
        }
        if(event.keyCode==37)
        {
            //console.log("Left");
            var points = ToMove.points;
            var sur = ToMove.surPoints;

            ToMove.MoveLeft(Mine);
            for(var i=0;i<ToMove.points.length;i++)
            {
                //console.log(ToMove.points[i]);
                Mine[ToMove.points[i].i_index][ToMove.points[i].j_index]=1;
            }   
            ToMove.Surround(ToMove.points,Mine,5);

            if(flag)
            {
                Ships.push(ToMove);
                //console.log("bubu");
                flag=false;
            }

            table.Draw("play1",Mine);
        }

        if(event.keyCode==39)
        {
            //console.log("Right")
            var points = ToMove.points;
            var sur = ToMove.surPoints;

            ToMove.MoveRight(Mine);
            for(var i=0;i<ToMove.points.length;i++)
            {
                //console.log(ToMove.points[i]);
                Mine[ToMove.points[i].i_index][ToMove.points[i].j_index]=1;
            }   
            ToMove.Surround(ToMove.points,Mine,5);

            if(flag)
            {
                Ships.push(ToMove);
                //console.log("bubu");
                flag=false;
            }
            table.Draw("play1",Mine);
        }

        if(event.keyCode==38)
        {
           // console.log("Up")
            var points = ToMove.points;
            var sur = ToMove.surPoints;

            ToMove.MoveUp(Mine);
            for(var i=0;i<ToMove.points.length;i++)
            {
                //console.log(ToMove.points[i]);
                Mine[ToMove.points[i].i_index][ToMove.points[i].j_index]=1;
            }   
            ToMove.Surround(ToMove.points,Mine,5);

            if(flag)
            {
                Ships.push(ToMove);
                //console.log("bubu");
                flag=false;
            }

            table.Draw("play1",Mine);
        }



        if(event.keyCode==40)
        {
            
            //table.Draw('play1',Mine);
            console.log("Down");
            var points = ToMove.points;
            var sur = ToMove.surPoints;

            ToMove.MoveDown(Mine);
            for(var i=0;i<ToMove.points.length;i++)
            {
                //console.log(ToMove.points[i]);
                Mine[ToMove.points[i].i_index][ToMove.points[i].j_index]=1;
            }   
            ToMove.Surround(ToMove.points,Mine,5);

            if(flag)
            {
                Ships.push(ToMove);
                //console.log("bubu");
                flag=false;
            }

            table.Draw("play1",Mine);
           
        }
        if(event.keyCode==32)
        {
            
            //table.Draw('play1',Mine);
            //console.log("reverese");
            var points = ToMove.points;
            var sur = ToMove.surPoints;

            ToMove.Reverse(Mine);
            for(var i=0;i<ToMove.points.length;i++)
            {
                //console.log(ToMove.points[i]);
                Mine[ToMove.points[i].i_index][ToMove.points[i].j_index]=1;
            }   
            ToMove.Surround(ToMove.points,Mine,5);

            if(flag)
            {
                Ships.push(ToMove);
                //console.log("bubu");
                flag=false;
            }

            table.Draw("play1",Mine);
        }
    });
   


});


///functions

function GetSurroundingCells(x,y)
    {
        var result= []
        result.push({i:x+1,j:y});
        result.push({i:x-1,j:y});
        result.push({i:x,j:y+1});
        result.push({i:x,j:y-1});
        result.push({i:x-1,j:y+1});
        result.push({i:x-1,j:y-1});
        result.push({i:x+1,j:y+1});
        result.push({i:x+1,j:y-1});
        return result;
    }

function makeCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
    
    

///events 

var Ready=function()
{
    console.log(count);
    CanMove=false;
    if(count[1]>=4 && count[2]>=3 && count[3]>=2 && count[4]>=1)
    {
        socket.emit('ready',{matrix:Mine});
    }
}

var Click = function(me)
{
    //console.log(me);
     var map = $(me).parent().parent()[0].id;
     var x = $(me).parent()[0].className;
     var y = me.className[6];
     console.log(map,x,y);

     if(map=="play1")
     {
        for(var i=0;i<Ships.length;i++)
        {
            //console.log(Ships[i].points);
            var points = Ships[i].points; 

            for(var j=0;j<points.length;j++)
            {
                var point = Ships[i].points[j];
                if(x==point.i_index && y==point.j_index)
                {
                    ToMove=Ships[i];
                    Ships.splice(i,1);
                    flag=true;
                    //console.log(ToMove);
                    return;
                }
            }
        }
     }else
     {
         if(turn == false) return;
        socket.emit('attacking',{
            code,
            id,
            userName,
            i:x,
            j:y
        });
     }
}
var ChooseShips = function()
{
    
    var placeForShips = $('.ships');
    var word = "ship";
    placeForShips.html('');

    for(var i=1;i<=4;i++)
    {
        placeForShips.append(`<div class="${word}${i}" onclick="SelectShip(this)"></div>`);
        $("."+word+i).css({"width":"20%","height":"100%","background-color":"lightgreen","margin":"0px 0px 0px 40px"})
        $("."+word+i).append(`<p> quantity ${i} size ${4-i+1}</p>`)
    }

    
}
//var count =0;
var Ships=[];
var count=[0,0,0,0,0];
var SelectShip=function(me)
{
    if(!CanMove)
        {
            return;
        }
    var size = 4-me.className[4]+1;
    if(count[size]<size-(size-me.className[4]))
    {

        //console.log(size-(size-me.className[4]));
        count[size]++;
        var ship=new Ship(size);
        res=ship.AddToMap(Mine,1);
        ship.Surround(res,Mine,5);
        table.Draw('play1',Mine);
        Ships.push(ship);
        //count++;
       // count=0;
    }
    //console.log(count,count[size]);

}
////////Listening to sockets

socket.on("waitingForOppnent",(data)=>{
console.log(data);
id=data.id;
userName=data.userName;
});
socket.on('readyToStart',(data)=>{
    //console.log(data);
    code=data.code;
    index=data.index;
    console.log(data);
});
socket.on('turn',(data)=>
{
    turn=data.move;
    if(turn)
    {
        $(".result").html('');
        $(".result").append(`<p>Your Turn</p>`);
    }else
    {
        $(".result").html('');
    $(".result").append(`<p>Waiting For Opponent</p>`);
    }
});
socket.on('AttackCell',data=>
{
    var i = parseInt(data.i);
    var j=parseInt(data.j);
    if(Mine[data.i][data.j]==1)
    {
        var Response;
        var flag=true;
        var SPoints = GetSurroundingCells(i,j);
        SPoints.forEach((item,index)=>
        {
            if(item.i>=0 && item.j>=0)
            {
                //console.log(item,index);
                
                    Response = 3;
                   // Mine[i][j]=3;
                   // console.log("hi")
                    Ships.forEach((ship,count)=>
                    {
                        
                        for(var x=0;x<ship.points.length;x++)
                        {
                            if(i==ship.points[x].i_index && j==ship.points[x].j_index)
                            {
                                ship.Injure(i,j);
                                //console.log(ship);
                                if(ship.destroy)
                                {
                                    //console.log("ship destroy");
                                    Ships.splice(count,1);
                                    var DefPoints = ship.DeadPoints;
                                    flag=false;
                                    socket.emit("AttackRes",{result:4,points:DefPoints,
                                        code,
                                        id,
                                        userName,});
                                        DefPoints.forEach(item=>
                                            {
                                                Mine[item.i_index][item.j_index]=4;
                                            });
                                }
                            }

                        }
                    });
                
            }
           
        });
        if(flag)
        {
            socket.emit("AttackRes",
            {result:3,
                i,
                j,
                code,
                id,
                userName,});
                Mine[i][j]=3;
            }
          socket.emit("damaged",{id,code});  
    }else
    {
        socket.emit("AttackRes",
        {result:2,
            i,
            j,
            code,
            id,
            userName,});
            Mine[i][j]=2;
    }
    if(Ships.length==0)
    {
        socket.emit("Defeated",{
            code,
            id,
            userName
        });
    }
   // console.log(Response);    

   table.Draw("play1",Mine);

});
socket.on('Attack',data=>
{
    console.log(data);
    var res = parseInt(data.result);
    if(res==4)
    {
        for(var x=0;x<data.points.length;x++)
        {
            console.log()
            var i = parseInt(data.points[x].i_index);
            var j = parseInt(data.points[x].j_index);
            var result = parseInt(data.result)
            Opponents[i][j]=result;
        }
    }else
    {
        var i = parseInt(data.i);
        var j= parseInt(data.j);
        Opponents[i][j]=data.result

    }
    table.Draw('play2',Opponents);
});
socket.on("gameOver",(data)=>
{
    $(".result").html('');
    $(".result").append(`<p>${data.message}</p>`);
    turn=false;
});



