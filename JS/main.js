// I love this new way of organizing, really

// types of resources
const resources = {
    aminoAcid: { name: "Amino Acid", count: 0, limit: 100, rate: 0, icon: "Images/aminoacid.png" },
    protein: { name: "Protein", count: 0, limit: 100, rate: 0, icon: "Images/protein.png" },
    rna: { name: "RNA", count: 0, limit: 50, rate: 0, icon: "Images/rna.png" },
    dna: { name: "DNA", count: 0, limit: 25, rate: 0, icon: "Images/dna.png" },
    alpha: {name: "Alpha", count: 0, limit: 100, rate: 0, icon: ""},
    beta: {name: "Beta", count: 0, limit: 100, rate: 0, icon: ""},
};

// types of actions
const actions = [
    { id: "collectAmino", name: "Collect Amino Acid", cost: {}, produces: { aminoAcid: 1 }, unlocked: true },
    { id: "createProtein", name: "Create Protein", cost: { aminoAcid: 3 }, produces: { protein: 1 }, unlocked: true },
    { id: "createRNA", name: "Create RNA", cost: { protein: 5 }, produces: { rna: 1 }, unlocked: false },
    { id: "createDNA", name: "Create DNA", cost: { rna: 2 }, produces: { dna: 1 }, unlocked: false },
    { id: "createAlpha", name: "Create Alpha", cost: {}, produces: {alpha: 1}, unlocked: true },
    { id: "createBeta", name: "Create Beta", cost: {}, produces: {beta: 1}, unlocked: true },
];

// ages
const ages = ["Prehistoric", "Ancient", "Medieval", "Industrial", "Modern", "Space"];
let currentAge = 0;

// update resources
function updateResources() {
    const resourceBar = document.getElementById("resourcebar");
    resourceBar.innerHTML = "";
    for (const [key, resource] of Object.entries(resources)) {
        const div = document.createElement("div");
        div.className = "resource";
        div.innerHTML = `
                    <img src="${resource.icon}" alt="${resource.name}">
                    <span>${resource.name}: ${resource.count} / ${resource.limit}</span>
                `;
        resourceBar.appendChild(div);
    }
}

// update buttons
function updateButtons() {
    const buttonsDiv = document.getElementById("buttons");
    buttonsDiv.innerHTML = "";
    for (const action of actions) {
        if (action.unlocked) {
            const button = document.createElement("button");
            button.textContent = action.name;
            button.onclick = () => performAction(action);
            button.disabled = !canPerformAction(action);
            buttonsDiv.appendChild(button);
        }
    }
}

function canPerformAction(action) {
    for (const [resource, amount] of Object.entries(action.cost)) {
        if (resources[resource].count < amount) {
            return false;
        }
    }
    return true;
}

function performAction(action) {
    for (const [resource, amount] of Object.entries(action.cost)) {
        resources[resource].count -= amount;
    }
    for (const [resource, amount] of Object.entries(action.produces)) {
        resources[resource].count = Math.min(resources[resource].count + amount, resources[resource].limit);
    }
    checkUnlocks();
    updateUI();
}

// check unlocked buttons
function checkUnlocks() {
    if (resources.protein.count >= 10 && !actions.find(a => a.id === "createRNA").unlocked) {
        actions.find(a => a.id === "createRNA").unlocked = true;
        logEvent("Unlocked: Create RNA");
    }
    if (resources.rna.count >= 5 && !actions.find(a => a.id === "createDNA").unlocked) {
        actions.find(a => a.id === "createDNA").unlocked = true;
        logEvent("Unlocked: Create DNA");
    }
    if (resources.dna.count >= 10 && currentAge === 0) {
        currentAge++;
        document.getElementById("age").textContent = ages[currentAge];
        logEvent(`Advanced to ${ages[currentAge]} Age!`);
    }
}

// log writing function
function logEvent(message) {
    const chat = document.getElementById("chat");
    const p = document.createElement("p");
    p.textContent = message;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
}

// NIIIIICCCCEEE
function updateUI() {
    updateResources();
    updateButtons();
}

if (currentAge === 1) {
    var userciv = prompt("Type your trees (animal / plants / fungi)");
    if (userciv === "animal") {
        console.log("animal")
    }
    if (userciv === "plants") {
        console.log("plants")
    }
    if (userciv === "fungi") {
        console.log("fungi")
    }
    else {
        console.log("error")
    }
}

function gameLoop() {
    for (const resource of Object.values(resources)) {
        resource.count = Math.min(resource.count + resource.rate, resource.limit);
    }
    updateUI();
}

// Perfect code
setInterval(gameLoop, 1000);
updateUI();
logEvent("Welcome to CivBuilder! Start by collecting Amino Acids.");
