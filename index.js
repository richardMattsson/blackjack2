// Blackjack

// Uppgift 2.
// let card = function(value, suit){

//   let chosenCARD = {suit: 'HEARTS', value: 1}

//   chosenCARD.suit = suit
//   chosenCARD.value = value

// return chosenCARD
// }
// console.log(card(1,'HEARTS'));
// console.log(card(2,'SPADES'));

// ------------------------Uppgift 3--------------------------------------

// Objektivet i denna uppgift är att lägga till värden till en array
// så att den representerar samtliga hjärterkort i en kortlek.

// 1. [x] Utgå från en variabel/konstant hearts och en tom array
//        (till exempel via let hearts = []).

// Array:en ska innehålla 13 objekt. Samtliga objekt ska ha en
// suit-nyckel med det associerade värdet 'HEARTS'.
// Varje objekt ska också ha en value-nyckel med ett associerat nummer.
// Nummervärdet ska vara 1 för det första objektet,
// 2 för det andra objektet, och så vidare, upp till 13.
// Det ska alltså finnas ett objekt för varje hjärterkort i en kortlek.

// Innehållet i hearts ska vara strukturerat så här
// (men ska skapas via en loop):

// hearts[0] ska producera { suit: 'HEARTS', value: 1 },
// hearts[1] ska producera { suit: 'HEARTS', value: 2 }, och så vidare.

// Använd en loop och push-instruktionen.

// Man kan lägga in objekt i en array genom att ha måsvingar innanför push-instruktionens parenteser, till exempel så här: hearts.push({ ... }) (byt ut de tre punkterna mot de önskade nyckel/värde-paren).


// let hearts = []
// for(let i = 1; hearts.length < 13; i++){
// hearts.push({suit: 'HEARTS', value: i})
// }
// console.log(hearts[3])

// ------------------------Uppgift 4-------------------------------------

// Instruktioner

// Skapa en funktion, prettyCard, som tar emot ett objekt av samma typ
// som returnerades i den föregående uppgiften (till exempel { suit: 'HEARTS', value: 1 }),
// och returner ett värde på formen 'A♥',
// det vill säga en sträng med ett värdetecken följt av ett “suit”-tecken.

// Använd “Black Suit”-Unicode-tecknen
// (till exempel från https://en.wikipedia.org/wiki/Playing_cards_in_Unicode)
// för “suit”-tecknet.

// Låt vidare “A” representera value-värdet 1, “T” representera 10, “J” representera 11,
// “Q” representera 12, och “K” representera 13. Value-värdena 2-9 representeras av
// de motsvarande strängarna “2”, “3”, och så vidare.

// Tips: prettyCard-funktionen skulle kunna innehålla två string-variabler,
// som den returnerar sammanslagningen av, samt två switch-satser som producerar
// de två strängarna utifrån value- och suit-värdena i objektparametern.

// let heart = '\u2665'
// let spades = '\u2660'
// let diamonds = '\u2666'
// let clubs = '\u2663'


// const prettyCard = function (card) {

//   let suit, value

//   switch(card.value) {
//     case 1:
//     value = 'A'
//     break
//     case 2:
//     value = 2
//     break
//     case 3:
//     value = 3
//     break
//     case 4:
//     value = 4
//     break
//     case 5:
//     value = 5
//     break
//     case 6:
//     value = 6
//     break
//     case 7:
//     value = 7
//     break
//     case 8:
//     value = 8
//     break
//     case 9:
//     value = 9
//     break
//     case 10:
//     value = 'T'
//     break
//     case 11:
//     value = 'J'
//     break
//     case 12:
//     value = 'Q'
//     break
//     case 13:
//     value = 'K'
//     break
//   }

//   switch(card.suit) {
//     case 'HEARTS':
//     suit = heart
//     break
//     case 'SPADES':
//     suit = spades
//     break
//     case 'DIAMONDS':
//     suit = diamonds
//     break
//     case 'CLUBS':
//     suit = clubs
//     break
//   }

//   return value + suit
// }

