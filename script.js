'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];

let currentScore = 0;

let activePlayer = 0;

let playing = true;

// Functions

const playerSwitching = () => {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling funcionalyty
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate random diceroll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display diceroll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1: if true switch to next player

    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      playerSwitching();
    }
  }
});

// holding funcionality

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      playerSwitching();
    }
  }
});

btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document.querySelector(`.player--0`).classList.add('player--active');

  scores = [0, 0];

  activePlayer = 0;

  currentScore = 0;

  playing = true;
});
