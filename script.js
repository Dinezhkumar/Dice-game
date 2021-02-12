'use strict';

const roleButton = document.querySelector('.btn--roll');
const resetButton = document.querySelector('.btn--new');
const holdBUtton = document.querySelector('.btn--hold');

//Score Element
const scoreElm0 = document.querySelector('#score--0');
const scoreElm1 = document.getElementById('score--1');

//Current score element
const currentScoreElm0 = document.querySelector('#current--0');
const currentScoreElm1 = document.getElementById('current--1');

//Current score element
const Player1Elm = document.querySelector('.player--0');
const Player2Elm = document.querySelector('.player--1');

//dice element
const diceElm = document.querySelector('.dice');

let diceValue = 0;
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const resetScore = function () {
  scoreElm0.textContent = 0;
  scoreElm1.textContent = 0;
  currentScoreElm0.textContent = 0;
  currentScoreElm1.textContent = 0;
  diceElm.classList.add('hidden');

  Player1Elm.classList.add('player--active');
  Player1Elm.classList.remove('player--winner');
  Player2Elm.classList.remove('player--active');
  Player2Elm.classList.remove('player--winner');

  activePlayer = 0;
  diceValue = 0;
  score = [0, 0];
  currentScore = 0;
  playing = true;
};

resetScore();

const switcPlayer = function () {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  Player1Elm.classList.toggle('player--active');
  Player2Elm.classList.toggle('player--active');
};

// function which will perform action while clicking dice
const roleDice = function () {
  if (playing) {
    diceValue = Math.trunc(Math.random() * 5) + 1;
    diceElm.classList.remove('hidden');

    diceElm.src = `dice-${diceValue}.png`;

    // check if the dice is rolled 1
    if (diceValue !== 1) {
      currentScore += diceValue;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    }
    // check if the dice is rolled 1 if 1 then change the player and reset the current score to 0
    else {
      switcPlayer();
    }
  }
};

const addScore = function () {
  if (playing) {
    // add score of the active player and check score is actually 100
    score[activePlayer] += currentScore;
    if (score[activePlayer] >= 10) {
      //Player wins functionality
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      playing = false;
    } else {
      document.getElementById(`score--${activePlayer}`).textContent =
        score[activePlayer];
      switcPlayer();
    }
  }
};

roleButton.addEventListener('click', roleDice);
holdBUtton.addEventListener('click', addScore);
resetButton.addEventListener('click', resetScore);

// //Player 1 score and current score
// const Player1 = {
//   score: 0,
//   currentScore: 0,
//   isCurrentPlayer: true,
// };

// //Player 2 score and current score
// const Player2 = {
//   score: 0,
//   currentScore: 0,
//   isCurrentPlayer: false,
// };

// // function which will perform action while clicking dice
// const roleDice = function () {
//   diceValue = Math.trunc(Math.random() * 5) + 1;
//   diceElm.classList.remove('hidden');

//   diceElm.src = `dice-${diceValue}.png`;

//   // check if the dice is rolled 1
//   if (diceValue !== 1) {
//     if (Player1.isCurrentPlayer) {
//       currentScoreElm0.textContent = Player1.currentScore += diceValue;
//     } else if (Player2.isCurrentPlayer) {
//       currentScoreElm1.textContent = Player2.currentScore += diceValue;
//     }
//   }
//   // check if the dice is rolled 1 if 1 then change the player and reset the current score to 0
//   else {
//     if (Player1.isCurrentPlayer) {
//       Player2.isCurrentPlayer = true;
//       Player1.isCurrentPlayer = false;
//       currentScoreElm0.textContent = Player1.currentScore = 0;
//       Player1Elm.classList.remove('player--active');
//       Player1Elm.classList.add('player--active');
//     } else if (Player2.isCurrentPlayer) {
//       Player2.isCurrentPlayer = false;
//       Player1.isCurrentPlayer = true;
//       currentScoreElm1.textContent = Player2.currentScore = 0;
//       Player1Elm.classList.add('player--active');
//       Player2Elm.classList.remove('player--active');
//     }
//   }
// };
