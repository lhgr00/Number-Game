'use strict';
// Functions
function changePlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  active0.classList.toggle('player--active');
  active1.classList.toggle('player--active');
}

function closePop() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

function openPop() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function reset() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  diceCube.classList.add('hidden');
  active0.classList.add('player--active');
  active1.classList.remove('player--active');
  currentPly1.textContent = 0;
  currentPly2.textContent = 0;
  start();
}

function start() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  diceCube.classList.add('hidden');
}

// Button
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closePop();
  }
});

// Selecting Elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const diceCube = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1 = prompt(`Name of player number one:`);
const player2 = prompt(`Name of player number two:`);
const currentPly1 = document.querySelector('#current--0');
const currentPly2 = document.querySelector('#current--1');
const active0 = document.querySelector('.player--0');
const active1 = document.querySelector('.player--1');

// Others
const open = document.querySelector('.btn--rules');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close-modal');

// Starting Conditions
let scores, currentScore, activePlayer, playing;
start();
document.querySelector('#name--0').textContent = player1;
document.querySelector('#name--1').textContent = player2;

// Roll Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate Number
    const dice = Math.trunc(Math.random() * 6 + 1);
    // Display Number(dice)
    diceCube.classList.remove('hidden');
    diceCube.src = `dice-${dice}.png`;
    // Check if it's 1
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      changePlayer();
    }
  }
});

// Hold Number
btnHold.addEventListener('click', function () {
  if (playing) {
    // Current Score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // If >= 100
    if (scores[activePlayer] >= 100) {
      // Finish Game
      playing = false;
      diceCube.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--activePlayer');
    } else {
      // Switch Player
      changePlayer();
    }
  }
});

// Reset
btnNew.addEventListener('click', reset);

open.addEventListener('click', openPop);
close.addEventListener('click', closePop);
overlay.addEventListener('click', closePop);
