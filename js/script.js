
// Variable to set initial moves count to 0
var moves = 0;

// Empty array to store the id (squares array) of each move
var moveArray = [];

// count player moves (clicks on squares), add moves to the moveArray
function countMoves(id) {
  moves++;
  moveArray.push(id);
}

// Variables to set current player and scores
// Always start on Player 1
var currentPlayer = 1;

var playerOneScore = 0;
var playerTwoScore = 0;

// array to hold ids of each div with class "col"
var squares = ['#0', '#1', '#2', '#3', '#4', '#5', '#6', '#7',
  '#8', '#9', '#10', '#11', '#12', '#13', '#14', '#15'];

// Array to keep track of whether Player 1 has a match, Player 2 has a match, or neither.
var squareOwners = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// colors available for the game board
var colors = [
  '#ECE13C', '#5DB5A4', '#F4CDA5', '#F57A82', '#E37B40', '#5E005E', '#AB2F52', '#41733F'
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


// Change turns between Player 1 and Player 2 
function takeTurn() {
  // on even-numbered moves, change turns
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


// Check for matching colors on even-numbered moves
function checkForMatch() {

  // Check for matching colors when two squares have been clicked
  if (moves % 2 === 0) {

    // Find the ids and colors for the last two moves
    var squareOneId = moveArray[moveArray.length - 1];
    var squareTwoId = moveArray[moveArray.length - 2];
    var lastMove = $("#"+ squareOneId).css('background-color');
    var secondLastMove = $("#"+ squareTwoId).css('background-color');

    // If the last two colors are the same, there is a match.
    if (lastMove == secondLastMove) {
      // Update squareOwners array to track which matches each player has made
      squareOwners[squareOneId] = currentPlayer;
      squareOwners[squareTwoId] = currentPlayer;
      // Display on the colored squares which player made the match
      $("#"+ squareOneId).text(currentPlayer);
      $("#"+ squareTwoId).text(currentPlayer);
      // Display message to the player if there is a match
      $('.message').text("Player " + currentPlayer + ' made a match!').removeClass('red').addClass('green');

      // Increment the current player's score when match is made
      if (currentPlayer === 1) {
        playerOneScore ++;
      } else {
        playerTwoScore ++;
      }

      // Once 8 matches have been made, the game is over. (16 total squares)
      if (playerOneScore + playerTwoScore === 8) {
        // Player 1 has a higher score
        if (playerOneScore > playerTwoScore) {
          $('.message').text("Player One Wins!").removeClass('red').addClass('green');
          // Player 2 has a higher score
        } else {
          $('.message').text("Player Two Wins!").removeClass('red').addClass('green');
        }
      }
      // No match has been made
    } else {
      $('.message').text("Try again.").removeClass('green').addClass('red');
    }
  }
  takeTurn();
}


// When player clicks on a square, change the background color to one of randomColors array
function changeColor() {

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
function clickSquare() {
  for (let i = 0; i < squares.length; i++) {
    // click on square
    $(squares[i]).on('click', changeColor);
  }
}


$(document).ready(function () {
  // Initialize Materialize components
  M.AutoInit();
  // Play the game
  clickSquare();
  // Reset Button
  $('#reset').click(function () {
    // Reset game so that no colors are visible
    $('.col').css('background-color', '').text('');
    // Shuffle the randomColors array so that colors will appear in new positions
    shuffle(randomColors);
    // Reset move counter to 0, reset # of moves display message and color
    moves = 0;
    currentPlayer = 1;
    playerOneScore = 0;
    playerTwoScore = 0;
    squareOwners = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    $('.moves').text(moves);
    $('.turn').text('Player 1').removeClass('yellow').addClass('blue');
    $('.message').text('').removeClass('green').addClass('red');
  });
});
