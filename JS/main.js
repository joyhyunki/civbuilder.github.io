var myArray = ["Prehistoric", "Medieval", "Modern", "Nuclear", "Space"]
var agenum = 0
var agename = ""

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
