//JQuery variables
var focusedPlayer;
var focusedText;

var gamestate = 0;
var player_odds = 0;
var player_evens = 0;

var wins_odds = 0;
var wins_evens = 0;

$(function() {
  $('#div-odds').on("click", function () {
    $('#div-evens').css("border-style", "solid");
    focusedPlayer = $('#div-odds');
    focusedText = $('#text-odd');
    focusedPlayer.css("border-style", "dashed");
  });
});

$(function() {
  $('#div-evens').on("click", function () {
    $('#div-odds').css("border-style", "solid");
    focusedPlayer = $('#div-evens');
    focusedText = $('#text-even');
    focusedPlayer.css("border-style", "dashed");
  });
});


document.onkeypress = function(e) {
  var x = event.key;
  if( !isNaN(x) ) {
    if(focusedPlayer.attr('id') == 'div-odds') { player_odds = parseInt(x); }
    else                           { player_evens = parseInt(x) }
    focusedText.text('[X]');
    focusedPlayer.css("border-style", "solid");
  }

  if(event.keyCode == 13) { //--> enter
    focusedPlayer.css("border-style", "solid");
    if(gamestate == 0) {
      gameLogic();
      gamestate = 1; //increment gamestate to prep for next game
    } else { //have to use else not another if >:(
      setup();
      gamestate = 0; //reset gamestate to start
    }
  }

}

//Precondition: gamestate = 0
function gameLogic() {
  //Reveal numbers
  $('#text-odd').text('[' + player_odds + ']');
  $('#text-even').text('[' + player_evens + ']');

  var sum = player_odds + player_evens;
	if( sum % 2 == 0 ) {
    $('#text-result').text("\u03A3 = " + sum + " --> Evens wins!");
    wins_evens++;
  } else {
    $('#text-result').text("\u03A3 = " + sum + " --> Odds wins!");
    wins_odds++;
  }
   $('#prompt').text("Press Enter to play again");
}

//Precondition: gamestate = 1
function setup() {
  //clear screen
  $('#text-result').text("And the winner is...");
  $('#text-odd').text("[]");
  $('#text-even').text("[]");
  $('#prompt').text("")
  //Display win counts in the most obtruse way possible bc **** custom attributes at this point
  var beginning = $('#wins-even').text(); //Save the string
  var index = beginning.indexOf('[');  //Find where to insert
  var middle = beginning.substring(0,index+1); //Chop off the begging
  var end = middle + wins_evens + "]";  //combine with their wincount in the middle
  $('#wins-even').text(end);  //update the element

  beginning = $('#wins-odd').text(); //Save the string
  index = beginning.indexOf('[');  //Find where to insert
  middle = beginning.substring(0,index+1); //Chop off the begging
  end = middle + wins_odds + "]";  //combine with their wincount in the middle
  $('#wins-odd').text(end);  //update the element




}
