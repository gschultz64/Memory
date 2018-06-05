var colors = [
  '#3C989E', '#5DB5A4', '#F4CDA5', '#F57A82', '#E37B40', '#5E005E', '#AB2F52', '#41733F'
];
var squares = [];

$(document).ready(function() {
  // Initialize Materialize components
  M.AutoInit();
  flipSquare();
  // request API 
  // $.get()
  // });
  //default audio/background music?
  // Button Clicks
  // Solitaire Button Click
  $('#solitaire').click(function () {
    // Set game to play alone
    // Display Solitaire rules
    $('p').text("Click to turn over any two squares. If the two squares match, you win! If they don't match, click another square. Repeat as many times as you want!");
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
  });
  
});

function flipSquare() {
  // click on square and change the color
  $(".col").click(function () {
    $(this).css("background-color", colors[0]);
  });
  // Display color on div
  // play sound effect?
  // use flipSquare in "click" event
}

// function checkForMatch() {
  // Check for matching colors when two squares are "flipped"
  
// }

// change game instructions in .gameInstruct depending on game mode selected
//  see p text on index.html

// win conditions
//  two colored divs need to match exactly 
//  Solitaire Mode
//  Player vs. Player Mode
//  Player vs. AI Mode


