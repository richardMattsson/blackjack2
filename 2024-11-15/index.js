// Blackjack

let createDeck = function () {
  let deck = [];
  let suits = ["HEARTS", "SPADES", "DIAMONDS", "CLUBS"];

  for (let n = 0; n < suits.length; n++) {
    for (let i = 1; i <= 13; i++) {
      deck.push({ suit: suits[n], value: i });
    }
  }
  return deck;
};
let shuffle = function (deck) {
  // går igenom kortleken
  for (let i = deck.length - 1; i > 0; i--) {
    // skapar ett slumpat indextal som jag sparar undan i variabeln j
    let j = Math.floor(Math.random() * (i + 1));

    // sparar undan kortet som ska blandas temporärt i en varibel temp
    let temp = deck[i];

    // ändrar kortet till det slumpade indexet i variabeln j
    deck[i] = deck[j];
    // tar det slumpade kortet i variabeln j och låter det få det bytta kortets plats.
    deck[j] = temp;
  }

  return deck;
};
let draw = function (deck) {
  // Här inne vill jag ta bort ett kort från arrayen och skicka tillbaka den.
  // då använder jag mig av metoden pop.
  let removeACard = deck.pop();
  return removeACard;
};
let score = function (card) {
  // ska ta emot en array med kortobjekt
  //  och räkna ut blackjack - poäng
  // ess = 11 men 1 om poängen är större än 21
  // klädda, J, Q, K = 10
  // resterande är värde deras value = 2-10
  let points = 0;
  let aces = 0;

  for (let i = 0; i < card.length; i++) {
    if (card[i].value === 1) {
      points += 11;
      aces++;
    } else if (
      card[i].value === 11 ||
      card[i].value === 12 ||
      card[i].value === 13
    ) {
      points += 10;
    } else {
      points += card[i].value;
    }
  }
  while (points > 21 && aces > 0) {
    points -= 10;
    aces--;
  }
  return points;
};
let prettyCard = function (card) {
  let suit, value;
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
      // suit = "\u2665";
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
};

let deck = createDeck();
let shuffledDeck = shuffle(deck);
let card = draw(shuffledDeck);

const hitButton = document.querySelector("#hitButton");
const dealButton = document.querySelector("#dealButton");
const stayButton = document.querySelector("#stayButton");
const playAgainButton = document.querySelector("#playAgainButton");
const playerInputField = document.querySelector("#playerScore");
const dealerInputField = document.querySelector("#dealerScore");

let hand = [];
let dealerHand = [];
let handPoints = [];
let dealerHandPoints = [];
let result;
let dealerResult;

// ========= Funktion ====================

let dealerListElement;
let dealerImgElement;
const dealerOList = document.querySelector("#dealerOList");

let listElement;
let imgElement;
const oList = document.querySelector("#oList");

let endGame = false;

const SCORE_KEY = "gameScore";
const scoreField = document.querySelector("#points");

let earnedPoints = parseInt(sessionStorage.getItem(SCORE_KEY), 10) || 0;

scoreField.placeholder = earnedPoints;

if (earnedPoints === 2) {
  alert("You are the champion!");
}

function deal() {
  if (endGame === true) {
    clearTable();
  }

  if (hand.length < 2) {
    for (let i = 0; i < 2; i++) {
      card = draw(shuffledDeck);
      hand.push(card);
      handPoints.push(card);
    }
    result = score(handPoints);
    // playerInputField = document.querySelector("#playerScore");
    playerInputField.setAttribute("placeholder", result);

    for (let i = 0; i < hand.length; i++) {
      hand[i] = prettyCard(hand[i]);
      listElement = document.createElement("li");
      imgElement = document.createElement("img");
      oList.appendChild(listElement);
      listElement.appendChild(imgElement);
      imgElement.setAttribute("src", "cards/" + hand[i] + ".png");
      listElement.classList.add("cards");
    }

    card = draw(shuffledDeck);
    dealerHand.push(card);
    dealerHandPoints.push(card);

    dealerHand[0] = prettyCard(dealerHand[0]);
    dealerListElement = document.createElement("li");
    dealerImgElement = document.createElement("img");
    dealerOList.appendChild(dealerListElement);
    dealerListElement.appendChild(dealerImgElement);
    dealerImgElement.setAttribute("src", "cards/" + dealerHand[0] + ".png");
    dealerListElement.classList.add("cards");
  } else {
    card = draw(shuffledDeck);
    handPoints.push(card);
    hand.push(card);
    result = score(handPoints);

    // const playerInputField = document.querySelector("#playerScore");
    playerInputField.setAttribute("placeholder", result);

    let i = hand.length - 1;
    hand[i] = prettyCard(hand[i]);

    listElement = document.createElement("li");
    oList.appendChild(listElement);
    imgElement = document.createElement("img");
    listElement.appendChild(imgElement);
    imgElement.setAttribute("src", "cards/" + hand[i] + ".png");
    listElement.classList.add("cards");

    // if (result > 21) {
    //   stay();
    // }
  }
}
dealButton.addEventListener("click", deal);

// function hit() {
//   card = draw(shuffledDeck);
//   handPoints.push(card);
//   hand.push(card);
//   result = score(handPoints);
//   const playerInputField = document.querySelector("#playerScore");
//   playerInputField.setAttribute("placeholder", result);

//   let i = hand.length - 1;
//   hand[i] = prettyCard(hand[i]);

