var background = document.querySelector("#background");
var maxTries = 10;
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
  "olympic"
];

function resetDisplay() {
  remainingGuesses = maxTries;
  gameFinished = false;
  guessedLetters = [];
  guessingWord = [];
  feedback = "";
  background.className = "";
}

// Reset Game
function resetGame() {
  resetDisplay();
  wins = 0;
  newWord();
  updateDisplay();
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
  // for (var i = 0; i < randomWords[currentWordIndex].length; i++) {
  // guessingWord.push(" _");
  // }
  // currentWordIndex = randomWords[currentWordIndex].split("");
  return currentWordIndex;
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
}

// On keystroke
document.onkeypress = function(event) {
  if (remainingGuesses === 0 || gameFinished === true) {
    gameFinished = true;
    return;
  } else {
    var char = event.key || event.charCode;
    // if (char >= 90 && char <= 65) {
    userGuess = char.toLowerCase();
    makeGuess(userGuess);
    console.log(userGuess);
    // } else {
    // return console.log("not a letter");
    // }
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
  if (guessingWord.indexOf(" _") === -1 && gameFinished === false) {
    wins++;
    updateDisplay();
    gameFinished = true;
    // resetGame();
  }
}

resetGame();
