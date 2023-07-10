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
var evolution = [0, 0, 0];

// AminoAcid Variables
var aminoacidnum = document.getElementById("aminoacid");
var aminobutton = document.getElementById("aminobutton");
var amino = [0, 0, 100];


// Protein Variables
var proteinnum = document.getElementById("protein");
var proteinbutton = document.getElementById("proteinbutton");
var protein = [0, 0, 100];

// RNA Variables
var rnabutton = document.getElementById("rnabutton");
var rna = 0;
var rnacost = 30;
var rnaeffect = 50;

// DNA Variables
var dnabutton = document.getElementById("dnabutton");
var dna = 0;
var dnacost = 60;
var dnaeffect = 1;

// Mitochondria Variables
var mitochondriabutton = document.getElementById("mitochondriabutton");
var mitochondriacost = 50;

// Ribosome Variables
var ribosomebutton = document.getElementById("ribosomebutton");
var ribosomecost = 500;

// Ribosome Variables
var animalbutton = document.getElementById("animalkingdom");
var kingdomcost = [1000, 500];

// Ribosome Variables
var plantbutton = document.getElementById("plantkingdom");

// Ribosome Variables
var fungibutton = document.getElementById("fungikingdom");

// Eventlog Variables
var eventlog = document.getElementById("chat");

var buttonexplain = [`
Gather Amino Acids
The primary source for making the fundamental blocks of life.
------------------------------------------------------------
Amino Acid produced per second: ` + amino[1] + `
------------------------------------------------------------
The starting amino acid was... uh... Methionine? UAG?`, `
Create proteins with Amino Acids
Proteins are the primary resource for life.
Converts 3 aminoacids to 1 protein.
------------------------------------------------------------
Protein produced per second: ` + protein[1] + `
------------------------------------------------------------
Everybody's muscle food. Protein actually may consist of
hundreds of amino acids, but that will make the game terrible.`,`
Create RNAs with Amino Acids
Lot of proteins needs a plan to build. 
Spend ` + rnacost + ` amino acids. Adds +` + rnaeffect + ` amino acid storage. Adds + ` + rnaeffect / 5 + `
protein storage.
------------------------------------------------------------
RNAs: ` + rna + `
------------------------------------------------------------
UAA UAG sounds really weird actually`,`
Create DNAs with Amino Acids
DNA is the most delicate map of proteins built in history
Spend ` + dnacost + ` Amino Acids. Automatically generates ` + 
dnaeffect + ` amino acid per second.
------------------------------------------------------------
DNAs: ` + dna + `
------------------------------------------------------------
DNA will be the most magnificent thing you'll ever be making`,`
Boosts the effect of DNA
Mitochondria generates cell's energy for them, while the cells give
them a place to live.
Spend ` + mitochondriacost + ` Proteins.
------------------------------------------------------------
It is fascinating that mitochondria was actually once bacterium.`,`
Boosts the effect of RNA, and adds storage of protein + 500.
Ribosome creates the protein by reading the RNA. Necessary for life.
Spend ` + ribosomecost + ` Amino Acids.
------------------------------------------------------------
First Natural Born Translator`,`
Make your organism evolve towards animal kingdom.
Costs 1000 Amino Acids and 500 Proteins
Makes protein storage to 1000. 
------------------------------------------------------------
Why make energy by ourselves? We can steal it from others.`,`
Make your organism evolve towards plant kingdom.
Costs 1000 Amino Acids and 500 Proteins
Makes protein storage to 1000. 
------------------------------------------------------------
We may have killed animals at first by producing oxygen,
but the animals got used to it!`,`
Make your organism evolve towards fungi kingdom.
Costs 1000 Amino Acids and 500 Proteins
Makes protein storage to 1000. 
------------------------------------------------------------
Only thing we need is a living thing to decompose.`]

setInterval(function(){
    amino[0] += amino[1];
    if (amino[0] >= 3){
      for (var i = 0; amino[0] >= 3 && i <= protein[1] - 1; i++){
          protein[0] += 1;
          amino[0] -= 3;
      }
    }
    if (amino[0] >= amino[2]){
      amino[0] = amino[2];
    };
    if (protein[0] >= protein[2]){
      protein[0] = protein[2];
    };
    if (amino[0] <= 0){
      amino[0] = 0;
    }
    if (protein[0] <= 0){
      protein[0] = 0;
    }
    
    aminoacidnum.innerText = amino[0] + " / " + amino[2];
    proteinnum.innerText = protein[0] + " / " + protein[2];
    checkColor();
}, 1000);

// Arbitrary numbert generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

