function CaseBreak(r,c) {    
    document.getElementById(r + ";" + c).classList.replace("case-solid", "case-break"); 
    document.getElementById(r + ";" + c).removeAttribute('onclick');
   
    console.log(r + ";" + c);
}   