var randomWords = ["dog", "cat", "bird", "horse"];
var maxTries = 10;
var guessedLetters = [];
var currentWordIndex = "";
var guessingWord = [];
var remainingGuesses = 0;
// var gameStarted = false;
// var gameFinished = false;
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
  console.log(currentWordIndex);
}

// Picks new word splits it up and puts it in currentWordIndex
function newWord() {
  currentWordIndex = Math.floor(Math.random() * randomWords.length);
  for (var i = 0; i < randomWords[currentWordIndex].length; i++) {
    guessingWord.push(" _");
  }
  currentWordIndex = randomWords[currentWordIndex].split("");
  return currentWordIndex;
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

// On keystroke
document.onkeyup = function(event) {
  userGuess = event.key.toLowerCase();
  makeGuess(userGuess);
  console.log(userGuess);
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
  } else {
    for (var i = 0; i < positions.length; i++) {
      guessingWord[positions[i]] = letter;
    }
  }
}

// Checks for all _ to be gone and updates win / resets game.
function checkWin() {
  if (guessingWord.indexOf(" _") === -1) {
    wins++;
    // gameFinished = true;
    resetGame();
  }
}

resetGame();
