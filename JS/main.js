var myArray = ["Prehistoric", "Medieval", "Modern", "Nuclear", "Space"]
var agenum = 0
var agename = ""
var aminoacidnum = document.getElementById("aminoacid");
var aminoacid = 0
var aminobutton = document.getElementById("aminobutton");
var explainclick = document.getElementById("explainclick");
var aminoexplain = `Gather Amino Acids
The primary source for making the fundamental blocks of life.`;
var eventlog = document.getElementById("chat");

console.log("Cheated Civilization will be destroyed soon.");
var age = document.getElementById("agetext");

window.onkeypress = function(event) {
    if (event.which == 32) {
        agenum += 1;
        if (agenum > 4) {
            agenum = 0;
        }
        agename = myArray[agenum];
        age.innerText = agename;
    }
}

aminobutton.onclick = function(){
    aminoacid += 1;
    aminoacidnum.innerText = aminoacid;
};

aminobutton.onmouseover = function(){
    explainclick.innerText = aminoexplain;
};

aminobutton.onmouseout = function(){
    explainclick.innerText = "";
};

eventlog.innerText = `HEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HElloHEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HElloHElloHEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HEllo
HElloHElloHElloHEllo`
