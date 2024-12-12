import { 
    resources, actions, ages, currentAge, hasAdvanced,
    setUserCiv, setHasAdvanced, setCurrentAge,
    updateResourceCount, setResourceVisibility, unlockAction
} from './gameData.js';

// Create tooltip element
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
tooltip.style.display = "none";
document.body.appendChild(tooltip);

// Tooltip functions
function showTooltip(event, content) {
    tooltip.innerHTML = content;
    tooltip.style.display = "block";
    tooltip.style.left = event.pageX + 10 + "px";
    tooltip.style.top = event.pageY + 10 + "px";
}

function hideTooltip() {
    tooltip.style.display = "none";
}

// UI Update functions
function updateResources() {
    const resourceBar = document.getElementById("resourcebar");
    resourceBar.innerHTML = "";

    for (const [key, resource] of Object.entries(resources)) {
        if (key === 'ribosome') continue;

        if (resource.visible && currentAge === resource.age) {
            const div = document.createElement("div");
            div.className = "resource";
            div.innerHTML = `
                <img src="${resource.icon}" alt="${resource.name}">
                <span>${resource.name}: ${resource.count} / ${resource.limit}</span>
            `;

            const tooltipContent = `
                <strong>${resource.name}</strong><br>
                Current: ${resource.count}<br>
                Limit: ${resource.limit}<br>
                Generation Rate: ${resource.rate}/s
                ${key === 'protein' ? `<br>Ribosome Production: +${resources.ribosome.count * resources.ribosome.productionRate}/s` : ''}
            `;

            div.onmouseover = (e) => showTooltip(e, tooltipContent);
            div.onmouseout = hideTooltip;
            div.onmousemove = (e) => {
                tooltip.style.left = e.pageX + 10 + "px";
                tooltip.style.top = e.pageY + 10 + "px";
            };

            resourceBar.appendChild(div);
        }
    }
}

function updateButtons() {
    const buttonsDiv = document.getElementById("buttons");
    buttonsDiv.innerHTML = "";

    for (const action of actions) {
        if (action.unlocked && checkActionUnlockByAge(action) && currentAge === action.age) {
            const button = document.createElement("button");
            button.textContent = action.name;

            if (action.id === 'createRibosome') {
                const countSpan = document.createElement('span');
                countSpan.className = 'building-count';
                countSpan.textContent = resources.ribosome.count;
                countSpan.style.position = 'absolute';
                countSpan.style.left = '5px';
                countSpan.style.top = '5px';
                countSpan.style.fontSize = '12px';
                button.style.position = 'relative';
                button.appendChild(countSpan);
            }

            button.onclick = () => performAction(action);
            button.disabled = !canPerformAction(action);

            addButtonTooltip(button, action);
            buttonsDiv.appendChild(button);

            for (const resource in action.produces) {
                setResourceVisibility(resource, true);
            }
        }
    }
}

function addButtonTooltip(button, action) {
    let tooltipContent = `<strong>${action.name}</strong><br>`;

    if (Object.keys(action.cost).length > 0) {
        tooltipContent += "Costs:<br>";
        for (const [resource, amount] of Object.entries(action.cost)) {
            tooltipContent += `- ${amount} ${resources[resource].name}<br>`;
        }
    }

    tooltipContent += "Produces:<br>";
    for (const [resource, amount] of Object.entries(action.produces)) {
        tooltipContent += `+ ${amount} ${resources[resource].name}<br>`;
    }

    if (action.id === 'createRibosome') {
        tooltipContent += `<br>Each Ribosome produces:<br>+ ${resources.ribosome.productionRate} Protein/s`;
    }

    button.onmouseover = (e) => showTooltip(e, tooltipContent);
    button.onmouseout = hideTooltip;
    button.onmousemove = (e) => {
        tooltip.style.left = e.pageX + 10 + "px";
        tooltip.style.top = e.pageY + 10 + "px";
    };
}

// Game Logic functions
function checkActionUnlockByAge(action) {
    for (const [resource, amount] of Object.entries(action.cost)) {
        if (resources[resource].age != currentAge) {
            return false;
        }
    }
    return true;
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
    // Subtract costs
    for (const [resource, amount] of Object.entries(action.cost)) {
        resources[resource].count -= amount;
    }
    
    // Add production
    for (const [resource, amount] of Object.entries(action.produces)) {
        updateResourceCount(resource, amount);
        setResourceVisibility(resource, true);
    }
    
    checkUnlocks();
    updateUI();
}

function checkUnlocks() {
    if (resources.protein.count >= 10 && !actions.find(a => a.id === "createRibosome").unlocked) {
        unlockAction("createRibosome");
        logEvent("Unlocked: Create Ribosome");
        setResourceVisibility('ribosome', true);
    }
    
    if (resources.ribosome.count >= 5 && !actions.find(a => a.id === "createDNA").unlocked) {
        unlockAction("createDNA");
        logEvent("Unlocked: Create DNA");
        setResourceVisibility('dna', true);
    }
    
    if (resources.dna.count >= 10 && currentAge === 0 && !hasAdvanced) {
        setHasAdvanced(true);
        setCurrentAge(currentAge + 1);
        document.getElementById("age").textContent = ages[currentAge];
        logEvent(`Advanced to ${ages[currentAge]} Age!`);

        const civ = prompt("Type your trees (animal / plants / fungi)");
        setUserCiv(civ);
        if (civ === "animal") {
            logEvent("animal");
        } else if (civ === "plants") {
            logEvent("plants");
        } else if (civ === "fungi") {
            logEvent("fungi");
        } else {
            logEvent("error");
        }
    }
}

function logEvent(message) {
    const chat = document.getElementById("chat");
    const p = document.createElement("p");
    p.textContent = message;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
}

function updateUI() {
    updateResources();
    updateButtons();
}

// Game Loop
function gameLoop() {
    const proteinProduction = resources.ribosome.count * resources.ribosome.productionRate;
    updateResourceCount('protein', proteinProduction);

    for (const resource of Object.values(resources)) {
        if (resource.limit && resource.rate) {
            updateResourceCount(resource.name.toLowerCase(), resource.rate);
        }
    }
    updateUI();
}

// Initialize game
function init() {
    setInterval(gameLoop, 1000);
    updateUI();
    logEvent("Welcome to CivBuilder! Start by collecting Amino Acids.");
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
