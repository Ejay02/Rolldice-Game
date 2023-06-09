'use strict';

//select elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player1Score = document.getElementById('current--0');
const player2Score = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, scores, activePlayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;

  scores = [0, 0];

  currentScore = 0;
  activePlayer = 0;

  playing = true;

  document.getElementById(`current--${activePlayer}`).textContent = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

//switch function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// rolling dice fxn
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; // generate random dice roll

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check rolled is 1,
    if (dice !== 1) {
      currentScore += dice; // add dice to current score

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //1: add current score to active player score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2: check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

// newGame
btnNew.addEventListener('click', init);
