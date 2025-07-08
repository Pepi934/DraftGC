// Éléments du DOM
const setupPhase = document.getElementById('setup-phase');
const draftPhase = document.getElementById('draft-phase');
const captainsInput = document.getElementById('captains-input');
const confirmCaptainsBtn = document.getElementById('confirm-captains');
const errorMessage = document.getElementById('error-message');
const turnIndicator = document.getElementById('turn-indicator');
const draftBoard = document.getElementById('draft-board');
const playerPool = document.getElementById('player-pool');
const confirmationModal = document.getElementById('confirmation-modal');
const selectedPlayerPreview = document.getElementById('selected-player-preview');
const confirmDraftBtn = document.getElementById('confirm-draft');
const cancelDraftBtn = document.getElementById('cancel-draft');
const roleFilters = document.getElementById('role-filters');
const costFilters = document.getElementById('cost-filters');
const examinePlayerBtn = document.getElementById('examine-player');
const examineModal = document.getElementById('examine-modal');
const examineContent = document.getElementById('examine-content');

// --- MODIFIÉ: Structure de données des joueurs ---
let players = []; // Array d'objets: { name, note, cost, roles, isDrafted }

// Données brutes des joueurs (nom, note et rôles)
const playerData = [
    { name: "Mehdi", note: 90, roles: ["jungle", "adc"] }, 
    { name: "Anakine", note: 90, roles: ["mid"] }, 
    { name: "Bricorne", note: 90, roles: ["top"] },
    { name: "Baji", note: 90, roles: ["adc", "jungle",  "support"] },
    { name: "Slaynn", note: 88, roles: ["adc"] }, 
    { name: "Antho", note: 88, roles: ["jungle", "mid"] },
    { name: "Anas", note: 87, roles: ["adc", "jungle"] }, 
    { name: "Kreex", note: 87, roles: ["support", "jungle"] },
    { name: "Shawn", note: 85, roles: ["mid", "top"] }, 
    { name: "Wshlanimal", note: 85, roles: ["support"] }, 
    { name: "Yassine", note: 85, roles: ["jungle", "top"] },
    { name: "Sampl", note: 84, roles: ["mid"] }, 
    { name: "Axmo", note: 85, roles: ["adc"] }, 
    { name: "Dioxy", note: 85, roles: ["support"] },
    { name: "LokiDkey", note: 82, roles: ["mid", "adc"] }, 
    { name: "Scum", note: 84, roles: ["jungle", "support"] }, 
    { name: "Vsski", note: 84, roles: ["adc"] },
    { name: "Leutrim", note: 84, roles: ["adc"] },
    { name: "Edison", note: 84, roles: ["jungle", "top"] }, 
    { name: "Phyes", note: 84, roles: ["adc", "mid"] }, 
    { name: "TecNine", note: 83, roles: ["jungle", "adc"] },
    { name: "Aurum", note: 83, roles: ["adc", "support"] },  
    { name: "Fifi", note: 83, roles: ["top"] },
    { name: "Allonge", note: 83, roles: ["adc", "mid"] }, 
    { name: "Noham", note: 83, roles: ["mid", "adc"] }, 
    { name: "Karchakrok", note: 83, roles: ["adc"] },
    { name: "Empo", note: 83, roles: ["support", "mid"] }, 
    { name: "Pepi", note: 81, roles: ["mid", "top"] }, 
    { name: "Sir Phlegme", note: 83, roles: ["adc", "support"] },
    { name: "Arch", note: 82, roles: ["support", "top"] },
    { name: "Migro", note: 82, roles: ["support"] }, 
    { name: "Zouzou", note: 82, roles: ["top"] }, 
    { name: "Rayan", note: 82, roles: ["mid"] },
    { name: "Grimou", note: 82, roles: ["support", "jungle"] },
    { name: "Yann", note: 81, roles: ["support"] }, 
    { name: "Matisse", note: 81, roles: ["adc"] }, 
    { name: "Toba", note: 79, roles: ["support"] }, 
    { name: "Buster", note: 81, roles: ["jungle"] },
    { name: "HMD", note: 81, roles: ["support", "top"] }, 
    { name: "Chekinho", note: 80, roles: ["jungle", "support"] }, 
    { name: "Louistiti", note: 80, roles: ["top"] },
    { name: "Lulu", note: 78, roles: ["support"] }, 
    { name: "ProbablyMe", note: 80, roles: ["top"] }, 
    { name: "Gabriel", note: 80, roles: ["adc", "mid"] },
    { name: "Panda", note: 80, roles: ["adc", "jungle"] }, 
    { name: "Valtox", note: 79, roles: ["jungle"] }, 
    { name: "Gyn", note: 80, roles: ["mid", "top"] },
    { name: "Rez", note: 79, roles: ["mid"] }, 
    { name: "Derveus", note: 79, roles: ["support"] }, 
    { name: "Takia", note: 79, roles: ["support", "adc"] },
    { name: "iMuuhb", note: 88, roles: ["support"] }, 
    { name: "YiJoon", note: 78, roles: ["jungle"] }, 
    { name: "M1cka", note: 78, roles: ["adc"] },
    { name: "Sinbad", note: 77, roles: ["jungle", "support"] }, 
    { name: "Sogekran", note: 78, roles: ["top", "support"] },
    { name: "Ayvar", note: 77, roles: ["jungle"] },  
    { name: "Nana", note: 77, roles: ["support"] },
    { name: "Rikudo", note: 77, roles: ["mid", "top"] }, 
    { name: "Pomme", note: 76, roles: ["top"] }, 
    { name: "Moons", note: 76, roles: ["mid", "adc"] },
    { name: "Sarah", note: 75, roles: ["mid", "support"] },
    { name: "Carolus", note: 75, roles: ["jungle", "support"] },
    { name: "Laki", note: 75, roles: ["jungle"] }, 
];

