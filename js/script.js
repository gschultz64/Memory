// global variables

// declaring move variable
var moves = 0;
var counter = $(".moves");
// declaring colors available for the game board
var colors = [
  '#3C989E', '#5DB5A4', '#F4CDA5', '#F57A82', '#E37B40', '#5E005E', '#AB2F52', '#41733F'
];
// New array that holds 2 copies of each color code from colors array
var moreColors = colors.concat(colors);
// var moreColors = ['#3C989E', '#5DB5A4', '#F4CDA5', '#F57A82', '#E37B40', '#5E005E', '#AB2F52', '#41733F', 
// '#3C989E', '#5DB5A4', '#F4CDA5', '#F57A82', '#E37B40', '#5E005E', '#AB2F52', '#41733F']

//Function to shuffle items in array based on Fisher–Yates shuffle
// https://bost.ocks.org/mike/shuffle/ was helpful
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Pick a remaining element…
    var randomIndex = Math.floor(Math.random() * i);
    var itemAtIndex = array[randomIndex];
    // And swap it with the current element.
    array[randomIndex] = array[i];
    array[i] = itemAtIndex;
  }
  return array;
}
// Shuffle the order of colors in array moreColors and put in new array randomColors
var randomColors = shuffle(moreColors);
// array to hold ids of each div with class "col"
var squares = ['#0', '#1', '#2', '#3', '#4', '#5', '#6', '#7',
  '#8', '#9', '#10', '#11', '#12', '#13', '#14', '#15'];

// When player clicks on a square, change the background color to one of randomColors 
function clickAction() {
  if (moves >= 2) {
    for (let i = 0; i < squares.length; i++) {
      $(squares[i]).css("background-color", '');
      moves = 0;
    }
  } 

  var parsedId = parseInt(this.id);
  $(this).css("background-color", randomColors[parsedId]);
  console.log("box " + squares[parsedId] + " is " + randomColors[parsedId]);
  countMoves();
  console.log("Click # " + moves);
  // checkForMatch();
}

// count player moves
function countMoves() {
  moves++;
  // counter.text("moves");
  // startTimer();
}

function flipSquare() {
  for (let i = 0; i < squares.length; i++) {
    // click on square
    $(squares[i]).on('click', clickAction);

  }
}

// function winMessage() {
//   // Alert player if they win or lose
// }


function checkForMatch() {
  // // Check for matching colors when two squares are "flipped"
  for (let i = 0; i < squares.length; i++) {
    if ($(this).css('background-color', randomColors[i])) {
      console.log("You won!");
    } else {
      console.log("Try again.");
    }
  }
  // winMessage();
}
// add disabled class to colors after match

// have a timer, lose when timer runs out
// var interval;
// var startingTime = 60;
// var remainingTime = 0;

// function startTimer() {
//   startingTime--;
//   if(remainingTime <= 0) {
//     //lose condition or game over
//     console.log('the game is over');
//   }
//   $('.timer').append("<p>" + "0.00:" + remainingTime + "</p>");
//   console.log('timer revealed');
// }
// count player moves
function countMoves() {
  moves++;
  // counter.text("moves");
  // startTimer();
}
// win conditions
//  two colored divs need to match exactly 
// when colors are matched, remove from randomColors? or keep them active and unclickable
//  Solitaire Mode
//  Player vs. Player Mode

$(document).ready(function () {
  // Initialize Materialize components
  M.AutoInit();
  // countMoves();
  flipSquare();


  //default audio/background music?

  // Button Clicks

  // Solitaire Button Click
  $('#solitaire').click(function () {
    // Set game to play alone
    // Display Solitaire rules
    $('p').text("Click to turn over any two squares. If the two squares match, you win! If they don't match, click another square. Repeat as many times as you want!");
    // $('.modal').modal('open');
  });

  // PvP Button Click
  $('#twoPlayers').click(function () {
    // Set game to play against another player
    // Display PvP rules
    $('p').text("Player 1 starts: Click to turn over any two squares. If the two squares match, you win! If they don't match, Player 2 takes a turn to click two squares. Repeat as many times as you want!");
  });

  // Reset Button
  $('#autorenew').click(function () {
    $('.col').css('background-color', '');
    // randomColors needs to refresh when this button is clicked!
    shuffle(randomColors);
    moves = 0;
  });

});
