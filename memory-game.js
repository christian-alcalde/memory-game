// create board
// click a card, then click another card
// if card is a match, leave them face up
// else, flip cards over and try again
// continue until all pairs are found

"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const colors = shuffle(COLORS);

let startButton = document.querySelector("#start");
startButton.addEventListener("click", function () {
  let startScreen = document.querySelector(".startScreen");
  startScreen.style.display = "none";
  let gameBoard = document.querySelector("#game");
  gameBoard.classList.toggle("on");

  let score = document.createElement("h2");
  score.innerHTML = `Score: ${scoreTotal}`;
  gameBoard.append(score);
});

createCards(colors);

let clickCounter = 0;
let scoreTotal = 0;
let allCards = document.querySelectorAll("div");
/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  console.log("createCards");
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement("div");
    card.dataset.color = color;
    card.dataset.status = "notFlipped";
    card.dataset.matched = "false";
    card.classList.add("notFlipped", color);
    gameBoard.append(card);
  }

  gameBoard.addEventListener("click", function (event) {
    if (event.target.tagName === "DIV") {
      handleCardClick(event);
      console.log("Clicks: ", clickCounter);
    }
    if (clickCounter === 2) {
      setTimeout(function () {
        checkIfMatch();
        clickCounter = 0;
      }, 1000);
    }
    if (checkWin()) {
      handleWin();
    }
  });
}

/** Flip a card face-up. */
function flipCard(card) {
  // ... you need to write this ...
  console.log("flipCard");
  if (card.dataset.status === "flipped") {
    clickCounter--;
    console.log("You can't choose a card that's already face up.");
  } else if (card.dataset.status === "notFlipped") {
    handleScore();
    card.dataset.status = "flipped";
    card.classList.toggle("notFlipped");
  }
}

/** Flip a card face-down. */
function unFlipCard(card) {
  // ... you need to write this ...
  console.log("unFlipCard", card);
  card.dataset.status = "notFlipped";
  card.classList.toggle("notFlipped");
}

/** Handle clicking on a card: this could be first-card or second-card. */
function handleCardClick(evt) {
  // ... you need to write this ...
  console.log("handleCardClick");

  clickCounter++;
  if (clickCounter <= 2) {
    flipCard(evt.target);
  }
}

function checkIfMatch() {
  console.log("checkIfMatch");
  let cardPair = [];

  // get the two flipped cards
  for (let card of allCards) {
    if (card.dataset.status === "flipped" && card.dataset.matched === "false") {
      cardPair.push(card);
    }
  }

  // compare the cards
  if (cardPair[0].dataset.color === cardPair[1].dataset.color) {
    cardPair[0].dataset.matched = "true";
    cardPair[1].dataset.matched = "true";
    console.log("Match!");
  } else {
    unFlipCard(cardPair[0]);
    unFlipCard(cardPair[1]);
    console.log("Not a match!");
  }
}

function checkWin() {
  console.log("checkWin");
  for (let card of allCards) {
    if (card.classList.contains("notFlipped")) {
      console.log("No winner yet");
      return false;
    }
  }
  console.log("Winner");
  return true;
}

function handleWin() {
  const gameBoard = document.getElementById("game");
  let winMessage = document.createElement("h2");
  winMessage.innerText = "WINNER WINNER CHICKEN DINNER";
  gameBoard.append(winMessage);
  let button = document.createElement("button");
  button.innerText = "New Game";
  gameBoard.append(button);
}

function handleScore() {
  scoreTotal++;
  let score = document.querySelector("h2");
  score.innerHTML = `Score: ${scoreTotal}`;
}

function newGame() {}
