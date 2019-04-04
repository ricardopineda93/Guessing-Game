/* eslint-disable quotes */
const gameProperties = {
  winningNumber: Math.floor(Math.random() * 100),
  randomNum1forHint: Math.floor(Math.random() * 100),
  randomNum2forHint: Math.floor(Math.random() * 100),
  guessesRemaning: 5,
  gameLost: false,
  reduceGuessesRemaining() {
    this.guessesRemaning -= 1;
  },
  checkifGameLost() {
    if (this.guessesRemaning === 0) {
      this.gameLost = true;
    }
  },
  resetGame() {
    this.guessesRemaning = 5;
    this.gameLost = false;
    this.winningNumber = Math.floor(Math.random() * 100);
    this.randomNum1forHint = Math.floor(Math.random() * 100);
    this.randomNum2forHint = Math.floor(Math.random() * 100);
  }
};

const guessSubmitButton = document.getElementById("submitGuessButton");
const playAgainButton = document.getElementById("playAgainButton");
const hintButton = document.getElementById("hintButton");

function correctGuess() {
  alert("You Win!");
}

function youLose() {
  alert(
    `You're out of guesses... the number was ${gameProperties.winningNumber}!`
  );
}

function incorrectGuess(input) {
  //debugger;
  let guessList = document.getElementById("guessList");
  let guessMade = document.createElement("li");
  guessMade.appendChild(document.createTextNode(input));
  guessList.appendChild(guessMade);

  gameProperties.reduceGuessesRemaining();
  gameProperties.checkifGameLost();

  document.getElementById("guessesLeft").innerHTML = `${
    gameProperties.guessesRemaning
  } guess(es) remaining!`;

  if (gameProperties.gameLost) {
    youLose();
  } else {
    guessHigherOrLower(input);
  }
}

function guessHigherOrLower(input) {
  if (input > gameProperties.winningNumber) {
    alert("Guess lower!");
  } else if (input < gameProperties.winningNumber) {
    alert("Guess higher!");
  }
}

function getInputNumberAndUpdate(inputElement) {
  const input = Number(inputElement.value);
  inputElement.value = "";
  if (!gameProperties.gameLost) {
    if (input === gameProperties.winningNumber) {
      correctGuess();
    } else {
      incorrectGuess(input);
    }
  } else {
    youLose();
  }
}

function playAgain() {
  gameProperties.resetGame();

  let guessList = document.getElementById("guessList");
  guessList.innerHTML = "";

  document.getElementById("guessesLeft").innerHTML = `${
    gameProperties.guessesRemaning
  } guess(es) remaining!`;
}

guessSubmitButton.addEventListener("click", function() {
  const input = document.querySelector("input");
  getInputNumberAndUpdate(input);
});

playAgainButton.addEventListener("click", function() {
  playAgain();
});

hintButton.addEventListener("click", function() {
  alert(
    `Could be one of these?: ${gameProperties.randomNum1forHint}, ${
      gameProperties.winningNumber
    }, ${gameProperties.randomNum2forHint}`
  );
});
