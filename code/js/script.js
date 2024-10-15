var row, col, mines;

document.addEventListener("DOMContentLoaded", function() {

    row = document.getElementById("row").textContent.trim();
    col = document.getElementById("col").textContent.trim();
    mines = document.getElementById("mines").textContent.trim();
});

function CaseBreak(r, c) {   
    var caseClicked = document.getElementById(r + ";" + c);
    caseClicked.classList.replace("case-solid", "case-break"); 
    caseClicked.removeAttribute('onclick');
   
    console.log(r + ";" + c);
}

function Initialise(r, c) {
    for (var i = 0; i < mines; i++) {
        var mineRow = Math.floor(Math.random() * row);
        var mineCol = Math.floor(Math.random() * col);
        var mineId = mineRow + ";" + mineCol;
    }
}