var matrix = [],
    height = 90,
    width = 120;


//creating table
$("#btnCreate").click(function () {
    mainArray = [];

    for (var i = 0; i < height; i++){
        matrix[i] = [];
        matrixTr = $("<tr>").appendTo(".table-game");

        for (var j = 0; j < width; j++){
            matrix[i][j] = $("<td>").appendTo(matrixTr);
        }
    }

    $("#btnStart").prop('disabled', false);
});

//making cell alive by clicking
$(".table-game").on("click", "td", function () {
   $(this).toggleClass("active");
});

//TODO: write some code here
$("#btnStart").click(function () {
    // if (matrix[1][1].hasClass("active")) {
    //     alert("IT WORKS!");
    // }
});