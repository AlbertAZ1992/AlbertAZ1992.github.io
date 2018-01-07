/**
 * Created by 13794_000 on 2014/11/7.
 */

documentWidth = window.screen.availWidth;
gridContainerWidth= 0.92*documentWidth;
cellSideLength =0.18*documentWidth;
cellSpace =0.04*documentWidth;
function getPostTop(i,j){
    return cellSpace +i*(cellSideLength+cellSpace);
}

function getPostLeft(i,j){
    return cellSpace +j*(cellSideLength+cellSpace);
}


function getNumberBackgroundColor(number){
    switch(number){
        case 2:return "#fff";break;
        case 4:return "#fff";break;
        case 8:return "#fff";break;
        case 16:return "#fff";break;
        case 32:return "#fff";break;
        case 64:return "#fff";break;
        case 128:return "#fff";break;
        case 256:return "#000";break;
        case 512:return "#000";break;
        case 1024:return "#fff";break;
        case 2048:return "#000";break;
        case 4096:return "#000";break;
        case 8192:return "#000";break;
        case 16384:return "#000";break;
        case 32768:return "#000";break;
        case 65536:return "#000";break;

    }

    return "black";
}

function getNumberColor(number){
    switch(number){

        case 2:return "#a3a3a3";break;
        case 4:return "#fb2237";break;
        case 8:return "#1587F3";break;
        case 16:return "#A7E44D";break;
        case 32:return "#F3A056";break;
        case 64:return "#74F1C6";break;
        case 128:return "#B10A1F";break;
        case 256:return "#fff";break;
        case 512:return "#F5C400";break;
        case 1024:return "#8e0152";break;
        case 2048:return "#FEF954";break;
        case 4096:return "#5E7EFA";break;
        case 8192:return "#FB6158";break;
        case 16384:return "#FC9FA5";break;
        case 32768:return "#FDDDDF";break;
        case 65536:return "#FEFBF1";break;
    }

    return "black";}
function getNumberText( number ){
    switch( number ){
        case 2:return "足球少年";break;
        case 4:return "一中队长";break;
        case 8:return "横扫魔都";break;
        case 16:return "全国大赛";break;
        case 32:return "置霸亚洲";break;
        case 64:return "世界杯我来了";break;
        case 128:return "战胜板鸭";break;
        case 256:return "踢翻我德";break;
        case 512:return "对阵巴西你想赢吗";break;
        case 1024:return "赢了你睁开眼";break;
        case 2048:return "最辉煌的时候";break;
        case 4096:return "就是现在呐";break;
        case 8192:return "我的足球梦";break;
        case 16384:return "梦";break;
        case 32768:return "没台词了";break;
        case 65536:return "。。。";break;
    }

    return "black";
}
function getShadow(number){
    switch(number){
        case 2:return "0 5px 0 #535353";break;
        case 4:return "0 5px 0 #C31F29";break;
        case 8:return "0 5px 0 #095299";break;
        case 16:return "0 5px 0 #6F9930";break;
        case 32:return "0 5px 0 #AD713B";break;
        case 64:return "0 5px 0 #58BD9A";break;
        case 128:return "0 5px 0 #FF2B32";break;
        case 256:return "0 5px 0 #666";break;
        case 512:return "0 5px 0 #C69E20";break;
        case 1024:return "0 5px 0 #F83593";break;
        case 2048:return "0 5px 0 #F9E130";break;
        case 4096:return "0 5px 0 #2545F4";break;
        case 8192:return "0 5px 0 #F5443F";break;
        case 16384:return "0 5px 0 #FB6158";break;
        case 32768:return "0 5px 0 #FC9FA5";break;
        case 65536:return "0 5px 0 #555555";break;

    }

    return "black";
}


function nospace(board) {
    for( var i=0;i<4;i++)
        for( var j = 0;j <4; j++)
        if(board[i][j]==0)
            return false;
    return true;
}

function nomove(board){
    if(canMoveUp(board)||
        canMoveDown(board)||
        canMoveLeft(board)||
        canMoveRight(board)
        )
        return false;
    return true;
}


//左边是否有数字
//左边数字是否和自己相等
function canMoveLeft(board){
    for( var i=0;i<4;i++)
        for( var j = 1;j <4; j++)
            if(board[i][j]!=0)
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                    return true;
    return false;

}



//右边是否有数字
//右边数字是否和自己相等
function canMoveRight(board){
    for( var i=0;i<4;i++)
        for( var j = 2;j >=0; j--)
            if(board[i][j]!=0)
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                    return true;
    return false;

}




function canMoveUp( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;

    return false;
}

function canMoveDown( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
}
function noBlockHorizontal(row,col1,col2,board){
    for(var i= col1+1;i<col2;i++)
        if(board[row][i]!=0)
            return false;
    return true
}
function noBlockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}

