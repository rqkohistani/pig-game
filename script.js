console.log('Hello from Dom Manipulation directory')

/**
 * DOM: Docuement Object Model;
 * Structured representation of an HTML document
 * DOM  IS USED TO CONNECT WEBPAGES TO SCRIPTS LIKE JAVASCRIPT
 * NOTE: javaScript and DOM are not the same
 * html content is stored in the DOM, WHICH CAN BE ACCESSED AND MANIPULATED BY JAVASCRIPT
 */


// let scores=[0,0];
// let roundScore;
// let activePlayer=0;
// let dice;

// dice =Math.floor(Math.random()*6)+1;//1 to 6
// console.log(dice)
// document.querySelector(`#current--${activePlayer}`).textContent=dice; 
// document.querySelector('#current--0').textContent=dice;  //setting. TextContent is plain text only
// document.querySelector('#name--0').textContent='Rashed'; //setting
// document.querySelector('#name--0').innerHTML='<em>'+'Rashed'+'</em>'; 
/*if you need to put some html in the
 * in the selected elements then we use innerHtml
*/
//**** READING A VALUE FROM HTML OR getter values

// let x=document.querySelector('#score--0').textContent;
// let y=document.querySelector('#score--0').textContent=0; 
// console.log(x)
// console.log(y)

//if you would like change the css lets say you want to hide find it css and hide here

// document.querySelector('.dice').style.display='none'


//****************************************************** */

/**
 * EventsLister
 */


// querySelector can work in most cases however getElementById works only for ids instead querySelector this faster. Then you dont have # code you simply write the id
// document.getElementsByClassName('score--0') vs document.querySelector('#score--0')
// let scores=[0,0];
// let roundScore=0;
// let activePlayer=0;

// document.getElementById('score--0').textContent='0'
// document.getElementById('score--1').textContent='0'
// document.getElementById('current--0').textContent='0'
// document.getElementById('current--0').textContent='0'
// //hide the dice
// document.querySelector('.dice').style.display='none'
// document.querySelector('.btn--roll--value').style.display='none'

// //addlistner
// document.querySelector('.btn--roll').addEventListener('click',function(){
//   //1. Random number
//   let dice =Math.floor(Math.random()*6)+1;//1 to 6
//   console.log(dice)
//   //2. dispay the results
//   let diceDom=document.querySelector('.dice');
//   diceDom.style.display='block'
//   // diceDom.src = 'dice-' + dice+'.png';
//   // document.querySelector('.dice').src=`dice-${dice}.png`;
//   diceDom.src = `./dices/dice-${dice}.png`;
//   // diceDom.src = `dice-${dice}.png`;
//   document.querySelector('.btn--roll--value').style.display='block'
//   //update the value
//   // document.querySelector('.btn--roll--value').textContent=dice//OR
//   document.querySelector('.btn--roll--value').innerHTML='<em>'+`${dice}`+'</em>'
//   //update the round score IF the rolled number was NOT a 1
//   if(dice !==1){
//     //add score
//     roundScore +=dice
//     document.querySelector(`#current--${activePlayer}`).textContent=roundScore; 
//   }else {
//     //nex player
//     activePlayer ===0 ? activePlayer =1 : activePlayer =0
//     roundScore=0;
//     document.querySelector('#current--0').textContent='0'
//     document.querySelector('#current--1').textContent='0'

//     document.querySelector('.player--0').classList.toggle('player--active');
//     document.querySelector('.player--1').classList.toggle('player--active');
//     // document.querySelector('.player--0-panel').classList.remove('active');
//     // document.querySelector('.player--1-panel').classList.add('active');
//     document.querySelector('.dice').style.display='none'
    

//   }



// });

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

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./dices/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);