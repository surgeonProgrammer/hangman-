//Hangman Game

// selecting elements from the page

const  wordDisplay = document.querySelector('.word-display');
const  guessesText = document.querySelector('.guesses-text b'); 
const  keyboardDiv  = document.querySelector('.keyboard');
const  hangmanImage = document.querySelector('.hangman-box img');
const  gameModal = document.querySelector('.game-modal');
const  playAgainBtn = gameModal.querySelector('button');

//Initializing game Variables

let currentWord, correctLetters, wrongGuessCount;

const maxGuesses = 6;

// function to reset game
const resetGame = () =>{
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = 'images/hangman-0.svg';
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  // create the empty letter slots
  wordDisplay.innerHTML = currentWord.split('').map(() => `<li class='letter'></li>`).join('');

  //enable keyboard buttons
  keyboardDiv.querySelectorAll('button').forEach(btn => btn.disabled = false);
  //hide game modal
  gameModal.classList.remove('show');
}



// create a function to get a random word and set up the game

const getRandomWord = () => {
  //picking a random word and hint from your wordList array

  const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];

  //set the current word and update the hint

  currentWord = word;
  document.querySelector('.hint-text b').innerText = hint;

  //call reset game function
  resetGame();
}


// function to handle the end of game win or lose
const gameOver = (isVictory)=>{
  // show the game over modal with win or loss
  const modalText = isVictory? `You found the word!` : `The correct word was :`;
  gameModal.querySelector('img').src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
  gameModal.querySelector('h4').innerText = isVictory? `Congratulations!` : `Game Over`;
  gameModal.querySelector('p').innerHTML = `${modalText} <b> ${currentWord} </b>`;
  gameModal.classList.add('show');
}


//creating a for loop to display our keyboard buttons
for(let i = 97; i <= 122; i++){
  const button = document.createElement('button');
  button.innerText= String.fromCharCode(i);

  button.classList.add('bg-[#850042]', 'text-white', 'rounded', 'px-4', 'py-2', 'hover:bg-[#241B2C]');
  
  keyboardDiv.appendChild(button);

  //adding a click event listener to each button
  button.addEventListener('click', (e) =>initGame(e.target, String.fromCharCode(i)) );
}

// Function to handle the game logic when a letter is clicked
const initGame = (button, clickedLetter) => {

  //check if the clicked letter is in the current word
  if(currentWord.includes(clickedLetter)){
    // update the displayed letters if clicked is correct
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter){
        correctLetters.push(letter);
        wordDisplay.querySelectorAll('li')[index].innerText = letter;
        wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
      }
    });
  }
  else {
    //update the number of wrong guesses
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }

  //disable the clicked button  
  button.disabled = true;
  //update the displayed guess count

  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  //check if the game shoule end based on win or lose condition
if(wrongGuessCount === maxGuesses)return gameOver(false);
if (correctLetters.length === currentWord.length) return gameOver(true);
}

//starting the game with a random word
getRandomWord();


//add event listener for the play again button
playAgainBtn.addEventListener('click', getRandomWord);