//   listElement = document.createElement("li");
//   oList.appendChild(listElement);
//   imgElement = document.createElement("img");
//   listElement.appendChild(imgElement);
//   imgElement.setAttribute("src", "cards/" + hand[i] + ".png");
//   listElement.classList.add("cards");

//   if (result > 21) {
//     stay();
//   }
// }

// hitButton.addEventListener("click", hit);

function stay() {
  if (endGame === false) {
    card = draw(shuffledDeck);
    dealerHand.push(card);
    dealerHandPoints.push(card);
    dealerResult = score(dealerHandPoints);

    dealerInputField.setAttribute("placeholder", dealerResult);

    let i = dealerHand.length - 1;
    dealerHand[i] = prettyCard(dealerHand[i]);

    dealerListElement = document.createElement("li");
    dealerOList.appendChild(dealerListElement);
    dealerImgElement = document.createElement("img");
    dealerListElement.appendChild(dealerImgElement);
    dealerImgElement.setAttribute("src", "cards/" + dealerHand[i] + ".png");
    dealerListElement.classList.add("cards");

    while (dealerResult < 21 && dealerResult < result) {
      card = draw(shuffledDeck);
      dealerHand.push(card);
      dealerHandPoints.push(card);
      dealerResult = score(dealerHandPoints);

      dealerInputField.setAttribute("placeholder", dealerResult);

      let i = dealerHand.length - 1;
      dealerHand[i] = prettyCard(dealerHand[i]);

      dealerListElement = document.createElement("li");
      dealerOList.appendChild(dealerListElement);
      dealerImgElement = document.createElement("img");
      dealerListElement.appendChild(dealerImgElement);
      dealerImgElement.setAttribute("src", "cards/" + dealerHand[i] + ".png");
      dealerListElement.classList.add("cards");
    }

    // if (result <= 21) {
    //   dealerInputField.setAttribute("placeholder", dealerResult);

    //   for (let i = 1; i < dealerHand.length; i++) {
    //     dealerHand[i] = prettyCard(dealerHand[i]);
    //     dealerListElement = document.createElement("li");
    //     dealerOList.appendChild(dealerListElement);
    //     dealerImgElement = document.createElement("img");
    //     dealerListElement.appendChild(dealerImgElement);
    //     dealerImgElement.setAttribute("src", "cards/" + dealerHand[i] + ".png");
    //     dealerListElement.classList.add("cards");
    //   }

    if (result === 21 && hand.length === 2) {
      endGame = true;
      earnedPoints++;
      sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
      // const points = document.querySelector("#points");
      // points.setAttribute("placeholder", earnedPoints);
      points.placeholder = earnedPoints;
      alert(`Du vann! Du fick Blackjack!
      Din score är ${result}.`);
    } else if (result <= 21 && dealerResult > 21) {
      endGame = true;
      earnedPoints++;
      sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
      // const points = document.querySelector("#points");
      // points.setAttribute("placeholder", earnedPoints);
      points.placeholder = earnedPoints;
      alert(`Du vann!
        Din score är ${result}.
        Dealer score är ${dealerResult}`);
    } else if (result > 21) {
      endGame = true;
      earnedPoints--;
      sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
      // const points = document.querySelector("#points");
      // points.setAttribute("placeholder", earnedPoints);
      points.placeholder = earnedPoints;
      alert(`Du förlorade.
          Din score är ${result}.`);
    } else if (result === dealerResult) {
      endGame = true;
      // sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
      alert(
        `Det blev lika. Din poäng är ${result}. Dealern har ${dealerResult}`
      );
    } else if (dealerResult <= 21 && result < dealerResult) {
      endGame = true;
      earnedPoints--;
      sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
      // const points = document.querySelector("#points");
      // points.setAttribute("placeholder", earnedPoints);
      points.placeholder = earnedPoints;
      alert(`Du förlorade.
            Din score är ${result}.
            Dealern vann.
            Dealer score är ${dealerResult}`);
    } else {
      endGame = true;
      alert("Annat utfall");
      // sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
    }
  }
  endGame = true;
}

stayButton.addEventListener("click", stay);

let div = document.querySelector(".item6");
let div2 = document.querySelector(".item2");
let ol = document.querySelector("#oList");
let li = document.querySelectorAll("li");
let dol = document.querySelector("#dealerOList");
let li1 = document.getElementsByClassName(".cards");

function clearTable() {
  // console.log(li2);
  sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
  location.reload();
  // endGame = false
  // if (endGame === true) {
  // console.log(li);
  // console.log(ol);
  // console.log(div);

  // ol.removeChild(li);
  // playerInputField.setAttribute("placeholder", 0);
  // dealerInputField.setAttribute("placeholder", 0);

  // div2.removeChild(li1);
  //   console.log(hand);
  // listElement = document.querySelector("ol");
  // listElement = document.querySelector("li");
  // imgElement = document.querySelector(".cards");
  // //   const allListElements2 = document.getElementById("dealerOList");
  // //   const playerInputField2 = document.querySelector("#playerScore");
  // //   const dealerInputField2 = document.querySelector("#dealerScore");
  // if (listElement) {
  //   listElement.remove();
  // } else {
  //   console.log("Inga element att ta bort");
  // }

  // if (imgElement) {
  //   imgElement.remove();
  // } else {
  //   console.log("Inga element att ta bort");
  // }

  // console.log(endGame);

  //   dealerInputField2.setAttribute("placeholder", 0);
  endGame = false;
}

// playAgainButton.addEventListener("click", clearTable);
