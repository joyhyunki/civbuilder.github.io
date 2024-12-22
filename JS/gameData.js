// Game state variables
export let userciv;
export let hasAdvanced = false;
export let currentAge = 0;

// Game constants
export const ages = ["Prehistoric", "Ancient", "Medieval", "Industrial", "Modern", "Space"];

// Resource definitions
export const resources = {
    aminoAcid: { name: "Amino Acid", count: 0, limit: 100, rate: 0, icon: "Images/aminoacid.png", age: 0, visible: true },
    protein: { name: "Protein", count: 0, limit: 100, rate: 0, icon: "Images/protein.png", age: 0, visible: false },
    ribosome: { name: "Ribosome", count: 0, productionRate: 1, age: 0, visible: false },
    dna: { name: "DNA", count: 0, limit: 25, rate: 0, icon: "Images/dna.png", age: 0, visible: false },
    monad: {name: "Monad", count: 0, limit: 100, rate: 0, icon:"Images/monad.png", age: 1, visible: false },
};

// Action definitions
export const actions = [
    { id: "collectAmino", name: "Collect Amino Acid", cost: {}, produces: { aminoAcid: 1 }, unlocked: true, age: 0 },
    { id: "createProtein", name: "Create Protein", cost: { aminoAcid: 3 }, produces: { protein: 1 }, unlocked: true, age: 0 },
    { id: "createRibosome", name: "Create Ribosome", cost: { protein: 5 }, produces: { ribosome: 1 }, unlocked: false, age: 0, isBuilding: true },
    { id: "createDNA", name: "Create DNA", cost: { ribosome: 2 }, produces: { dna: 1 }, unlocked: false, age: 0 },
    { id: "createMonad", name: "Create Monad", cost: {}, produces: {monad: 1}, unlocked:false, age: 1}
];

// Setter functions for state management
export function setUserCiv(civ) {
    userciv = civ;
}

export function setHasAdvanced(value) {
    hasAdvanced = value;
}

export function setCurrentAge(age) {
    currentAge = age;
}

// Resource management functions
export function updateResourceCount(resourceKey, amount) {
    const resource = resources[resourceKey];
    if (resource.limit) {
        resource.count = Math.min(resource.count + amount, resource.limit);
    } else {
        resource.count += amount;
    }
}

export function setResourceVisibility(resourceKey, isVisible) {
    resources[resourceKey].visible = isVisible;
}

// Action management functions
export function unlockAction(actionId) {
    const action = actions.find(a => a.id === actionId);
    if (action) {
        action.unlocked = true;
    }
}

//testing part
export function unlockTech(resourceName) {
    const resources = resources.find(a=> a.id === resourceName)
    resources.resorces.visible = true
}

