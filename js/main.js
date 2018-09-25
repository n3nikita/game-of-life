// Add clear button
// Fix bug with arrays
// Fix bug with speed
// Add settings objects
// Add generation counter

var matrix = [],
    makeActive = [],
    width = Math.round(document.body.clientWidth / 20), 
    height = Math.round(document.body.clientHeight / 20),
    gameInterval, isStarted = false;


$(document).ready(function () {
    matrix = [];
    $('.table-game').html('');

    for (var i = 0; i < height; i++) {
        matrix[i] = [];
        matrixTr = $('<tr>').appendTo('.table-game');

        for (var j = 0; j < width; j++) {
            matrix[i][j] = $('<td>').appendTo(matrixTr);
        }
    }

    $('.table-game').css({
        width: width * 15,
        height: height * 15
    });
});


var isDown = false, isRight = false, isLeft = false;
$(document).mousedown(function(e) {
    isDown = true;  

    switch (e.which){
        case 1: 
            isLeft = true;
            isRight = false;
            break;
        case 3:
            console.log('right mouse down');
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

$('html').keypress(function(e){
    if (e.keyCode == 0 || e.keyCode == 32) {
        if(isStarted){
            clearInterval(gameInterval);
            isStarted = false;
            return;
        }

        gameInterval = setInterval(() => checkCell(), 1000 / 5);
        isStarted = true;
    } 
});

function checkCell(){
    makeActive=[];
    for(var i = 1; i < height - 1; i++){
        for(var j = 1; j < width - 1; j++){
            checkNeighborhood(i,j);
        }
    }

    for(var k = 0; k < makeActive.length; k++){
        changeCell(makeActive[k]);
    }
}

//check alive
function alive(cell){
    return cell.hasClass('active');
}

//change
function changeCell(cell){
    cell.toggleClass('active');
}

function checkNeighborhood(i,j){
    var counter = 0;
    var cell = matrix[i][j];

    //left
    if(alive(matrix[i][j-1])) {
        counter++;
    }

    //right
    if(alive(matrix[i][j+1])) {
        counter++;
    }

    //down
    if(alive(matrix[i-1][j])) {
        counter++;
    }

    //up
    if(alive(matrix[i+1][j])) {
        counter++;
    }

    //down_left
    if(alive(matrix[i+1][j-1])) {
        counter++;
    }

    //down_right
    if(alive(matrix[i+1][j+1])) {
        counter++;
    }

    //up_left
    if(alive(matrix[i-1][j-1])) {
        counter++;
    }

    //up_right
    if(alive(matrix[i-1][j+1])) {
        counter++;
    }

    if (counter == 3 && !alive(cell)){
        makeActive.push(cell);
    }

    if ((counter < 2 || counter > 3) && alive(cell)){
        makeActive.push(cell);
    }
}