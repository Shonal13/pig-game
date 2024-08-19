'use strict';

// Declaring DOM manipulating elements

const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const diceEl = document.querySelector(`.dice`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceRoll = document.querySelector(`.btn--roll`);
const diceNew = document.querySelector(`.btn--new`);
const diceHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

init();

// Switch Player Function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Rolling Dice functionality
diceRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Display the dice image
    diceEl.classList.remove(`hidden`);
    diceEl.src = `./dice-${dice}.png`;
    // 3. If rolled 1 else switch player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

diceHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to active players score

    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);

      diceEl.classList.add(`hidden`);
    } else {
      // 3. Switching Player
      switchPlayer();
    }
  }
});

diceNew.addEventListener(`click`, init);
