var matrix = [],
    makeActive = [],
    gameInterval;

var game = {
    width: Math.round(document.body.clientWidth / 20), 
    height: Math.round(document.body.clientHeight / 20),
    isStarted: false,
    generation: 0,
    speed: 8
};


$(document).ready(function () {
    matrix = [];
    $('.table-game').html('');

    for (var i = 0; i < game.height; i++) {
        matrix[i] = [];
        matrixTr = $('<tr>').appendTo('.table-game');

        for (var j = 0; j < game.width; j++) {
            matrix[i][j] = $('<td>').appendTo(matrixTr);
        }
    }

    $('.table-game').css({
        width: game.width * 15,
        height: game.height * 15
    });

    $('#clear').on('click', function(){
        $('.table-game tr td').removeClass('active');
        game.generation = 0;
        $('#generation').text(0);
    });
});

// draw
var isDown = false, isRight = false, isLeft = false;
$(document).mousedown(function(e) {
    isDown = true;  

    switch (e.which){
        case 1: 
            isLeft = true;
            isRight = false;
            break;
        case 3:
            isRight = true;
            isLeft = false;
            break;
    }
}).mouseup(function() {
    isDown = isRight = isLeft = false;    
});


//making cell alive by clicking
$('.table-game').on('mouseover', 'td', function () {
    if(isDown){
        if(isLeft)
            $(this).addClass('active');
        
        if(isRight)
            $(this).removeClass('active');
    }
}).on('click', 'td', function () {
    $(this).toggleClass('active');
}).on('contextmenu', function(){
    return false;
});

function initGame(){
    if(game.isStarted){
        clearInterval(gameInterval);
        game.isStarted = false;
        $('#play').text('Play');
        return;
    }

    gameInterval = setInterval(() => checkCell(), 1000 / game.speed);
    game.isStarted = true;
    $('#play').text('Pause');    
}

// start/pause on space
// $('html').keypress(function(e){
//     if (e.keyCode == 0 || e.keyCode == 38) {
//         initGame();
//     } 
// });

$('#play').on('click', function(){
    initGame();
});

function checkCell(){
    makeActive=[];
    for(var i = 0; i < game.height; i++){
        for(var j = 0; j < game.width; j++){
            checkNeighbors(i,j);
        }
    }

    for(var k = 0; k < makeActive.length; k++){
        changeCell(makeActive[k]);
    }

    game.generation++;
    $('#generation').text(game.generation);
}

//check alive
function alive(cell){
    return cell.hasClass('active');
}

//change
function changeCell(cell){
    cell.toggleClass('active');
}

function checkNeighbors(x,y){
    var counter = 0;
    var cell = matrix[x][y];

    for(var i = -1; i < 2; i++){
        for(var j = -1; j < 2; j++){
            var col = (x + i + game.height) % game.height;
            var row = (y + j + game.width) % game.width;

            if(alive(matrix[col][row])){
                counter++;
            }
        }
    }

    if(alive(cell))
        counter--;


    if (counter == 3 && !alive(cell)){
        makeActive.push(cell);
    }

    if ((counter < 2 || counter > 3) && alive(cell)){
        makeActive.push(cell);
    }
}