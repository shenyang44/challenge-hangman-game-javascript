const wordGuessContainer = document.getElementById("guessed-word");
const guessedLettersContainer = document.getElementById("guessed-letter");
const newGameButton = document.getElementById("new-game-button");
const guessLetterForm = document.getElementById("guess-form");
const wordsToGuess = [
  "banana",
  "pineapple",
  "lemon",
  "apple",
  "orange",
  "pear",
  "peach",
  "coconut",
  "durian"
];
let chosenWord = "";

function initialWordSetup(word) {
  let spaces = word.split("").map(function(letter) {
    return "_";
  });
  wordGuessContainer.innerHTML = spaces.join(" ");
}

function startNewGame() {
  guessLetterForm.classList.remove("d-none");
  wordGuessContainer.innerHTML = "";
  guessedLettersContainer.innerHTML = "";
  chosenWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
  initialWordSetup(chosenWord);
}

newGameButton.onclick = function() {
  startNewGame();
};
