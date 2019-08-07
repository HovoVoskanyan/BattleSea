
var Mine=[];
var Opponents=[];
var ToMove=undefined;
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
                  struct+=`<td class="${Where}${i}${j}" onclick="Click(this)">${matrix[i][j]}</td>\n`;
                    

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
                      $(`.${Where}${i}${j}`).css({"background-color":"lightgreen"});
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
    
    
    
$( document ).ready(function() {
    console.log( "ready!" );
    table.CreateTable("#main1",'play1');
    table.Draw('play1',Mine);
    $('#main1').prepend('<h1>Mine</h1>');

    table.CreateTable("#main2",'play2');
    table.Draw('play2',Opponents);
    $('#main2').prepend('<h1>Opponents</h1>');

    $(document).keyup(function(event)
    {
        console.log(event.keyCode);


        if(event.keyCode==38)
        {
            console.log("Up")
            var points = ToMove.points;
            var sur = ToMove.surPoints;

            ToMove.MoveUp(Mine);
            for(var i=0;i<ToMove.points.length;i++)
            {
                console.log(ToMove.points[i]);
                Mine[ToMove.points[i].i_index][ToMove.points[i].j_index]=1;
            }   
            ToMove.Surround(ToMove.points,Mine,5);

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
                console.log(ToMove.points[i]);
                Mine[ToMove.points[i].i_index][ToMove.points[i].j_index]=1;
            }   
            ToMove.Surround(ToMove.points,Mine,5);

            table.Draw("play1",Mine);
           
        }
    });
   


});


///functions


    
    

///events 
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
            console.log(Ships[i].points);
            var points = Ships[i].points; 

            for(var j=0;j<points.length;j++)
            {
                var point = Ships[i].points[j];
                if(x==point.i_index && y==point.j_index)
                {
                    ToMove=Ships[i];
                    Ships.splice(i,1);
                    console.log(ToMove);
                    return;
                }
            }
        }
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
    var size = 4-me.className[4]+1;
    if(count[size]<size-(size-me.className[4]))
    {

        console.log(size-(size-me.className[4]));
        count[size]++;
        var ship=new Ship(size);
        res=ship.AddToMap(Mine,1);
        ship.Surround(res,Mine,5);
        table.Draw('play1',Mine);
        Ships.push(ship);
        //count++;
       // count=0;
    }
    console.log(count,count[size]);

}