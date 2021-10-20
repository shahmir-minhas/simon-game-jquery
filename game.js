var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStarted = false;


$(document).keypress(function(event) {
  if (gameStarted == false) {
    gameStarted = true;
    nextSequence();
    $("#level-title").text("Level " + level);
  }
});


$(".btn").click(function() {
  handler(this.id);
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("Game pattern " + gamePattern);

  level++;
  console.log("level: " + level);
  $("#level-title").text("Level " + level);

  $("." + randomChosenColour).fadeOut(100).fadeIn(100, function() {
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
  });
}

function handler(id) {
  var userChosenColour = id;
  userClickedPattern.push(userChosenColour);
  playSound(id);
  animatePress(id);

  checkAnswer(userClickedPattern.length - 1);

  console.log("user clicked pattern " + userClickedPattern);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    console.log("false");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
