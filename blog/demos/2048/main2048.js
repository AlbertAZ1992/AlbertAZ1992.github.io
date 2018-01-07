/**
 * Created by 13794_000 on 2014/11/7.
 */
var board = new Array(); //格子数组
var score = 0;
var hasconflicted =new Array();

var startx=0;
var starty=0;
var endx=0;
var endy=0;
$(document).ready(function(){
    prepareForMobile();
    newgame();
});

function prepareForMobile(){

    if(documentWidth>500){
        gridContainerWidth=500;
        cellSideLength=100;
        cellSpace=20;
    }
    $('#grid-container').css('width',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);
    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}
function newgame(){
    //初始化棋盘
    init();
    //随机生成两个数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    //格子定位
    for ( var i=0;i<4;i++)
        for( var j=0;j<4;j++){
            var gridCell= $('#grid-cell-'+i+"-"+j);//代表小格子,由id获取
            gridCell.css('top',getPostTop(i,j));//计算top值
            gridCell.css('left',getPostLeft(i,j));//计算left值
        }

    for(var i=0;i<4;i++){
        board[i]= new Array();
        hasconflicted[i]= new Array();
        for(var j=0;j<4;j++)
        board[i][j] =0;
        hasconflicted[i][j] = false;
    }

    updateBoardView();//通知前端更新数字
    score=0;
}

//用户每次操作都要更新
function updateBoardView(){
    //如果有number-cell，清除
    $(".number-cell").remove();
    $(".number-cell span").remove();
    for ( var i=0;i<4;i++)
        for( var j=0;j<4;j++){
            //对每一个board元素，都要生成一个number-cell,jquery
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#number-cell-'+i+'-'+j);//建立一个变量，方便操作当前坐标下的numbercell
            var theNumberText = $('<span></span>').appendTo(theNumberCell);
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPostTop(i,j)+(cellSideLength/2));//计算top值
                theNumberCell.css('left',getPostLeft(i,j)+(cellSideLength/2));//计算left值

            }
            else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPostTop(i,j));//计算top值
                theNumberCell.css('left',getPostLeft(i,j));//计算left值
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//背景色和数字有关
                theNumberCell.css('color',getNumberColor(board[i][j]));//前景色和数字有关
                theNumberCell.css('box-shadow',getShadow(board[i][j]));
                theNumberText.text(getNumberText( board[i][j] ));//显示数字
                theNumberText.css('font-size',0.12*cellSideLength+'px' );
            }
            hasconflicted[i][j] = false;
        }
    // $('.number-cell').css('line-height',1.2);
    // $('.number-cell').css('font-size',0.12*cellSideLength+'px');
}



function generateOneNumber(){

    if(nospace(board))
        return false;//判断还有没有空间
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random()*4));//0-4之间随即浮点数，下取整并强制转换：0、1、2、3
    var randy = parseInt(Math.floor(Math.random()*4));
    while(true){
        if(board[randx][randy]== 0) break;//位置可用，跳出死循环
        //否则重新生成随机数，重新判断，直到跳出
         randx =parseInt(Math.floor(Math.random()*4));
         randy =parseInt(Math.floor(Math.random()*4));
        }

    //随机一个数字,50%是2,50%是4，生成0-1之间，跟0.5相比。
    var randNumber =Math.random()< 0.5 ? 2: 4;

    //随即位置显示随机数
    board[randx][randy]=randNumber;//更新变量
    showNumberWithAnimation(randx,randy,randNumber);//动画显示函数
    return true;
}


$(document).keydown(function(event){

    switch(event.keyCode ){
        case 37://向左
            event.preventDefault();
            if(moveLeft()){//返回false不会移动
                setTimeout("generateOneNumber()",220);
                setTimeout("isgameover()",300);
            }
            break;
        case 38://向上
            event.preventDefault();
            if(moveUp()){//返回false不会移动
                setTimeout("generateOneNumber()",220);
                setTimeout("isgameover()",300);
            }
            break;
        case 39://向右
            event.preventDefault();
            if(moveRight()){//返回false不会移动
                setTimeout("generateOneNumber()",220);
                setTimeout("isgameover()",300);
            }
            break;
        case 40://向下
            event.preventDefault();
            if(moveDown()){//返回false不会移动
                setTimeout("generateOneNumber()",220);
                setTimeout("isgameover()",300);
            }
            break;
        default :
            break;
    }
});

document.addEventListener('touchstart',function(event){
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
    event.preventDefault();

});

document.addEventListener('touchend',function(event){
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;

    var deltax =endx-startx;
    var deltay =endy-starty;

    if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth)
    return;
    //x
    if(Math.abs(deltax)>=Math.abs(deltay)){
        if(deltax>0){
            if(moveRight()){//返回false不会移动
                setTimeout("generateOneNumber()",220);
                setTimeout("isgameover()",300);
            }//move right
        }
        else{
            if(moveLeft()){//返回false不会移动
                setTimeout("generateOneNumber()",220);
                setTimeout("isgameover()",300);
            }  //move left
        }
    }
    //y
    else{
        if(deltay>0){
            if(moveDown()){//返回false不会移动
                setTimeout("generateOneNumber()",220);
                setTimeout("isgameover()",300);
            }//move down
        }
        else{
            if(moveUp()){//返回false不会移动
                setTimeout("generateOneNumber()",220);
                setTimeout("isgameover()",300);
            }//move up
        }
    }
});

function isgameover(){
    if(nospace(board)&& nomove(board)){
        gameover();
    }
}
function gameover(){
    alert("Game Over");
}

function moveLeft(){
    if( !canMoveLeft(board) )
    return false;
    //向左移
    //落脚点是的否为空
    //落脚位置数字和待定数字是否相等
    //路径上是否有障碍
    for( var i=0;i<4;i++)
        for( var j = 1;j <4; j++){
            if(board[i][j]!=0){
                for( var k=0; k<j;k++){
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board)&&!hasconflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore( score );
                        hasconflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);//wait for animation
return true;
}

function moveRight(){
    if( !canMoveRight(board) )
        return false;
    //向右移
    //落脚点是的否为空
    //落脚位置数字和待定数字是否相等
    //路径上是否有障碍
    for( var i=0;i<4;i++)
        for( var j = 2;j >=0; j--){
            if(board[i][j]!=0){
                for( var k=3; k>j;k--){
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board)&&!hasconflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][k];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore( score );
                        hasconflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);//wait for animation
    return true;
}
function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board )&&!hasconflicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] += board[k][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore( score );
                        hasconflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board )&&!hasconflicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] += board[k][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore( score );
                        hasconflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}
