// HTML Elements
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector("#score");
const timerDisplay = document.querySelector("#timer");
const difficultyList = document.querySelector("#difficulty");
const durationAutoIncrement = document.querySelector("#duration");
const gameoverBanner = document.querySelector(".gameover");

// AUDIO files
const audioHit = new Audio("./assets/hit.mp3");
const song = new Audio("./assets/molesong.mp3");

// GAME Variables
let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "easy";
let duration = 10;

// Game Characters
const characters = [
  {sprite: ["./assets/kirby.png", "./assets/kirby-hit.png"], score: 1},
  {sprite: ["./assets/kirby-two.png", "./assets/kirby-two-hit.png"], score: 2},
  {sprite: ["./assets/kirby-three.png", "./assets/kirby-three-hit.png"], score: 3},
  {sprite: ["./assets/kirby-four.png", "./assets/kirby-four-hit.png"], score: 5},
  {sprite: ["./assets/kirby-five.png", "./assets/kirby-five-hit.png"], score: 10}
];

/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  difficulty = difficulty.toLowerCase();

  if (difficulty === "easy") {
    return 1500;
  }
  else if(difficulty === "normal") {
    return 1000;
  }
  else if(difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */
function chooseHole(holes) {
  let randomHole = randomInteger(0, 8);

  while(randomHole === lastHole) {
    randomHole = randomInteger(0, 8);
  }
  lastHole = randomHole;
  updateCharacter(holes[randomHole]);
  return holes[randomHole];
}

/**
 * This function choose and configure a ramdon character from a list of characters.
 * 
 * @param {*} hole 
 */
function updateCharacter(hole) {
  const mole = hole.querySelector(".mole");
  const index = randomInteger(0, characters.length - 1);

  mole.style.backgroundImage = `url(${characters[index].sprite[0]})`;
  mole.setAttribute("data-score", characters[index].score);
  mole.setAttribute("data-index", index);
}

/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
function gameOver() {
  if(time > 0) {
    return showUp();
  }
  return stopGame();
}

/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay){
  toggleVisibility(hole);
  
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole){
  hole.classList.toggle("show");
  return hole;
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore(increment = 1) {
  points += increment;
  score.innerHTML = points;
  return points;
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  points = 0;
  score.innerHTML = points;
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  if(time > 0) {
    time--;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {

  // TODO: implement a better approach to solve problems caused by JEST TESTs current implementation such as mocking the "playAudio()" and other AUDIO related
  // functions. This may require changing the jest.config to enable a different testEnvironment (there was a limitation using jest.fn() within the TESTs).

  // Added a guard to prevent FALSE POSITVE caused by JEST TESTs calling "windows.whack()" directly.
  if(event != null) {
    const mole = event.target;
    const index = Number(mole.getAttribute("data-index"));

    // Added a guard to prevent FALSE POSITIVE caused by JEST TEST trying to reproduce sounds (otherwise DOMException is thrown).
    if(!window.silentMode) {
      playAudio(audioHit);
    }

    increment = Number(mole.getAttribute("data-score")); // number of points (depends on the selected character)
    mole.style.backgroundImage = `url(${characters[index].sprite[1]})`; // changes character's image to simulate being HIT (visual effect)
    return updateScore(increment);
  }
  return updateScore();
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(){
  moles.forEach((mole) => {
    mole.addEventListener('click', whack);
  })
  return moles;
}

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  clearInterval(timer);

  startButton.disabled = false;
  difficultyList.disabled = false;
  durationAutoIncrement.disabled = false;
  gameoverBanner.style.visibility = "visible";

  stopAudio(song);
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton` is clicked.
*
*/
function startGame(event) {
  init();
  clearScore();
  setDuration(duration);
  showUp();
  setEventListeners();
  startTimer();

  // Added a guard to prevent FALSE POSITVE caused by JEST TEST trying to reproduce sounds (otherwise DOMException is thrown).
  if(event != null && !window.silentMode) {
    loopAudio(song);
  }

  startButton.disabled = true;
  difficultyList.disabled = true;
  durationAutoIncrement.disabled = true;
  gameoverBanner.style.visibility = "hidden";

  return "game started";
}

/**
 * This is the function that initialize the game's variables.
 */
function init() {
  time = 0;
  lastHole = 0;
  points = 0;
  difficulty = difficultyList.value;
  duration = durationAutoIncrement.value;
  timerDisplay.textContent = duration;
}

/**
 * This is the function that initializes the cursor
 * @param {*} target the DOM element where the custom cursors will be applied
 * @param {*} source the PATH to the IMAGE file used as cursor
 */
function changeCursor(target, source) {
  target.style.cursor = `url('${source}')`;
}

/**
 * Plays the audio object passed as parameter.
 * 
 * @param {*} audioObject 
 */
function playAudio(audioObject) {
  audioObject.play();
}

/**
 * Plays the audio object passed as aparemter, and make it repeating again and again (loop).
 * 
 * @param {*} audioObject 
 */
function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

/**
 * Stops the audio object passed as parameter
 * 
 * @param {*} audioObject 
 */
function stopAudio(audioObject) {
  audioObject.pause();
  audioObject.currentTime = 0;
}

startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;