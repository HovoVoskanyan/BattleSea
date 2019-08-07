class Ship {
    constructor(size,matrix) {
      this.size = size;
      this.points = [];
      this.surPoints = [];
      this.status='vertical';
     // this.matrix=matrix;
    }
    GetSurroundingCells(x,y)
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
    AddToMap(matrix,index)
    {
        for(var i=0;i<matrix.length;i++)
        {
            for(var j=0;j<matrix[i].length;j++)
            {
                var flag =0;
                for(var k=0;k<this.size;k++)
                {
                    if((i+this.size)>matrix.length)
                    {
                        flag=-1;
                        continue;
                    }
                    if(matrix[i+k][j]!=0)
                    {
                        flag=-1;
                        continue;
                    }
                }

                if(flag == 0)
                {
                    var result=[];
                    for(var y=0;y<this.size;y++)
                    {
                        result.push({i_index:i+y,j_index:j});
                    }
                    // result.push({i_index:i+1,j_index:j});
                    // result.push({i_index:i+2,j_index:j});
                    // result.push({i_index:i+3,j_index:j});
                    for(var i=0;i<result.length;i++)
                    {
                        matrix[result[i].i_index][result[i].j_index]=index;
                    }
                    this.points=result;
                    return result;
                }
            }
        }
    }
    Surround(points,matrix,index)
    {
        var toSurround=[];
        for(var i=0;i<points.length;i++)
        {
            var cells = this.GetSurroundingCells(points[i].i_index,points[i].j_index);
            for (var j = 0; j< cells.length; j++) 
            {
               // console.log(cells[j],points[i]);
                if(cells[j].i>=0 && cells[j].j>=0 && cells[j].i<=9 && cells[j].j<=9 )
                {
                    toSurround.push(cells[j]);
                    //console.log(cells[j],"added");
                }
            }
        }
        //console.log(toSurround);
        var Surrounded=[]
        for(var i=0;i<toSurround.length;i++)
        {
            if(matrix[toSurround[i].i][toSurround[i].j]==0)
            {
                matrix[toSurround[i].i][toSurround[i].j]=index;
                Surrounded.push({i:toSurround[i].i,j:toSurround[i].j})
            }
        }
        this.surPoints=Surrounded;
        return Surrounded;
    }
    AddToMatrix(matrix)
    {
        for(var i=0;i<this.points;i++)
        {
            matrix[this.points[i].i_index][this.points[i].j_index]=1;
        }
    }
    MoveLeft()
    {

    }
    MoveRight()
    {

    }
    MoveUp(matrix)
    {
        var up=-1;
        if(this.status=="vertical")
        {
            up = this.points[0];
            //console.log(down,matrix[down.i_index+1][down.j_index]==0 );
            if(up.i_index+1>0)
            {
                if(up.i_index==1||(up.i_index>0 && matrix[up.i_index-2][up.j_index]!=1)   )
                {
                    //console.log("before");
                    
                    for (let i = 0; i < this.points.length; i++) {
                            matrix[this.points[i].i_index][this.points[i].j_index]=0;
                            this.points[i].i_index--;
                            console.log("xexe");                    
                    }
                    for (let i = 0; i < this.surPoints.length; i++) {
                        matrix[this.surPoints[i].i][this.surPoints[i].j]=0;
                    // this.points[i].i_index++;                    
                    }

                    //console.log(this.points,"after");
                }
            }
    }
    }
    MoveDown(matrix)
    {
        var down=-1;
        if(this.status=="vertical")
        {
            down = this.points[this.size-1];
            //console.log(down,matrix[down.i_index+1][down.j_index]==0 );
            if(down.i_index+1<10)
            {
                if(down.i_index==8||(down.i_index<9 && matrix[down.i_index+2][down.j_index]!=1)   )
                {
                    //console.log("before");
                    
                    for (let i = 0; i < this.points.length; i++) {
                            matrix[this.points[i].i_index][this.points[i].j_index]=0;
                            this.points[i].i_index++;                    
                    }
                    for (let i = 0; i < this.surPoints.length; i++) {
                        matrix[this.surPoints[i].i][this.surPoints[i].j]=0;
                    // this.points[i].i_index++;                    
                    }

                    //console.log(this.points,"after");
                }
            }
    }
       // return this.points;
    }
  }