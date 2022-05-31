var isGameStarted = false;
var level = 0;
var timeDelay = 500;

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userColourPattern = [];

if (!isGameStarted) {
  // Computer start the game
    startGame();
  // User plays sound sequence
    userSequence();
}

function startGame(){
    document.addEventListener("keypress", function() {
      if (!isGameStarted) {
        isGameStarted = true;
        gameSequence();
      }
    });
}

function gameSequence(){
  userColourPattern = [];
  level++;
  var randomChosenColour = buttonColours[indexGenerator()];
  gamePattern.push(randomChosenColour);

  // This console.log is for developers to check the correct answer
  console.log(gamePattern);

  document.getElementById("level-title").innerHTML = "Level " + level;

  // playSequence() function plays all the sounds from starting
  playSequence();

  // Un-comment the below comments if you want to play last sound only

  // playSound(randomChosenColour);
  // animateButton(randomChosenColour);
}

function userSequence(){
  var allButtons = document.querySelectorAll(".btn");
  for(var i = 0; i < allButtons.length; i++){
    allButtons[i].addEventListener("click", function() {
      var userChosenColour = this.id;
      userColourPattern.push(userChosenColour);
      playSound(userChosenColour);
      animateButton(userChosenColour);
      checkAnswer(userColourPattern.length-1);
    });
  }
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userColourPattern[currentLevel]){
    if (userColourPattern.length === gamePattern.length) {
      setTimeout(function () {
        gameSequence();
      }, 1000);
    }
  }
  else {
    console.log("try again");
    var errorSound = new Audio("sounds/wrong.mp3");
    errorSound.play();
    errorChanges();
    startOver()
  }
}

function startOver(){
  isGameStarted = false;
  level = 0;
  gamePattern = [];
  userColourPattern = [];
  timeDelay = 500;
}

// Recursive loop to play sound by Computer with a decremental time delay.
function playSequence(){
  var i = 0;
  function myloop() {
    setTimeout(function () {
      playSound(gamePattern[i]);
      animateButton(gamePattern[i]);
      i++;
      if (i < gamePattern.length) {
        if (timeDelay>=80) {
          timeDelay -= 10;
        }
        myloop();
      }
    }, timeDelay);
  }
  myloop();
}

function indexGenerator(){
  var randomNumber = Math.floor(Math.random()*4);
  return randomNumber;
}

function playSound(colourName){
  switch (colourName) {
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;

    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;

    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;

    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
  }
}

function animateButton(buttonId){
  document.getElementById(buttonId).classList.add("pressed");
  setTimeout(function() {
    document.getElementById(buttonId).classList.remove("pressed");
  }, 100);
}

function errorChanges(){
  document.getElementById("level-title").innerHTML = "Game Over, Press Any Key to Restart";
  document.querySelector("body").classList.add("game-over");
  setTimeout(function () {
    document.querySelector("body").classList.remove("game-over");
  }, 300);
}
