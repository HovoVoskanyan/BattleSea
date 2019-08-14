class Ship {
    constructor(size,matrix) {
      this.size = size;
      this.points = [];
      this.surPoints = [];
      this.DeadPoints=[];
      this.status=true;
      this.injury=false;
      this.destroy=false;
     // this.matrix=matrix;
    }
    Injure(i,j)
    {
        //console.log("cik");
        this.points.forEach((item,index)=>
            {
                if(item.i_index==i && item.j_index==j)
                {
                    //console.log(item,"injured");
                    this.DeadPoints.push(item);
                    this.points.splice(index,1);
                }
            });
            if(this.points.length==0)
            {
                //console.log(this.DeadPoints);
                this.destroy=true;
            }
           // console.log(this.DeadPoints);

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
    MoveLeft(matrix)
    {
        var up=-1;
        
            up = this.points[0];
            //console.log(down,matrix[down.i_index+1][down.j_index]==0 );
            if(up.j_index-1>=0)
            {
               // console.log("xentuk")
                if(up.j_index==1||(up.j_index>1 && matrix[up.i_index][up.j_index-2]!=1)   )
                {
                    //console.log("before");
                    
                    for (let i = 0; i < this.points.length; i++) {
                            matrix[this.points[i].i_index][this.points[i].j_index]=0;
                            this.points[i].j_index--;
                           // console.log("xexe");                    
                    }
                    for (let i = 0; i < this.surPoints.length; i++) {
                        matrix[this.surPoints[i].i][this.surPoints[i].j]=0;
                    // this.points[i].i_index++;                    
                    }

                    //console.log(this.points,"after");
                }
            }
    
    }
    MoveRight(matrix)
    {
        var up=-1;
        
            up = this.points[this.size-1];
            //console.log(down,matrix[down.i_index+1][down.j_index]==0 );
            if(up.j_index+1<10)
            {
               // console.log("xentuk")
                if(up.j_index==8||(up.j_index<9 && matrix[up.i_index][up.j_index+2]!=1)   )
                {
                    //console.log("before");
                    
                    for (let i = 0; i < this.points.length; i++) {
                            matrix[this.points[i].i_index][this.points[i].j_index]=0;
                            this.points[i].j_index++;
                            //console.log("xexe");                    
                    }
                    for (let i = 0; i < this.surPoints.length; i++) {
                        matrix[this.surPoints[i].i][this.surPoints[i].j]=0;
                    // this.points[i].i_index++;                    
                    }

                    //console.log(this.points,"after");
                }
            }
        
    }
    MoveUp(matrix)
    {
        var up=-1;
        
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
                            //console.log("xexe");                    
                    }
                    for (let i = 0; i < this.surPoints.length; i++) {
                        matrix[this.surPoints[i].i][this.surPoints[i].j]=0;
                    // this.points[i].i_index++;                    
                    }

                    //console.log(this.points,"after");
                }
            }
    
    }
    MoveDown(matrix)
    {
        var down=-1;
        
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
        
       // return this.points;
    }
    Reverse(matrix)
    {
        if(this.size>1)
            {
            
                var PointToRotate = this.points[1];
                var valid = true;
                if(this.status)
                {
                    //console.log(PointToRotate,"point1");
                    for(var i=-1;i<this.size+1;i++)
                    {
                      //  console.log(PointToRotate.j_index+i-1);
                        if(PointToRotate.j_index+i-1>10 || PointToRotate.j_index+i<0 || (matrix[PointToRotate.i_index][PointToRotate.j_index+i-1]==1 && i!=1) || (matrix[PointToRotate.i_index][PointToRotate.j_index+i+1]==1 && i!=-1))
                        {
                            valid=false;
                        }
                    }
                    //console.log(valid);
                    if(valid)
                    {
                        //console.log(this.points);
                        var k=-1
                        for(var i=0;i<this.points.length;i++)
                        {
                                matrix[this.points[i].i_index][this.points[i].j_index]=0;
                                this.points[i].i_index=PointToRotate.i_index;
                                this.points[i].j_index=PointToRotate.j_index+k;
                            k++;
                        }
                        for(var i=0;i<this.surPoints.length;i++)
                        {
                            matrix[this.surPoints[i].i][this.surPoints[i].j]=0;
                        }
                        console.log(this);
                        this.status=!this.status;
                    }
                }
            else
            {
                var PointToRotate = this.points[1];
                var valid = true;
           
                //console.log(PointToRotate,"point");
              
                //console.log(PointToRotate.i_index+i-1);
                if(PointToRotate.i_index>=1 && PointToRotate.i_index<=7)
                {
                  //  console.log("cik")
                        for(var i=-2;i<this.size;i++)
                        {
                            if(PointToRotate.i_index+i>=0 && PointToRotate.i_index+i<=9)
                            {
                                if(matrix[PointToRotate.i_index+i][PointToRotate.j_index]==1 && i!=0)
                                {
                                    valid=false
                                }
                            }else
                            {
                                var k=i;
                                PointToRotate.i_index+i==-1?k+=1:k-=1
                                if(matrix[PointToRotate.i_index+k][PointToRotate.j_index]==1 && i!=0)
                                {
                                    valid=false
                                }
                            }
                        }
                    }else
                    {
                        valid=false;
                    }
                    
                    
                //console.log(valid);
                if(valid)
                {
                  //  console.log(this.points);
                    var k=-1
                    for(var i=0;i<this.points.length;i++)
                    {
                            matrix[this.points[i].i_index][this.points[i].j_index]=0;
                            this.points[i].i_index=PointToRotate.i_index+k;
                            this.points[i].j_index=PointToRotate.j_index;
                        k++;
                    }
                    for(var i=0;i<this.surPoints.length;i++)
                    {
                        matrix[this.surPoints[i].i][this.surPoints[i].j]=0;
                    }
                    //console.log(this);
                    this.status=!this.status;
                }
            }
        }
    }
}