const costLookup = {
    75: 150, 76: 161, 77: 173, 78: 185, 79: 198,
    80: 211, 81: 230, 82: 250, 83: 258, 84: 266,
    85: 272, 86: 278, 87: 284, 88: 290, 89: 295,
    90: 300
};


// État de la draft
let captains = [];
let draftOrder = [];
let teamTokens = [];
let currentPick = 0;
let selectedPlayerElement = null;
const NUM_TEAMS = 8; // MODIFIÉ
const PICKS_PER_TEAM = 4; // MODIFIÉ: 4 picks + 1 capitaine
const STARTING_TOKENS = 1000;
let activeRoleFilter = 'all'; 
let activeCostFilter = 'all'; 

// Événement pour démarrer la draft
confirmCaptainsBtn.addEventListener('click', initializeDraft);

function initializeDraft() {
    errorMessage.textContent = '';
    // On génère les données des joueurs en premier pour pouvoir valider les noms
    generatePlayerData();
    
    const names = captainsInput.value.trim();
    
    if (!names) {
        errorMessage.textContent = "Veuillez rentrer le nom des différents capitaines.";
        return;
    }

    captains = names.split(',').map(name => name.trim()).filter(name => name);
    
    if (captains.length !== NUM_TEAMS) {
        errorMessage.textContent = `Veuillez entrer exactement ${NUM_TEAMS} noms de capitaines.`;
        return;
    }

    // Validation pour vérifier si tous les capitaines sont des joueurs existants
    const allCaptainsArePlayers = captains.every(captainName => 
        players.some(player => player.name.toLowerCase() === captainName.toLowerCase())
    );

    if (!allCaptainsArePlayers) {
        errorMessage.textContent = "Veuillez rentrer des capitaines participant à la compétition.";
        return;
    }

    teamTokens = Array(NUM_TEAMS).fill(STARTING_TOKENS);
    
    setupPhase.classList.add('hidden');
    draftPhase.classList.remove('hidden');

    generateSnakeDraftOrder();
    createDraftBoard();
    
    preDraftCaptains();
    
    applyFilters();
    setupRoleFilters();
    setupCostFilters();
    updateTurnIndicator();
}

