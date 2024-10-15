function CaseBreak(r, c) {   
    var caseClicked = document.getElementById(r + ";" + c);
    caseClicked.classList.replace("case-solid", "case-break"); 
    caseClicked.removeAttribute('onclick');
   
    console.log(r + ";" + c);
}

function Initialise(r, c) {
    
}