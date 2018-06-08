// global variables
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


function clickAction() {
  for (let i = 0; i < squares.length; i++) {
    $(this).css("background-color", randomColors[i]);
    // console.log("box " + squares[i] + " is " + randomColors[i]);
    
  }
}
function flipSquare() {
  for (let i = 0; i < squares.length; i++) {
    // click on square and color appears
    $(squares[i]).on('click', clickAction);
    
  }
}



// for (let i = 0; i < squares.length; i++) {
//   $(this).css("background-color", '');
//   console.log("box " + squares[i] + " is empty");






// function checkForMatch() {
// // Check for matching colors when two squares are "flipped"
//   if (squares[i] === ) {
//     console.log("You won!");
//   } else {
//     console.log("Try again.");
//   }
// }

// win conditions
//  two colored divs need to match exactly 
// when colors are matched, remove from randomColors?
//  Solitaire Mode
//  Player vs. Player Mode
//  Player vs. AI Mode

$(document).ready(function () {
  // Initialize Materialize components
  M.AutoInit();

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

  // PvAi Button Click
  $('#computer').click(function () {
    // Set game to play against computer/ai
    // Display PvAi rules
    $('p').text("Click to turn over any two squares. If the two squares match, you win! If they don't match, the computer takes a turn to click two squares. Repeat as many times as you want!");
  });

  // Reset Button
  $('#autorenew').click(function () {
    $('.col').css('background-color', '');
    // randomColors needs to refresh when this button is clicked!
  });

});
