/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const cards = ["fab fa-pied-piper-hat",
              "fab fa-adversal",
              "fas fa-allergies",
              "fas fa-balance-scale",
              "fas fa-baseball-ball",
              "fas fa-bicycle",
              "fas fa-boxes",
              "fas fa-camera-retro",
              "fab fa-pied-piper-hat",
              "fab fa-adversal",
              "fas fa-allergies",
              "fas fa-balance-scale",
              "fas fa-baseball-ball",
              "fas fa-bicycle",
              "fas fa-boxes",
              "fas fa-camera-retro"
            ];

console.log(cards);

let gameArea = document.getElementById("gameArea");
let ul = document.createElement("UL");
ul.className = "deck";
gameArea.appendChild(ul);


function buildGame() {

  //shuffles the array of cards each time the function is run to build a new game
  let shuffledCards = shuffle(cards);

  //Loop creates the li for each element in the array of cards
  for(let i = 0; i < cards.length; i++) {

    //create new li node
    let newli = document.createElement("LI");
    //apply the card class
    newli.className = "card";

    // store the indexed value in the already shuffled array cards
    let card = shuffledCards[i];
    //Create a new icon node
    let newIcon = document.createElement("I");
    //Add the cards array class name to generate the icon
    newIcon.className = card;

    //append the new icone node to the li node
    newli.appendChild(newIcon);
    $(newli).click(function(evt){
          $(newli).toggleClass("open show");
    });

    //append the new li completed to the master ul
    ul.appendChild(newli);

  };

}



buildGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */