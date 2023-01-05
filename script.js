let nickname = prompt("Hello! Enter your name to play:", "Guest")

let cards = []
let sum = 0;
let hasBlackJack = false;
let isAlive = false;

let message = "";

let messageEl = document.querySelector("#message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");
let playerEl = document.querySelector("#player-el");

let player = {
    name: nickname != null || nickname != "" ? nickname : "Guest",
    chips: 200,
}

function getRandomNumber() {
    let number = Math.floor(Math.random() * 13) + 1;
    if (number > 10) {
        return 10;
    } else if (number === 1) {
        return 11;
    }
    return number;
}

function startGame() {
    if (checkIfPlayerHasChips()) {
        let firstCard = getRandomNumber();
        let secondCard = getRandomNumber();
        sum = firstCard + secondCard;
        cards = [firstCard, secondCard]
        isAlive = true;
        hasBlackJack = false;
        renderGame();
    }
}

function renderGame() {
    sumEl.textContent = `Sum: ${sum}`
    cardsEl.textContent = "Cards: "

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += `${cards[i]} `
    }
    if (sum < 21) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        player.chips += 50;
    } else {
        message = "You're out of the game.";
        isAlive = false;
        player.chips -= 50;
    }
    playerEl.textContent = `${player.name}: $${player.chips}`
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackJack && checkIfPlayerHasChips()) {
        let card = getRandomNumber();
        cards.push(card);
        sum += card;

        renderGame();
    }
}

function checkIfPlayerHasChips() {
    if (player.chips < 50) {
        messageEl.textContent = "You have no money...";
        return false;
    }
    return true;
}