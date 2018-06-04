$(document).ready(function() {
  // click on square and change the color
  $(".col").click(function () {
    $(this).css("background-color", "rebeccapurple");
  });
  $.get("http://thecolorapi.com/id?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html", function () {
    console.log("api requested");
  }).done(function (returnData) {
    console.log(returnData);
  });
  //default audio/background music?
});

// function flipSquare() {
  // AJAX query for color API

  // $.get("http://thecolorapi.com/scheme{mode=monochrome-dark&count=8}");
  // Display color on div
  // play sound effect?
  // use flipSquare in "click" event
// }

// function checkForMatch() {
//   // Check for matching colors when two squares are "flipped"
  
// }

// change game instructions in .gameInstruct depending on game mode selected
//  see p text on index.html

// win conditions
//  two colored divs need to match exactly 
//  Solitaire Mode
//  Player vs. Player Mode
//  Player vs. AI Mode

// Reset Button
// function reset(e) {
  
// }