function generatePlayerData() {
    players = playerData
        .map(player => {
            const cost = costLookup[player.note] || 0;
            return {
                ...player,
                cost: cost,
                isDrafted: false
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
}

function preDraftCaptains() {
    captains.forEach((captainName, index) => {
        const player = players.find(p => p.name.toLowerCase() === captainName.toLowerCase());

        if (player) {
            player.isDrafted = true;
            
            const teamColumn = draftBoard.querySelector(`.team-column[data-captain-index='${index}']`);
            const emptySlot = teamColumn.querySelector('.player-slot:empty');

            if(emptySlot) {
                const playerId = players.indexOf(player);
                const draftedPlayerWrapper = createPlayerElement(player, playerId);
                draftedPlayerWrapper.classList.remove('is-drafted');
                emptySlot.appendChild(draftedPlayerWrapper);
            }
        }
    });
}


function generateSnakeDraftOrder() {
    draftOrder = [];
    for (let i = 0; i < PICKS_PER_TEAM; i++) {
        const round = Array.from({ length: NUM_TEAMS }, (_, j) => j);
        if (i % 2 !== 0) {
            round.reverse();
        }
        draftOrder.push(...round);
    }
}

function createDraftBoard() {
    draftBoard.innerHTML = '';
    captains.forEach((name, index) => {
        const column = document.createElement('div');
        column.className = 'team-column flex flex-col items-center gap-2';
        column.dataset.captainIndex = index;

        const tokenDisplay = document.createElement('div');
        tokenDisplay.className = 'team-tokens';
        tokenDisplay.innerHTML = `<span>${teamTokens[index]}</span> <span class="token-label">JETONS</span>`;
        column.appendChild(tokenDisplay);

        const header = document.createElement('h3');
        header.textContent = name;
        column.appendChild(header);

        for (let i = 0; i < PICKS_PER_TEAM + 1; i++) { // +1 pour le capitaine
            const slot = document.createElement('div');
            slot.className = 'player-slot flex items-center justify-center';
            column.appendChild(slot);
        }
        draftBoard.appendChild(column);
    });
}

function createPlayerElement(player, index) {
    const playerWrapper = document.createElement('div');
    playerWrapper.className = 'player-wrapper flex flex-col items-center gap-2';
    playerWrapper.dataset.playerId = index;
    playerWrapper.dataset.playerName = player.name;

    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';

    const playerImg = document.createElement('img');
    playerImg.src = `img/cartes/${player.name}.png`;
    playerImg.alt = player.name;
    
    playerImg.onerror = function() { 
        this.onerror = null;
        this.src = 'img/cartes/inconnu.png'; 
    };

    playerCard.appendChild(playerImg);
    
    const playerNameElement = document.createElement('p');
    playerNameElement.className = 'player-name';
    playerNameElement.innerHTML = `${player.name} <span class="player-cost">(${player.cost} 🪙)</span>`;

    playerWrapper.appendChild(playerCard);
    playerWrapper.appendChild(playerNameElement);

    return playerWrapper;
}


function createPlayerPool(playersToDisplay) {
    playerPool.innerHTML = '';
    const availablePlayers = playersToDisplay.filter(player => !player.isDrafted);

    availablePlayers.forEach(player => {
        const originalIndex = players.findIndex(p => p.name === player.name);
        const playerWrapper = createPlayerElement(player, originalIndex);
        playerWrapper.addEventListener('click', handlePlayerSelection);
        playerPool.appendChild(playerWrapper);
    });
}

function applyFilters() {
    let filteredPlayers = players;

    if (activeRoleFilter !== 'all') {
        filteredPlayers = filteredPlayers.filter(p => p.roles.includes(activeRoleFilter));
    }

    if (activeCostFilter !== 'all') {
        const [min, max] = activeCostFilter.split('-').map(Number);
        filteredPlayers = filteredPlayers.filter(p => p.cost >= min && p.cost <= max);
    }

    createPlayerPool(filteredPlayers);
}

function setupRoleFilters() {
    roleFilters.addEventListener('click', (event) => {
        const target = event.target.closest('[data-role]');
        if (!target) return;

        roleFilters.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        target.classList.add('active');

        activeRoleFilter = target.dataset.role;
        applyFilters();
    });
}

function setupCostFilters() {
    costFilters.addEventListener('click', (event) => {
        const target = event.target.closest('[data-cost]');
        if (!target) return;

        costFilters.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        target.classList.add('active');

        activeCostFilter = target.dataset.cost;
        applyFilters();
    });
}

function updateTurnIndicator() {
    if (currentPick >= draftOrder.length) {
        turnIndicator.innerHTML = `🎉 <span class="title-text">La Draft est terminée !</span> 🎉`;
        turnIndicator.style.borderColor = 'var(--secondary-glow)';
        turnIndicator.style.boxShadow = '0 0 20px var(--secondary-glow)';
        return;
    }

    const captainIndex = draftOrder[currentPick];
    const captainName = captains[captainIndex];
    const round = Math.floor(currentPick / NUM_TEAMS) + 1;
    const pickInRound = (currentPick % NUM_TEAMS) + 1;

    turnIndicator.innerHTML = `
        <span class="text-gray-400 text-sm">Tour ${round} - Choix ${pickInRound}</span><br>
        Au tour de <span class="font-semibold" style="color: var(--primary-glow);">${captainName}</span> de choisir.
    `;
}

function handlePlayerSelection(event) {
    if (currentPick >= draftOrder.length || event.currentTarget.classList.contains('is-drafted')) return;

    const playerId = event.currentTarget.dataset.playerId;
    const player = players[playerId];
    const captainIndex = draftOrder[currentPick];

    if (teamTokens[captainIndex] < player.cost) {
        event.currentTarget.classList.add('unaffordable');
        setTimeout(() => event.currentTarget.classList.remove('unaffordable'), 500);
        return;
    }

    selectedPlayerElement = event.currentTarget;
    
    selectedPlayerPreview.innerHTML = '';
    const clonedPlayer = selectedPlayerElement.cloneNode(true);
    clonedPlayer.className = 'player-wrapper flex flex-col items-center gap-2';
    selectedPlayerPreview.appendChild(clonedPlayer);
    confirmationModal.classList.remove('hidden');
}

function handleConfirmDraft() {
    if (!selectedPlayerElement) return;

    const playerId = selectedPlayerElement.dataset.playerId;
    const player = players[playerId];
    const captainIndex = draftOrder[currentPick];

    teamTokens[captainIndex] -= player.cost;
    player.isDrafted = true;

    const teamColumn = draftBoard.querySelector(`.team-column[data-captain-index='${captainIndex}']`);
    const tokenDisplay = teamColumn.querySelector('.team-tokens span:first-child');
    tokenDisplay.textContent = teamTokens[captainIndex];

    const emptySlot = teamColumn.querySelector('.player-slot:empty');

    if (emptySlot) {
        const originalWrapper = selectedPlayerElement;
        originalWrapper.removeEventListener('click', handlePlayerSelection);
        originalWrapper.classList.add('is-drafted');
        originalWrapper.style.display = 'none';
        
        const draftedPlayerWrapper = originalWrapper.cloneNode(true);
        draftedPlayerWrapper.classList.remove('is-drafted');
        draftedPlayerWrapper.style.display = 'flex';
        
        const nameInModal = draftedPlayerWrapper.querySelector('.player-name');
        nameInModal.innerHTML = `${player.name} <span class="player-cost">(${player.cost} 🪙)</span>`;
        
        emptySlot.appendChild(draftedPlayerWrapper);

        currentPick++;
        updateTurnIndicator();
    }

    closeModal();
}

function handleCancelDraft() {
    closeModal();
}

function closeModal() {
    confirmationModal.classList.add('hidden');
    selectedPlayerElement = null;
    selectedPlayerPreview.innerHTML = '';
}

// Gérer l'examen de la carte
function handleExaminePlayer() {
    if (!selectedPlayerElement) return;

    const imgSrc = selectedPlayerElement.querySelector('img').src;
    examineContent.innerHTML = `<img src="${imgSrc}" alt="Carte du joueur en grand">`;
    examineModal.classList.add('is-visible');
}

// Attacher les événements
confirmDraftBtn.addEventListener('click', handleConfirmDraft);
cancelDraftBtn.addEventListener('click', handleCancelDraft);
examinePlayerBtn.addEventListener('click', handleExaminePlayer);
examineModal.addEventListener('click', () => {
    examineModal.classList.remove('is-visible');
});
confirmationModal.querySelector('.modal-backdrop').addEventListener('click', handleCancelDraft);