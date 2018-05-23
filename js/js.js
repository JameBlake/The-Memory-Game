const cards = [
        {
            name: "fallout",
            img: "img/Fallout.png",
            id:1
        },
        {
            name: "bf",
            img: "img/bf.png",
            id: 2
        },
        {
            name: "BO",
            img: "img/BO.png",
            id:3
        },
        {
            name: "BS",
            img: "img/BS.png",
            id: 4
        }, 
        {
            name: "MC",
            img: "img/MC.png",
            id: 5
        },
        {
            name: "NV",
            img: "img/NV.png",
            id: 6
        },
        {
            name: "VT",
            img: "img/VT.png",
            id: 7
        },
        {
            name: "WMS",
            img: "img/WMS.png",
            id: 8
        },     
    ];

//* doubling the number of cards to add *//

const fullDeck = cards.concat(cards);

//* The shuffle function*//

// Shuffle function from http://stackoverflow.com/a/2450976
// Known as the Fisher-Yates (aka Knuth) Shuffle

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
shuffle(fullDeck);

//* adding the images to the HTML *//

const card = document.querySelectorAll(".card");

function setUp(){
    for (i = 0 ; i < card.length; i++) {
        card[i].children.item(0).setAttribute("src", fullDeck[i].img);
        card[i].setAttribute("idValue", fullDeck[i].id);}}

//* variables for the card guesses*//

let firstCard = "";
let secCard = "";
let openedCards=[];
let clicks = 0;
let matchedCardsInArray = [];

//* Adding the event listeners to the cards. *//

const cardSelect = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');

deck.addEventListener('click', function playGame(clicked){

    setUp();

    if (clicked.target.nodeName == 'LI'){
    if (clicks < 2){
        clicks++;
    if (clicks === 1){
        firstCard = clicked.target;
        firstCard.className += " open show";
    let cardVal = clicked.target.getAttribute("idValue");
        openedCards.push(cardVal);

   } else {
        secCard=clicked.target;
        secCard.className += " open show";
    let cardVal = clicked.target.getAttribute("idValue");
        openedCards.push(cardVal);
   }
}
    if (openedCards.length ==2) {
        matchingTheOpenCards();
        starRemoval();
        setTimeout(resetCards, 200);
}
    if(matchedCardsInArray.length===16){
        popUp();
        }
    }
})

//* Variables for resetting the guesses *//

function resetCards() {
    firstCard = "";
    secCard = '';
    clicks = 0;
}

//* if the 2 cards being compared aren't a match. *//

function cardsDontMatch(){
    firstCard.classList.remove("open", "show");
    secCard.classList.remove("open", "show");
    openedCards = [];
    clicks=0;
}

//* If the cards match *//

function matchingTheOpenCards() {
    if (openedCards[0] == openedCards[1]) {
        var firstToArray=firstCard.className += " match";
        var secToArray=secCard.className += " match";
        matchedCardsInArray.push(firstToArray);
        matchedCardsInArray.push(secToArray);
        openedCards = [];
        clicks=0;

} else {
    setTimeout(cardsDontMatch, 200);
    setTimeout(resetCards, 200);
    }
}

//* Creating the timer *//

const secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
var interval;

// Closure Function from https://stackoverflow.com/questions/12713564/function-in-javascript-that-can-be-called-only-once

function startTimer(){
    interval = setInterval(function(){
        if (matchedCardsInArray.length < 16) {
            ++totalSeconds;
        } else if (matchedCardsInArray.length == 16) {
            clearInterval();
        }
        secondsLabel.innerHTML = totalSeconds;
    },1000);
}

//* The variables for the moves counter and star remover.*//

const moves = document.querySelector(".moves");
let countingMoves = 0;
const star = document.querySelectorAll('.fa-star');
const starOne = star[0];
const starTwo = star[1];

//* Creating the move counter and star removal scoring system *//
//* Starting the Timer*//

function starRemoval() {
    countingMoves++;
    moves.innerText = countingMoves;

     if (countingMoves== 1) {
        startTimer();
    }

     if (countingMoves == 10) {
        starOne.className += " hidden";

    } else if(countingMoves == 16) {
        starTwo.className += " hidden";
    }
}

//* The reset button*//

const restart = document.querySelector(".restart");
restart.addEventListener("click", function buttonReset (){

    console.log("resetting everything!");

    if (firstCard != ""){
        firstCard.classList.remove("open", "show")
    }
        removeMatch();
        resetCards();
        openedCards=[];
        countingMoves=0;
        moves.innerText = 0;
        secondsLabel.innerHTML = 0;
        matchedCardsInArray=[];
        totalSeconds=0;
        starOne.classList.remove("hidden");
        starTwo.classList.remove("hidden");
        clearInterval(interval);
        shuffle(fullDeck);
})

//* creating a function to remove all classes with open show match *//

function removeMatch(){
        for (i = 0; i < fullDeck.length; i++){
        card[i].classList.remove('open', 'show', 'match');
    }
}

//* Pop up for the win *//

function popUp(){
    if(matchedCardsInArray.length==16){
    let modalWrapper = document.getElementById('modalWrapper');
    let modal = document.querySelector('.modal');
        modal.style.display='block';
//* Show The Moves on Modal *//
document.getElementById("movesResult").innerText =moves.innerText;
//* Show The Stars On Modal *//
const totalStars=3;
let scored= totalStars-document.getElementsByClassName("fa-star hidden").length;
document.getElementById("starsResult").innerText =scored;
//* Shows The Time On Modal *//
document.getElementById("finalTime").innerText = secondsLabel.innerHTML;
    }
}

//* Creating The Play Again Button on The modal. *//

const button = document.getElementById("playAgain");

button.addEventListener('click',function playAgain(){
let modal = document.querySelector('.modal');
        modal.style.display='';
        removeMatch();
        openedCards=[];
        countingMoves=0;
        moves.innerText = 0;
        secondsLabel.innerHTML = 0;
        matchedCardsInArray=[];
        totalSeconds=0;
        starOne.classList.remove("hidden");
        starTwo.classList.remove("hidden");
        clearInterval(interval);
        shuffle(fullDeck);
})


