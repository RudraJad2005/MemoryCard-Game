const emojis = ['🎮', '🎲', '🎯', '🎸', '🎨', '🎭', '🎪', '🎫'];
const gameContainer = document.getElementById('gameContainer');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('resetButton');

let cards = [];
let flippedCards = [];
let moves = 0;
let timer = 0;
let timerInterval;
let canFlip = true;

function initializeGame() {
    // Create pairs of cards
    const gameEmojis = [...emojis, ...emojis];
    gameEmojis.sort(() => Math.random() - 0.5);
    
    gameContainer.innerHTML = '';
    cards = [];
    flippedCards = [];
    moves = 0;
    timer = 0;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = timer;
    canFlip = true;

    // Create card elements
    gameEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener('click', handleCardClick);
        gameContainer.appendChild(card);
        cards.push(card);
    });

    // Start timer
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

function handleCardClick(e) {
    if (!canFlip || flippedCards.length === 2 || 
        e.target.classList.contains('matched') || 
        e.target === flippedCards[0]) return;

    const selectedCard = e.target;
    selectedCard.classList.add('flipped');
    selectedCard.textContent = selectedCard.dataset.emoji;
    flippedCards.push(selectedCard);

    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        movesDisplay.textContent = moves;
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.emoji === card2.dataset.emoji;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        canFlip = true;
        checkWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function checkWin() {
    const matchedCards = cards.filter(card => card.classList.contains('matched'));
    if (matchedCards.length === cards.length) {
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`You won in ${moves} moves and ${timer} seconds!`);
        }, 500);
    }
}

resetButton.addEventListener('click', initializeGame);

// Start the game
initializeGame();