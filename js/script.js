
// global variables
// Variable to set initial moves count to 0
var moves = 0;
// Empty array to store the color on each move
var moveArray = [];
// Variable to set current player and scores
var currentPlayer = 1;
var playerOneScore = 0;
var playerTwoScore = 0;
// array to hold ids of each div with class "col"
var squares = ['#0', '#1', '#2', '#3', '#4', '#5', '#6', '#7',
  '#8', '#9', '#10', '#11', '#12', '#13', '#14', '#15'];

var squareOwners = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// colors available for the game board
var colors = [
  '#3C989E', '#5DB5A4', '#F4CDA5', '#F57A82', '#E37B40', '#5E005E', '#AB2F52', '#41733F'
];
// New array that holds 2 copies of each color code from colors array
var moreColors = colors.concat(colors);

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

// count player moves (clicks on squares), add moves to the moveArray
function countMoves(id) {
  moves++;
  moveArray.push(id);
}

function takeTurn() {
  if (moves % 2 === 0) {
    if (currentPlayer === 1) {
      currentPlayer = 2;
      $('.turn').text('Player 2').removeClass('blue').addClass('yellow');
    } else {
      currentPlayer = 1;
      $('.turn').text('Player 1').removeClass('yellow').addClass('blue');
    }
  }
}

function checkForMatch() {
  // Check for matching colors when two squares are "flipped"
  if (moves % 2 === 0) {
    var squareOneId = moveArray[moveArray.length - 1];
    var squareTwoId = moveArray[moveArray.length - 2];
    var lastMove = $("#"+ squareOneId).css('background-color');
    var secondLastMove = $("#"+ squareTwoId).css('background-color');

    if (lastMove == secondLastMove) {
      squareOwners[squareOneId] = currentPlayer;
      $("#"+ squareOneId).text(currentPlayer);
      squareOwners[squareTwoId] = currentPlayer;
      $("#"+ squareTwoId).text(currentPlayer);
      $('.message').text("Player " + currentPlayer + ' made a match!').removeClass('red').addClass('green');
      if (currentPlayer === 1) {
        playerOneScore ++;
      } else {
        playerTwoScore ++;
      }
      if (playerOneScore + playerTwoScore === 8) {
        if (playerOneScore > playerTwoScore) {
          $('.message').text("Player One Wins!").removeClass('red').addClass('green');
        } else {
          $('.message').text("Player Two Wins!").removeClass('red').addClass('green');
        }
      }
    } else {
      $('.message').text("Try again.").removeClass('green').addClass('red');
    }
  }


  takeTurn();
}

// When player clicks on a square, change the background color to one of randomColors array
function clickAction() {
  // If the square that user clicked on has a color, do nothing.
  if ($(this).css("background-color") != 'rgba(0, 0, 0, 0)') {
    return;
  }
  // If there have been an even number of moves (clicks on squares), remove all background colors from squares.
  if (moves % 2 === 0) {
    for (let i = 0; i < squares.length; i++) {
      if (squareOwners[i] === 0) {
        $(squares[i]).css("background-color", '');
      }
    }
  }
  // Get the id of square that was clicked on and reveal it's corresponding random color from the array randomColors.
  var parsedId = parseInt(this.id);
  $(this).css("background-color", randomColors[parsedId]);
  countMoves(parsedId);
  // Display number of current moves 
  $('.moves').text(moves);
  // Check for matching colors 
  checkForMatch();
}

// Function to change the color when a square is clicked
function flipSquare() {
  for (let i = 0; i < squares.length; i++) {
    // click on square
    $(squares[i]).on('click', clickAction);
  }
}

// add disabled class to colors after match

$(document).ready(function () {
  // Initialize Materialize components
  M.AutoInit();
  // countMoves();
  flipSquare();

  // Button Clicks
  // Solitaire Button Click
  $('#solitaire').click(function () {
    // Hide the turn message display
    $('.turn').css('visibility', 'hidden');
    // Display Solitaire rules
    $('h3').text('Solitaire Game:');
    $('p').text("Click to turn over any two squares. If the two squares match, you win! If they don't match, click another square. Repeat as many times as you want!");
  });
  // PvP Button Click
  $('#twoPlayers').click(function () {
    // Display PvP rules
    $('h3').text('Player vs. Player Game:');
    $('p').text("Player 1 starts: Click to turn over any two squares. If the two squares match, you win! If they don't match, Player 2 takes a turn to click two squares. Repeat as many times as you want!");
    // Reveal the turn message display, if it was previously hidden
    $('.turn').css('visibility', 'visible').text('Player 1');
  });
  // Reset Button
  $('#reset').click(function () {
    // Reset game so that no colors are visible
    $('.col').css('background-color', '');
    // Shuffle the randomColors array so that colors will appear in new positions
    shuffle(randomColors);
    // Reset move counter to 0, reset # of moves display message and color
    moves = 0;
    $('.moves').text(moves);
    $('.turn').text('Player 1').removeClass('yellow').addClass('blue');
    $('.message').text('').removeClass('green').addClass('red');
  });
});

//endless play mode
//play until all matches are made
//play until first match is made