function checkColor(){
  if (amino[0] < rnacost){
      document.getElementById("rnabutton").style.backgroundColor = "gray";
  };
  if (amino[0] >= rnacost){
      document.getElementById("rnabutton").style.backgroundColor = "white";
  };
  if (amino[0] < dnacost){
      document.getElementById("dnabutton").style.backgroundColor = "gray";
  };
  if (amino[0] >= dnacost){
      document.getElementById("dnabutton").style.backgroundColor = "white";
  };
  if (protein[0] < mitochondriacost){
      document.getElementById("mitochondriabutton").style.backgroundColor = "gray";
  };
  if (protein[0] >= mitochondriacost){
      document.getElementById("mitochondriabutton").style.backgroundColor = "white";
  };
  if (amino[0] >= ribosomecost){
      document.getElementById("ribosomebutton").style.backgroundColor = "white";
  };
  if (amino[0] < ribosomecost){
      document.getElementById("ribosomebutton").style.backgroundColor = "gray";
  };
};

function chat(message){
  chatlog = chatlog + `
` + message;
}

// Warning Joke
console.log("Cheated Civilization will be destroyed soon.");

// Space Test Age
window.onkeydown = function (e) {
  if (event.keyCode == 122){
  }
  else{
    return false;
  };
};

// Amino button handling
aminobutton.onclick = function(){
    if(amino[0] < amino[2]){
      amino[0] += 1;
    }
    checkColor();
    aminoacidnum.innerText = amino[0] + " / " + amino[2];
    randomevent = getRandomInt(1, 1000);
    if (995 <= randomevent){
        if (randomevent <= 1000){
            randomevent = getRandomInt(1, 20);
            if((amino[0] + randomevent) >= amino[2]){
              amino[0] = amino[2]
            }
            else{ 
              amino[0] += randomevent;
            }
            chat(`An asteroid crashed on earth. You earn ` + randomevent + ` Amino Acids.`);
        };
    };
    if (990 <= randomevent){
        if (randomevent <= 994){
            randomevent = getRandomInt(1, 20);
            amino[0] += randomevent;
            chat(`A volcano erupted and produced you a priordimal soup. You earn ` + randomevent + ` Amino Acids.`);
        };
    };
    eventlog.innerText = chatlog;
};

// Resource info handling
aminobutton.onmouseover = function(){
    explainclick.innerText = buttonexplain[0];
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
    checkColor();
    aminoacidnum.innerText = amino[0] + " / " + amino[2]
    proteinnum.innerText = protein[0] + " / " + protein[2];
    if (protein[0] >= 5){
      document.getElementById("rnabutton").style.display = "inline";
      document.getElementById("dnabutton").style.display = "inline";
    }
}; 

// Resource info handling
proteinbutton.onmouseover = function(){
    explainclick.innerText = buttonexplain[1];
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
        protein[2] += rnaeffect / 5;
        rnacost = Math.round(rnacost * 1.2);
    }
    checkColor();
    aminoacidnum.innerText = amino[0] + " / " + amino[2]
    proteinnum.innerText = protein[0] + " / " + protein[2]
    buttonexplain[2] = `
Create RNAs with Amino Acids
Lot of proteins needs a plan to build. 
Spend ` + rnacost + ` amino acids. Adds +` + rnaeffect + ` amino acid storage. Adds + ` + rnaeffect / 5 + `
protein storage.
------------------------------------------------------------
RNAs: ` + rna + `
------------------------------------------------------------
UAA UAG sounds really weird actually`;
    explainclick.innerText = buttonexplain[2];
}; 

// Resource info handling
rnabutton.onmouseover = function(){
    explainclick.innerText = buttonexplain[2];
};

rnabutton.onmouseout = function(){
    explainclick.innerText = "";
};

// RNA button handling
dnabutton.onclick = function(){
    if (amino[0] >= dnacost){
        amino[0] -= dnacost;
        dna += 1;
        amino[1] += dnaeffect;
        dnacost = Math.round(dnacost * 1.2);
    }
    if (dna == 1){
      mitochondriabutton.style.display = "inline";
      ribosomebutton.style.display = "inline";
      checkColor();
    }
    checkColor();
    aminoacidnum.innerText = amino[0] + " / " + amino[2];
    buttonexplain[0] = `
Gather Amino Acids
The primary source for making the fundamental blocks of life.
------------------------------------------------------------
Amino Acid produced per second: ` + amino[1] + `
------------------------------------------------------------
The starting amino acid was... uh... Methionine? UAG?`;
    buttonexplain[3] = `
Create DNAs with Amino Acids
DNA is the most delicate map of proteins built in history
Spend ` + dnacost + ` Amino Acids. Automatically generates ` + 
dnaeffect + `amino acid per second.
------------------------------------------------------------
DNAs: ` + dna + `
------------------------------------------------------------
DNA will be the most magnificent thing you'll ever be making`;
    explainclick.innerText = buttonexplain[3];
}; 

// Resource info handling
dnabutton.onmouseover = function(){
    explainclick.innerText = buttonexplain[3];
};

