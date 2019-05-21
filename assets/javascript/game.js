var randomWords = ["dog", "cat", "bird", "horse"];
var maxTries = 10;
var guessedLetters = [];
var currentWordIndex = [];
var guessingWord = [];
var remainingGuesses = 0;
var gameStarted = false;
var gameFinished = false;
var wins = 0;
var userGuess = "";

// Reset Game
function resetGame() {
  remainingGuesses = maxTries;
  gameFinished = false;
  guessedLetters = [];
  guessingWord = [];
  newWord();
  updateDisplay();
}

function newWord() {
  currentWordIndex = Math.floor(Math.random() * randomWords.length);
  for (var i = 0; i < randomWords[currentWordIndex].length; i++) {
    guessingWord.push(" _");
  }
  currentWordIndex = randomWords[currentWordIndex];
}

// Refresh display
function updateDisplay() {
  document.getElementById("totalWins").innerText = wins;
  document.getElementById("currentWord").innerText = "";
  for (var i = 0; i < guessingWord.length; i++) {
    document.getElementById("currentWord").innerText += guessingWord[i];
  }
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("guessedLetters").innerText = guessedLetters;
}

document.onkeyup = function(event) {
  userGuess = event.key;
  console.log(userGuess);
  search(currentWordIndex, userGuess, remainingGuesses);
};

function search(a, b, c) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] === b) {
      console.log("test");
      return i;
    }
    updateDisplay();
    console.log(updateDisplay);
  }
  // return -1;
}

resetGame();

console.log(currentWordIndex);
