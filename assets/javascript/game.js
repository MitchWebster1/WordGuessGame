var background = document.querySelector("#background");
var maxTries = 5;
var guessedLetters = [];
var currentWordIndex = "";
var guessingWord = [];
var remainingGuesses = 0;
var gameFinished = false;
var wins = 0;
var userGuess = "";
var feedback = "";
var randomWords = [
  "denali",
  "glacier",
  "sequoia",
  "yosemite",
  "yellowstone",
  "acadia",
  "badlands",
  "arches",
  "zion",
  "olympic",
];

function resetDisplay() {
  remainingGuesses = maxTries;
  gameFinished = false;
  guessedLetters = [];
  guessingWord = [];
  feedback = "Guess a letter to begin!";
  background.className = "";
}

// Refresh display
function updateDisplay() {
  document.getElementById("feedback").innerHTML = feedback;
  document.getElementById("totalWins").innerText = wins;
  document.getElementById("currentWord").innerText = " ";
  for (var i = 0; i < guessingWord.length; i++) {
    document.getElementById("currentWord").innerText += guessingWord[i];
  }
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("guessedLetters").innerText = guessedLetters;
  // console.log(guessingWord);
}

// Picks new word splits it up and puts it in currentWordIndex
function newWord() {
  resetDisplay();
  currentWordIndex = Math.floor(Math.random() * randomWords.length);
  background.classList.add(randomWords[currentWordIndex]);
  currentWordIndex = Array.from(randomWords[currentWordIndex]);
  currentWordIndex.forEach(function(currentWordIndex) {
    guessingWord.push(" _");
  });
  updateDisplay();
  console.log(currentWordIndex);
  return currentWordIndex;
}

// Reset Game
function resetGame() {
  resetDisplay();
  wins = 0;
  newWord();
  updateDisplay();
}

// On keystroke validates that its a character
// I couldn't get this working with the keycode method not sure why?
document.onkeypress = function(event) {
  var char = /^[a-zA-Z]+/g;
  if (gameFinished) {
    return;
  } else if (event.key.match(char)) {
    // (event.key >= 65 && event.key <= 90) {
    userGuess = event.key.toLowerCase();
    makeGuess(userGuess);
    console.log(userGuess);
  } else {
    feedback = "Please select a letter!";
    updateDisplay();
    return;
  }
};

// Checks to see if letter has been guessed if not pushes to guessedLetters array
function makeGuess(letter) {
  if (guessedLetters.indexOf(letter) === -1) {
    guessedLetters.push(letter);
    search(letter);
  }
  updateDisplay();
  checkWin();
}

// Searchs through current word array to see if any matches
// Creates new array to hold matches then pushes them
// Had some trouble with this, had to look on the internet for some help.
// I understand what is going on but it seems clunky and not the best way.
function search(letter) {
  var positions = [];
  for (var i = 0; i < currentWordIndex.length; i++) {
    if (currentWordIndex[i] === letter) {
      positions.push(i);
    }
  }

  if (positions.length <= 0) {
    remainingGuesses--;
    return (feedback = "Sorry try again!");
  } else {
    for (var i = 0; i < positions.length; i++) {
      guessingWord[positions[i]] = letter;
    }
    return (feedback = "Good guess!");
  }
}

// Checks for all _ to be gone and updates win / resets game.
function checkWin() {
  if (remainingGuesses === 0 || gameFinished === true) {
    feedback = "You lose!";
    gameFinished = true;
    guessingWord = currentWordIndex;
    updateDisplay();
    return;
  } else if (guessingWord.indexOf(" _") === -1 && gameFinished === false) {
    wins++;
    feedback = "Good job you won!";
    gameFinished = true;
    updateDisplay();
  }
}

resetGame();
