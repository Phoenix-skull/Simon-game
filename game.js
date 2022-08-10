var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var gameIsOver = false;
var level = 0;

$(document).keydown(function () {

  if(!started){
    gameIsOver = false;
    nextSequece();
    $("h1").text("Level " + level);
    started = true;

  }

});

$(".btn").click(function () {
  if(!gameIsOver){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});



/********************************* Function Section**********************************************/
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (gamePattern.length === userClickedPattern.length) {

        setTimeout(function () {

          nextSequece();

        }, 1000);

      }

    } else {

      gameOver();
      startOver();

    }
}

function nextSequece() {

  userClickedPattern = [];

  level ++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  showPattern(gamePattern, -1, gamePattern.length);

}
function showPattern(pattern, i, end) {
  setTimeout(function () {

    $("#" + pattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(pattern[i]);
    i++;

    if(i < end){
      showPattern(pattern, i, end);
    }


  }, 500);
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {

    $("body").removeClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
  }, 200);

}

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
  gameIsOver = true;

}
