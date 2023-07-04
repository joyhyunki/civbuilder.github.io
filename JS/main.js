// Age Variables
var myArray = ["Prehistoric", "Medieval", "Modern", "Nuclear", "Space"]
var agenum = 0
var agename = ""
var age = document.getElementById("agetext");
var chatlog = `
You are the God of the Universe, and you shall create a living life in this planet.`
var randomevent = 0;

// Explain Variables
var explainclick = document.getElementById("explainclick");

// AminoAcid Variables
var aminoacidnum = document.getElementById("aminoacid");
var aminobutton = document.getElementById("aminobutton");
var amino = [0, 0, 100];
var aminoexplain = `
Gather Amino Acids
The primary source for making the fundamental blocks of life.
------------------------------------------------------------
Amino Acid produced per second: ` + amino[1] + `
------------------------------------------------------------
The starting amino acid was... uh... Methionine? UAG?`;

// Protein Variables
var proteinnum = document.getElementById("protein");
var proteinbutton = document.getElementById("proteinbutton");
var protein = [0, 0, 100];
var proteinexplain = `
Create proteins with Amino Acids
Proteins are the primary resource for life.
Converts 3 aminoacids to 1 protein.
------------------------------------------------------------
Protein produced per second: ` + protein[1] + `
------------------------------------------------------------
Everybody's muscle food. Protein actually may consist of
hundreds of amino acids, but that will make the game terrible.`;

// RNA Variables
var rnabutton = document.getElementById("rnabutton");
var rna = 0;
var rnacost = 30;
var rnaeffect = 50;
var rnaexplain = `
Create RNAs with Amino Acids
Lot of proteins needs a plan to build. 
Spend ` + rnacost + ` amino acids. Adds +50 amino acid storage.
------------------------------------------------------------
RNAs: ` + rna + `
------------------------------------------------------------
UAA UAG sounds really weird actually`;

// Eventlog Variables
var eventlog = document.getElementById("chat");

// Arbitrary numbert generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

// Warning Joke
console.log("Cheated Civilization will be destroyed soon.");

// Space Test Age
window.onkeydown = function (e) {
  return false;
};

// Amino button handling
aminobutton.onclick = function(){
    if(amino[0] < amino[2]){
      amino[0] += 1;
    }
    aminoacidnum.innerText = amino[0] + " / " + amino[2];
    randomevent = getRandomInt(1, 1000);
    if (995 <= randomevent){
        if (randomevent <= 1000){
            randomevent = getRandomInt(1, 20);
            amino[0] += randomevent;
            chatlog = chatlog + `
An asteroid hit earth. You earn ` + randomevent + ` Amino Acids.`;
        };
    };
    if (990 <= randomevent){
        if (randomevent <= 994){
            randomevent = getRandomInt(1, 20);
            amino[0] += randomevent;
            chatlog = chatlog + `
A volcano erupted and produced you a priordimal soup. You earn ` + randomevent + ` Amino Acids.`;
        };
    };
    eventlog.innerText = chatlog;
};

// Resource info handling
aminobutton.onmouseover = function(){
    explainclick.innerText = aminoexplain;
};

aminobutton.onmouseout = function(){
    explainclick.innerText = "";
};

// Protein button handling
proteinbutton.onclick = function(){
    if (amino[0] >= 3){
        if (protein[0] < protein[2]){
          protein[0] += 1;
          amino[0] -= 3;
        }
    }
    aminoacidnum.innerText = amino[0] + " / " + amino[2]
    proteinnum.innerText = protein[0] + " / " + protein[2];
    if (protein[0] >= 20){
      document.getElementById("rnabutton").style.display = "inline";
    }
}; 

// Resource info handling
proteinbutton.onmouseover = function(){
    explainclick.innerText = proteinexplain;
};

proteinbutton.onmouseout = function(){
    explainclick.innerText = "";
};

// RNA button handling
rnabutton.onclick = function(){
    if (amino[0] >= rnacost){
        amino[0] -= rnacost;
        rna += 1
        amino[2] += rnaeffect;
        rnacost = Math.round(rnacost * 1.2);
    }
    aminoacidnum.innerText = amino[0] + " / " + amino[2]
    proteinnum.innerText = protein[0] + " / " + protein[2];
    rnaexplain = `
Create RNAs with Amino Acids
Lot of proteins needs a plan to build. 
Spend ` + rnacost + ` amino acids. Adds +50 amino acid storage.
------------------------------------------------------------
RNAs: ` + rna + `
------------------------------------------------------------
UAA UAG sounds really weird actually`;
    explainclick.innerText = rnaexplain;
}; 

// Resource info handling
rnabutton.onmouseover = function(){
    explainclick.innerText = rnaexplain;
};

rnabutton.onmouseout = function(){
    explainclick.innerText = "";
};


//Event log testing
eventlog.innerText = chatlog;
