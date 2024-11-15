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
      value = "T";
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
      suit = "\u2665";
      break;
    case "SPADES":
      suit = "\u2660";
      break;
    case "DIAMONDS":
      suit = "\u2666";
      break;
    case "CLUBS":
      suit = "\u2663";
      break;
  }
  return value + suit;
};

let deck = createDeck();
// console.log(deck);

let shuffledDeck = shuffle(deck);
// console.log(shuffledDeck);

let card;
card = draw(shuffledDeck);
card = prettyCard(card);

let hand = [];

for (let i = 0; i < 2; i++) {
  card = draw(shuffledDeck);
  hand.push(card);
}

let result = score(hand);

const proceed = confirm(
  ` Din score är ${result}.

    Vill du ta ett nytt kort?
    Eller vill du stanna?`
);

let continueQuestion;
if (proceed === true) {
  do {
    card = draw(shuffledDeck);
    hand.push(card);
    result = score(hand);

    continueQuestion = confirm(
      `Din score är ${result}.
    Vill du ha ett nytt kort
    eller stanna?`
    );
  } while (continueQuestion === true && result < 22);
}

let dealerHand = [];

for (let i = 0; i < 2; i++) {
  card = draw(shuffledDeck);
  dealerHand.push(card);
}
let dealerResult = score(dealerHand);

while (dealerResult < 17 && dealerResult < 21) {
  card = draw(shuffledDeck);
  dealerHand.push(card);
  dealerResult = score(dealerHand);
}

if (result === 21 && hand.length === 2) {
  alert(`Du vann! Du fick Blackjack!
    Din score är ${result}.`);
} else if (result > dealerResult && result <= 21) {
  alert(`Du vann!
    Din score är ${result}.
    Dealer score är ${dealerResult}`);
} else if (result > 21) {
  alert(`Du förlorade.
    Din score är ${result}.`);
} else if (result === dealerResult) {
  alert(`Det blev lika. Din poäng är ${result}. Dealern har ${dealerResult}`);
} else if (result < 21 && result < dealerResult && dealerResult <= 21) {
  alert(`Du förlorade.
    Din score är ${result}.
    Dealern vann.
    Dealer score är ${dealerResult}`);
} else if (result <= 21 && dealerResult > 21) {
  alert(`Du vann!
    Din score är ${result}.
    Dealer score är ${dealerResult}`);
}

const playerInputField = document.querySelector("#playerScore");
playerInputField.setAttribute("placeholder", result);

for (let i = 0; i < hand.length; i++) {
  hand[i] = prettyCard(hand[i]);
}

console.log(hand);

// const playerCard1 = document.createTextNode(hand[0]);
// const playerCard2 = document.createTextNode(hand[1]);
// console.log(hand[1]);

// console.log(hand[2]);

// const playerCard3 = document.createTextNode(hand[2]);
// console.log(playerCard3);

// const playerCardList1 = document.querySelector("#cardList1");
// const playerCardList2 = document.querySelector("#cardList2");

// const playerOList = document.querySelector("#oList");
// const playerList3 = document.createElement("li");
// playerOList.appendChild(playerList3);

// playerCardList1.appendChild(playerCard1);
// playerCardList2.appendChild(playerCard2);
// playerList3.appendChild(playerCard3);

// ============= Dealer cards ===============================

// dealerHand[0] = prettyCard(dealerHand[0]);
// dealerHand[1] = prettyCard(dealerHand[1]);

// const dealerCard1 = document.createTextNode(dealerHand[0]);
// const dealerCard2 = document.createTextNode(dealerHand[1]);

// const dealerCardList1 = document.querySelector("#cardList3");
// const dealerCardList2 = document.querySelector("#cardList4");

// dealerCardList1.appendChild(dealerCard1);
// dealerCardList2.appendChild(dealerCard2);

const dealerInputField = document.querySelector("#dealerScore");
dealerInputField.setAttribute("placeholder", dealerResult);
