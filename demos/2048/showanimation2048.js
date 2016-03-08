/**
 * Created by 13794_000 on 2014/11/7.
 */
function showNumberWithAnimation(x,y,randNumber){
    var numberCell = $('#number-cell-'+x+'-'+y);
    var numberText = numberCell.children('span');
    // $('<span></span>').appendTo(numberCell);
    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberText.text( getNumberText( randNumber ) );
    numberText.css('font-size',0.12*cellSideLength+'px');
    numberCell.css('box-shadow',getShadow(randNumber));
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPostTop(x,y),
        left:getPostLeft(x,y)
    },50)
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({

        top:getPostTop(tox,toy),
        left:getPostLeft(tox,toy)
    },200);
}

function updateScore( score ){
    $('#score').text( score );
}
