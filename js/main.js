var matrix = [],
    makeActive = [],
    height = 50,
    width = 50;


//creating table
$("#btnCreate").click(function () {

    for (var i = 0; i < height; i++){
        matrix[i] = [];
        matrixTr = $("<tr>").appendTo(".table-game");

        for (var j = 0; j < width; j++){
            matrix[i][j] = $("<td>").appendTo(matrixTr);
        }
    }

    $(".table-game").css("width", width*10).css("height", height*10);
    $("#btnStart").prop('disabled', false);
});

//making cell alive by clicking
$(".table-game").on("click", "td", function () {
   $(this).toggleClass("active");
});

//TODO: write some code here
$("#btnStart").click(function () {
    checkCell();
});

function checkCell(){
    makeActive=[];
    for(var i = 1; i < width-1; i++){
        for(var j = 1; j < height-1; j++){

            checkNeighborhood(i,j);
        }
    }

    for(var k = 0; i < makeActive.length; k++){
        changeCell(makeActive[k]);
    }
}

//check alive
function alive(cell){
    return cell.hasClass("active");
}

//change
function changeCell(cell){
    cell.toggleClass("active");
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