// console.log(prettyCard({ suit: 'HEARTS', value: 1 }), 'A♥')
// console.log(prettyCard({ suit: 'SPADES', value: 2 }), '2♠')
// console.log(prettyCard({ suit: 'DIAMONDS', value: 10 }), 'T♦')
// console.log(prettyCard({ suit: 'CLUBS', value: 11 }), 'J♣')

// ----------------------Uppgift 5-----------------------------------------

// Instruktioner

// I denna uppgift ska en array som representerar en hel kortlek skapas.

// Tilldela en tom array till en variabel/konstant, deck,
// som ska representera samtliga kort i en kortlek,



// och lägg in 52 objekt i denna array (med push-instruktionen).
// Det ska finnas ett objekt för varje kort i en kortlek.

// Array:en ska ha samma typ av objekt som i Alla hjärter-uppgiften
// (det vill säga, objekt med suit- och value-nycklar),
// men ska innehålla 13 hjärter, 13 spader, 13 ruter och 13 klöver, i den ordningen.

// Använd en loop likt den i den föregående uppgiften,
// samt ytterligare en loop baserad på en lista skapad med

// let deck = []

// let suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS']

// for(let n = 0; n < suits.length; n++){

//   for(let i = 1; i <= 13; i++){
//     deck.push({suit:suits[n], value:i})
//   }
// }

// console.log(deck);


// Lösningen ska ha en for-loop i en for-loop,
// där den ena for-loop:en itererar över de fyra suits-värdena,
// medan den andra itererar över de 13 “value”-värdena.
// Koden i den inre loopen kommer då att köras 4 × 13 = 52 gånger.

// Skapa inte en array bestående av number-värden för att skapa de 13 värdena.
// Vidare ska “suit”-orden, såsom “HEARTS”, ska endast förekomma en gång i lösningen
// (vid suits-tilldelningen).

// En funktion behöver inte skapas som en del av denna uppgift.


// -------------------- Uppgift 6 Skapa kortlek ----------------------------------

// let createDeck = function(){

//   let deck = []
//   let suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS']

//   for(let n = 0; n < suits.length; n++){
//     for(let i = 1; i <= 13; i++){
//       deck.push({suit:suits[n], value:i})
//     }
//   }
//   return deck
// }

// createDeck()


// --------------------- Uppgift 7 'Pop' skicka tillbaka ett kort-----------------------
// let deck = []
//   let suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS']

//   for(let n = 0; n < suits.length; n++){
//     for(let i = 1; i <= 13; i++){
//       deck.push({suit:suits[n], value:i})
//     }
//   }

// let draw = function(deck){
//   // Här inne vill jag ta bort ett kort från arrayen och skicka tillbaka den.
// // då använder jag mig av metoden pop.
// let card = deck.pop()
//   return card
// }
// console.log(draw(deck));

// --------------------- Uppgift 8 Blanda kortleken ------------------------------

// let deck = createDeck()

// let shuffle = function(deck){

// for(let i = deck.length - 1; i > 0; i--){

//   let j = Math.floor(Math.random() * (i + 1))

//   let temp = deck[i]

//   deck[i] = deck[j]
//   deck[j] = temp

// }

// return deck

// }

// console.log(shuffle(deck));

// -------------------------- Uppgift 9 Ta emot en hand och räkna ut värdet -----------

let git = 0

let score = function(card){
  // ska ta emot en array med kortobjekt
  //  och räkna ut blackjack - poäng
  // ess = 11
  // klädda, J, Q, K = 10
  // resterande är värde deras value = 2-10
  // hur skriver jag ut ett värde från ett objekt?
  let points = 0
  let aces = 0

  for(let i = 0; i < card.length; i++){

      if(card[i].value === 1){
        points += 11
        aces ++
      }else if(card[i].value === 11 || card[i].value === 12 || card[i].value === 13){
        points += 10
      }else{
        points += card[i].value
      }
    }
        while (points > 21 && aces > 0){
          points -= 10
          aces--
        }
        return points
      }


console.log(score([{ suit: 'HEARTS', value: 1 }, { suit: 'HEARTS', value: 9 }, { suit: 'HEARTS', value: 9 }]));