dnabutton.onmouseout = function(){
    explainclick.innerText = "";
};


// Mitochondria button handling`
mitochondriabutton.onclick = function(){
    if (protein[0] >= mitochondriacost){
        protein[0] -= mitochondriacost;
        amino[1] *= 2;
        dnaeffect = 2;
        proteinnum.innerText = protein[0] + " / " + protein[2];
        document.getElementById("mitochondriabutton").style.display = "none";
    }
    buttonexplain[0] = `
Gather Amino Acids
The primary source for making the fundamental blocks of life.
------------------------------------------------------------
Amino Acid produced per second: ` + amino[1] + `
------------------------------------------------------------
The starting amino acid was... uh... Methionine? UAG?`;
    buttonexplain[3] = `
Create DNAs with Amino Acids
DNA is the most delicate map of proteins built in history
Spend ` + dnacost + ` Amino Acids. Automatically generates ` + 
dnaeffect + ` amino acid per second.
------------------------------------------------------------
DNAs: ` + dna + `
------------------------------------------------------------
DNA will be the most magnificent thing you'll ever be making`; 
}; 

// Resource info handling
mitochondriabutton.onmouseover = function(){
    explainclick.innerText = buttonexplain[4];
};

mitochondriabutton.onmouseout = function(){
    explainclick.innerText = "";
};

// Mitochondria button handling`
ribosomebutton.onclick = function(){
    if (amino[0] >= ribosomecost){
        amino[0] -= ribosomecost;
        amino[2] += (amino[2] - 100);
        protein[2] += 500;
        rnaeffect *= 2;
        aminoacidnum.innerText = amino[0] + " / " + amino[2];
        proteinnum.innerText = protein[0] + " / " + protein[2];
        document.getElementById("ribosomebutton").style.display = "none";
        document.getElementById("animalkingdom").style.display = "inline";
        document.getElementById("plantkingdom").style.display = "inline";
        document.getElementById("fungikingdom").style.display = "inline";
    }
}; 

// Resource info handling
ribosomebutton.onmouseover = function(){
    explainclick.innerText = ribosomeexplain;
};

ribosomebutton.onmouseout = function(){
    explainclick.innerText = "";
};

// Animal button handling`
animalbutton.onclick = function(){
    if (amino[0] >= kingdomcost[0]){
        if (protein[0] >= kingdomcost[1]){
            amino[0] -= kingdomcost[0];
            protein[2] = 1000;
            protein[0] -= kingdomcost[1];
            document.getElementById("animalkingdom").style.display = "none";
            document.getElementById("plantkingdom").style.display = "none";
            document.getElementById("fungikingdom").style.display = "none";
            evolution[0] = 0
            aminoacidnum.innerText = amino[0] + " / " + amino[2];
            proteinnum.innerText = protein[0] + " / " + protein[2];
            console.log(evolution[0]);
        }
    }
}; 

// Resource info handling
animalbutton.onmouseover = function(){
    explainclick.innerText = buttonexplain[6];
};

animalbutton.onmouseout = function(){
    explainclick.innerText = "";
};

// Plant button handling`
plantbutton.onclick = function(){
    if (amino[0] >= kingdomcost[0]){
        if (protein[0] >= kingdomcost[1]){
            amino[0] -= kingdomcost[0];
            protein[2] = 1000;
            protein[0] -= kingdomcost[1];
            document.getElementById("animalkingdom").style.display = "none";
            document.getElementById("plantkingdom").style.display = "none";
            document.getElementById("fungikingdom").style.display = "none";
            evolution[0] = 1
            aminoacidnum.innerText = amino[0] + " / " + amino[2];
            proteinnum.innerText = protein[0] + " / " + protein[2];
            console.log(evolution[0]);
        }
    }
}; 

// Resource info handling
plantbutton.onmouseover = function(){
    explainclick.innerText = buttonexplain[7];
};

plantbutton.onmouseout = function(){
    explainclick.innerText = "";
};

// Fungi button handling`
fungibutton.onclick = function(){
    if (amino[0] >= kingdomcost[0]){
        if (protein[0] >= kingdomcost[1]){
            amino[0] -= kingdomcost[0];
            protein[2] = 1000;
            protein[0] -= kingdomcost[1];
            document.getElementById("animalkingdom").style.display = "none";
            document.getElementById("plantkingdom").style.display = "none";
            document.getElementById("fungikingdom").style.display = "none";
            evolution[0] = 2
            aminoacidnum.innerText = amino[0] + " / " + amino[2];
            proteinnum.innerText = protein[0] + " / " + protein[2];
            console.log(evolution[0]);
        }
    }
}; 

// Resource info handling
fungibutton.onmouseover = function(){
    explainclick.innerText = buttonexplain[8];
};

fungibutton.onmouseout = function(){
    explainclick.innerText = "";
};
