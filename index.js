// Blackjack
var _a;
var createDeck = function () {
    var deck = [];
    var suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS'];
    for (var n = 0; n < suits.length; n++) {
        for (var i = 1; i <= 13; i++) {
            deck.push({ suit: suits[n], value: i });
        }
    }
    return deck;
};
var shuffle = function (deck) {
    // går igenom kortleken
    for (var i = deck.length - 1; i > 0; i--) {
        // skapar ett slumpat indextal som jag sparar undan i variabeln j
        var j = Math.floor(Math.random() * (i + 1));
        // sparar undan kortet som ska blandas temporärt i en varibel temp
        var temp = deck[i];
        // ändrar kortet till det slumpade indexet i variabeln j
        deck[i] = deck[j];
        // tar det slumpade kortet i variabeln j och låter det få det bytta kortets plats.
        deck[j] = temp;
    }
    return deck;
};
var draw = function (deck) {
    // Här inne vill jag ta bort ett kort från arrayen och skicka tillbaka den.
    // då använder jag mig av metoden pop.
    if (deck.length === 0) {
        throw new Error('Deck is empty');
    }
    return deck.pop();
};
var score = function (card) {
    // ska ta emot en array med kortobjekt
    //  och räkna ut blackjack - poäng
    // ess = 11 men 1 om poängen är större än 21
    // klädda, J, Q, K = 10
    // resterande värde är deras value = 2-10
    var points = 0;
    var aces = 0;
    for (var i = 0; i < card.length; i++) {
        if (card[i].value === 1) {
            points += 11;
            aces++;
        }
        else if (card[i].value === 11 ||
            card[i].value === 12 ||
            card[i].value === 13) {
            points += 10;
        }
        else {
            points += card[i].value;
        }
    }
    while (points > 21 && aces > 0) {
        points -= 10;
        aces--;
    }
    return points;
};
var prettyCard = function (card) {
    if (typeof card === 'string') {
        return card;
    }
    var suit = '', value = '';
    switch (card.value) {
        case 1:
            value = 'A';
            break;
        case 2:
            value = '2';
            break;
        case 3:
            value = '3';
            break;
        case 4:
            value = '4';
            break;
        case 5:
            value = '5';
            break;
        case 6:
            value = '6';
            break;
        case 7:
            value = '7';
            break;
        case 8:
            value = '8';
            break;
        case 9:
            value = '9';
            break;
        case 10:
            value = '10';
            break;
        case 11:
            value = 'J';
            break;
        case 12:
            value = 'Q';
            break;
        case 13:
            value = 'K';
            break;
    }
    switch (card.suit) {
        case 'HEARTS':
            // suit = "\u2665"; Dessa koder var för tidigare uppgift utan kortbilder.
            suit = 'H';
            break;
        case 'SPADES':
            // suit = "\u2660";
            suit = 'S';
            break;
        case 'DIAMONDS':
            // suit = "\u2666";
            suit = 'D';
            break;
        case 'CLUBS':
            // suit = "\u2663";
            suit = 'C';
            break;
    }
    return value + '-' + suit;
};
var deck = createDeck();
var shuffledDeck = shuffle(deck);
var hitButton = document.querySelector('#hitButton');
var dealButton = document.querySelector('#dealButton');
var stayButton = document.querySelector('#stayButton');
var playAgainButton = document.querySelector('#playAgainButton');
var playerInputField = document.querySelector('#playerScore');
var dealerInputField = document.querySelector('#dealerScore');
var dealerOList = document.querySelector('#dealerOList');
var oList = document.querySelector('#oList');
var hand = [];
var dealerHand = [];
var handPoints = [];
var dealerHandPoints = [];
var result;
var dealerResult;
var listElement;
var imgElement;
var dealerListElement;
var dealerImgElement;
var endGame = false;
// För att lagra poängen när sidan laddas om.
var SCORE_KEY = 'gameScore';
var scoreField = document.querySelector('#points');
var earnedPoints = parseInt((_a = sessionStorage.getItem(SCORE_KEY)) !== null && _a !== void 0 ? _a : '0') || 0;
if (scoreField instanceof HTMLInputElement) {
    scoreField.value = earnedPoints.toString();
}
var deal = function () {
    if (endGame === true) {
        clearTable();
    }
    if (hand.length < 2) {
        for (var i = 0; i < 2; i++) {
            var card_1 = draw(shuffledDeck);
            hand.push(card_1);
            handPoints.push(card_1);
        }
        result = score(handPoints);
        if (playerInputField) {
            playerInputField.setAttribute('value', result.toString());
        }
        for (var i = 0; i < hand.length; i++) {
            hand[i] = prettyCard(hand[i]);
            listElement = document.createElement('li');
            imgElement = document.createElement('img');
            if (oList) {
                oList.appendChild(listElement);
            }
            listElement.appendChild(imgElement);
            imgElement.setAttribute('src', 'cards/' + hand[i] + '.png');
        }
        var card = draw(shuffledDeck);
        dealerHand.push(card);
        dealerHandPoints.push(card);
        dealerResult = score(dealerHandPoints);
        dealerHand[0] = prettyCard(dealerHand[0]);
        dealerListElement = document.createElement('li');
        dealerImgElement = document.createElement('img');
        if (dealerOList) {
            dealerOList.appendChild(dealerListElement);
        }
        dealerListElement.appendChild(dealerImgElement);
        dealerImgElement.setAttribute('src', 'cards/' + dealerHand[0] + '.png');
    }
    else {
        var card = draw(shuffledDeck);
        hand.push(card);
        handPoints.push(card);
        result = score(handPoints);
        if (playerInputField) {
            playerInputField.setAttribute('value', result.toString());
        }
        var i = hand.length - 1;
        hand[i] = prettyCard(hand[i]);
        listElement = document.createElement('li');
        if (oList) {
            oList.appendChild(listElement);
        }
        imgElement = document.createElement('img');
        listElement.appendChild(imgElement);
        imgElement.setAttribute('src', 'cards/' + hand[i] + '.png');
        listElement.classList.add('cards');
    }
};
// Döpte om Deal - button i spelet och slog ihop funktionen i deal.
if (dealButton) {
    dealButton.addEventListener('click', deal);
}
var stay = function () {
    if (endGame === false) {
        do {
            var card = draw(shuffledDeck);
            dealerHand.push(card);
            dealerHandPoints.push(card);
            dealerResult = score(dealerHandPoints);
            if (dealerInputField) {
                dealerInputField.setAttribute('value', dealerResult.toString());
            }
            var i = dealerHand.length - 1;
            dealerHand[i] = prettyCard(dealerHand[i]);
            dealerListElement = document.createElement('li');
            if (dealerOList) {
                dealerOList.appendChild(dealerListElement);
            }
            dealerImgElement = document.createElement('img');
            dealerListElement.appendChild(dealerImgElement);
            dealerImgElement.setAttribute('src', 'cards/' + dealerHand[i] + '.png');
        } while (dealerResult < 21 && dealerResult < result);
        if (result === 21 && hand.length === 2) {
            updatePoints(1);
        }
        else if (result <= 21 && dealerResult > 21) {
            updatePoints(1);
        }
        else if (result > 21) {
            updatePoints(-1);
        }
        else if (result === dealerResult) {
        }
        else if (dealerResult <= 21 && result < dealerResult) {
            updatePoints(-1);
        }
        else {
            updatePoints(1);
        }
    }
    if (earnedPoints === 2) {
        alert('You are the champion!');
    }
    endGame = true;
};
if (stayButton) {
    stayButton.addEventListener('click', stay);
}
var updatePoints = function (change) {
    earnedPoints += change;
    sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
    //points.value = earnedPoints; // Update the visible value directly
};
var clearTable = function () {
    sessionStorage.setItem(SCORE_KEY, earnedPoints.toString());
    location.reload();
    endGame = false;
};
