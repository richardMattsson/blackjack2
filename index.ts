export {};
type Card = { suit: string; value: number };
const suits = ["HEARTS", "SPADES", "DIAMONDS", "CLUBS"];

function createDeck(): Card[] {
  let deck: Card[] = [];

  for (let n = 0; n < suits.length; n++) {
    for (let i = 1; i < 13; i++) {
      deck.push({ suit: suits[n], value: i });
    }
  }
  return deck;
}

function shuffle(deck: Card[]) {
  for (let i = deck.length - 1; i > 0; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));
    const tempSlot = deck[i];
    deck[i] = deck[randomNumber];
    deck[randomNumber] = tempSlot;
  }
  return deck;
}

function draw(deck: Card[]): Card {
  const card = deck.pop();

  if (!card) {
    throw new Error("No cards left in deck");
  }

  return card;
}

function score(cards: Card[]) {
  let points = 0;
  let aces = 0;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].value === 1) {
      points += 11;
      aces++;
    } else if (
      cards[i].value === 11 ||
      cards[i].value === 12 ||
      cards[i].value === 13
    ) {
      points += 10;
    } else {
      points += cards[i].value;
    }
  }

  while (points > 21 && aces > 0) {
    points -= 10;
    aces--;
  }
  return points;
}

function prettyCard(card: Card | string) {
  if (typeof card === "string") {
    return card;
  }
  let suit = "",
    value = "";
  switch (card.value) {
    case 1:
      value = "A";
      break;
    case 2:
      value = "2";
      break;
    case 3:
      value = "3";
      break;
    case 4:
      value = "4";
      break;
    case 5:
      value = "5";
      break;
    case 6:
      value = "6";
      break;
    case 7:
      value = "7";
      break;
    case 8:
      value = "8";
      break;
    case 9:
      value = "9";
      break;
    case 10:
      value = "10";
      break;
    case 11:
      value = "J";
      break;
    case 12:
      value = "Q";
      break;
    case 13:
      value = "K";
      break;
  }
  switch (card.suit) {
    case "HEARTS":
      // suit = "\u2665"; Dessa koder var för tidigare uppgift utan kortbilder.
      suit = "H";
      break;
    case "SPADES":
      // suit = "\u2660";
      suit = "S";
      break;
    case "DIAMONDS":
      // suit = "\u2666";
      suit = "D";
      break;
    case "CLUBS":
      // suit = "\u2663";
      suit = "C";
      break;
  }
  return value + "-" + suit;
}

const deck = createDeck();
const shuffledDeck = shuffle(deck);

const dealButton = document.querySelector("#dealButton");
const stayButton = document.querySelector("#stayButton");
const playerInputField = document.querySelector("#playerScore");
const dealerInputField = document.querySelector("#dealerScore");
const dealerOList = document.querySelector("#dealerOList");
const oList = document.querySelector("#oList");

let hand: (Card | string)[] = [];
let dealerHand: (Card | string)[] = [];
let handPoints: Card[] = [];
let dealerHandPoints: Card[] = [];
let result: number;
let dealerResult;
let listElement;
let imgElement;
let dealerListElement;
let dealerImgElement;
let startGame = false;
let endGame = false;

// För att lagra poängen när sidan laddas om.
const SCORE_KEY = "gameScore";
const scoreField = document.querySelector("#points");
let earnedPoints: number =
  parseInt(sessionStorage.getItem(SCORE_KEY) ?? "0") || 0;
if (scoreField instanceof HTMLInputElement) {
  scoreField.value = earnedPoints.toString();
}

function clearTable() {
  sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
  location.reload();
  endGame = false;
}

function deal() {
  if (endGame) {
    clearTable();
  }
  if (result >= 21) {
    stay();
    clearTable();
  }
  startGame = true;
  if (hand.length < 2) {
    for (let i = 0; i < 2; i++) {
      const card: Card = draw(shuffledDeck);
      hand.push(card);
      handPoints.push(card);
    }

    result = score(handPoints);
    playerInputField?.setAttribute("value", result.toString());

    for (let i = 0; i < hand.length; i++) {
      hand[i] = prettyCard(hand[i]);
      listElement = document.createElement("li");
      imgElement = document.createElement("img");
      oList?.appendChild(listElement);
      listElement.appendChild(imgElement);
      imgElement.setAttribute("src", "cards/" + hand[i] + ".png");
    }

    const card: Card = draw(shuffledDeck);
    dealerHand.push(card);
    dealerHandPoints.push(card);
    dealerResult = score(dealerHandPoints);

    dealerHand[0] = prettyCard(dealerHand[0]);
    dealerListElement = document.createElement("li");
    dealerImgElement = document.createElement("img");
    dealerOList?.appendChild(dealerListElement);
    dealerListElement.appendChild(dealerImgElement);
    dealerImgElement.setAttribute("src", "cards/" + dealerHand[0] + ".png");
  } else {
    const card = draw(shuffledDeck);
    hand.push(card);
    handPoints.push(card);
    result = score(handPoints);

    playerInputField?.setAttribute("value", result.toString());

    const lastIndex = hand.length - 1;
    hand[lastIndex] = prettyCard(hand[lastIndex]);
    listElement = document.createElement("li");
    oList?.appendChild(listElement);
    imgElement = document.createElement("img");
    listElement.appendChild(imgElement);
    imgElement.setAttribute("src", "cards/" + hand[lastIndex] + ".png");
    listElement.classList.add("cards");
  }
}

dealButton?.addEventListener("click", deal);

function stay() {
  if (startGame && !endGame) {
    do {
      const card = draw(shuffledDeck);
      dealerHand.push(card);
      dealerHandPoints.push(card);
      dealerResult = score(dealerHandPoints);
      dealerInputField?.setAttribute("value", dealerResult.toString());

      const lastIndex = dealerHand.length - 1;
      dealerHand[lastIndex] = prettyCard(dealerHand[lastIndex]);
      dealerListElement = document.createElement("li");
      dealerOList?.appendChild(dealerListElement);

      dealerImgElement = document.createElement("img");
      dealerListElement.appendChild(dealerImgElement);
      dealerImgElement.setAttribute(
        "src",
        "cards/" + dealerHand[lastIndex] + ".png",
      );
    } while (dealerResult < 21 && dealerResult < result);

    if (result === 21 && hand.length === 2) {
      updatePoints(1);
    } else if (result <= 21 && dealerResult > 21) {
      updatePoints(1);
    } else if (result > 21) {
      updatePoints(-1);
    } else if (result === dealerResult) {
    } else if (dealerResult <= 21 && result < dealerResult) {
      updatePoints(-1);
    } else {
      updatePoints(1);
    }
    startGame = false;
    endGame = true;
  }
  if (earnedPoints === 2) {
    alert("You are the champion!");
  }
}

stayButton?.addEventListener("click", stay);

function updatePoints(change: number) {
  earnedPoints += change;
  console.log(earnedPoints);
  if (scoreField instanceof HTMLInputElement) {
    scoreField.value = earnedPoints.toString();
  }
  sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
}
