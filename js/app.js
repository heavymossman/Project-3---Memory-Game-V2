/*
 * Create a list that holds all of your cards
 */
const cards = ["fab fa-pied-piper-hat",
    "fab fa-adversal",
    "fab fa-pied-piper-hat",
    "fab fa-adversal",
    "fas fa-allergies",
    "fas fa-balance-scale",
    "fas fa-baseball-ball",
    "fas fa-bicycle",
    "fas fa-boxes",
    "fas fa-camera-retro",
    "fas fa-allergies",
    "fas fa-balance-scale",
    "fas fa-baseball-ball",
    "fas fa-bicycle",
    "fas fa-boxes",
    "fas fa-camera-retro"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Opening empty variables and arrays
let openCards = [];
let winningPairs = [];
let moves = 0;
let scoreHTML = $('.moves');
let startingStars = 3
let tempEvent = "";

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let timer = new Timer();
//timer.start();
timer.addEventListener('secondsUpdated', function(e) {
    $('#basicUsage').html(timer.getTimeValues().toString());

});


let gameArea = document.getElementById("gameArea");
let ul = document.createElement("UL");
ul.className = "deck";
gameArea.appendChild(ul);

function respondToClick(evt) {
    tempEvent = evt.target;
    tempEvent.removeEventListener("click", respondToClick);
    $(tempEvent).toggleClass("open show");

    //$(e).toggleClass("open show");
    let inside = $(tempEvent.childNodes);

    openCards.push(inside);
    //console.log(openCards)
    //evt.target.style.backgroundColor = "red";
    openCardList(evt);
}



function closeAllCards() {
    //store all the elements with the class card in the var cards
    let cards = document.querySelectorAll(".card");
    //Remove the open show classes after a 1.1 second delay.
    setTimeout(function() {
        $(cards).removeClass("open show");
        //After the cards turn back around, we readd in the event listners
        addBackEvents();
    }, 1000);
    movesCount();
    //reset the openCards array to empty.
    openCards = [];
}



function matchingCards() {
    //store the matching cards as they are the only ones open in a variable.
    let cards = document.querySelectorAll(".open")
    //Add the match variable.
    $(cards).addClass("match");
    //send the winning cards to the winning pairs array to be stored (prob use this as the score)
    winningPairs.push(cards);
    cardsfoundScore();
    //clear the open cards array
    openCards = [];
    movesCount();
    winner();
    addBackEvents()
}

function cardsfoundScore() {
    let cardsMatched = winningPairs.length;
}

function movesCount() {
    //simple function to just incrament by 1 each time two cards are turned over or matched. Total moves.
    moves++
    //scoreHTML.text(moves);
    //console.log(moves)
    $(scoreHTML).text(moves);
    stars();
    //Display teh completed game time in modal popup upon victory
    $('#gameTime').html(timer.getTimeValues().toString());
}

function winner() {

    let winningScore = cards.length / 2;
    if (winningPairs.length === winningScore) {
        timer.stop();
        //alert("CONGRATULATIONS" + "<br>" + "//console.log("YOU WIN THE GAME");
        launchModal();
    }

}


function openCardList(evt) {


    if (moves >= 0) {
        timer.start();
    }


    //make sure the open cards array has more than one card open
    if (openCards.length > 1) {
        //If more than one card is open, this will remove all the events so no more cards can open
        removeAllEvents();

        //store the open cards class in variables
        let firstCard = $(openCards[0]).attr('class');
        let secondCard = $(openCards[1]).attr('class');

        //check if those variable class strings match
        if (firstCard === secondCard) {
            //if they match, run the winning function
            matchingCards();
            //x.addEventListener('click',respondToClick);
        } else {
            //if they do not match, then close all cards.


            //let x = document.querySelectorAll('.cards');
            //tempEvent.addEventListener('click', respondToClick);
            closeAllCards();
        }


    }

}
//Displays the stars on the page
let starUi = document.getElementById("starsList");
// Displays the stars in the popup.
let modalStars = document.getElementById("modalStars");

//For loop prints out the stars on the page
for (let i = 0; i < 3; i++) {
    let newli = document.createElement("LI");

    let newIcon = document.createElement("I");

    newIcon.className = "fas fa-star";

    newli.appendChild(newIcon);
    starUi.appendChild(newli);
}
//For loop prints out the stars on the modal
for (let i = 0; i < 3; i++) {
    let newli = document.createElement("LI");

    let newIcon = document.createElement("I");

    newIcon.className = "fas fa-star";

    newli.appendChild(newIcon);
    modalStars.appendChild(newli);
}

function stars() {

    //removes the stars once a certain score is achieved

    if (moves === 14) {
        starUi.removeChild(starUi.childNodes[0]);
        modalStars.removeChild(modalStars.childNodes[0]);
    }
    if (moves === 18) {
        starUi.removeChild(starUi.childNodes[0]);
        modalStars.removeChild(modalStars.childNodes[0]);
    }
    if (moves === 22) {
        starUi.removeChild(starUi.childNodes[0]);
        modalStars.removeChild(modalStars.childNodes[0]);
    }

}


function buildGame() {


    //shuffles the array of cards each time the function is run to build a new game
    let shuffledCards = shuffle(cards);
    //This is where we sill store our open cards

    //Loop creates the li for each element in the array of cards
    for (let i = 0; i < cards.length; i++) {

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

        //append the new icon node to the li node
        newli.appendChild(newIcon);
        //Add event listener to each li; on click open function respondToClick
        newli.addEventListener('click', respondToClick);

        //append the new li completed to the master ul
        ul.appendChild(newli);

    };
}


buildGame();


/* MODEL POP UP JS */

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function launchModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function removeAllEvents() {
    let allLi = gameArea.querySelectorAll("LI");
    for (let i = 0; i < allLi.length; i++) {
        allLi[i].removeEventListener('click', respondToClick);
    }
}


function addBackEvents() {
    //This function will add back all event listeners
    let allLi = gameArea.querySelectorAll("LI");
    //This applies each event listener to each specif li
    for (let i = 0; i < allLi.length; i++) {
        allLi[i].addEventListener('click', respondToClick);
    }
}


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
