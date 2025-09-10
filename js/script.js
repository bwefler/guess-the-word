// Unordered list where player’s guessed letters appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// Button with the text “Guess!” in it
const guessButton = document.querySelector(".guess");
// Text input where player guesses a letter
const input = document.querySelector("input");
// Empty paragraph where word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph where remaining guesses display
const remaining = document.querySelector(".remaining");
// Span inside paragraph where remaining guesses display
const span = document.querySelector("span");
// Empty paragraph where messages appear when player guesses a letter
const message = document.querySelector(".message");
// Hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// Starting word to test game
let word = "magnolia";
// Array to contain all the letters the player guesses
let guessedLetters = [];
// Maximum number of guesses the player can make
let remainingGuesses = 8;

// ### Joke button and joke ###
const jokeButton = document.querySelector(".joke-button");
const jokeElement = document.querySelector(".joke");
let joke = "";

// Fetch data from a remote file
const getWord = async function () {
    const res = await 
        fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const words = await res.text();
    const wordArray = words.split("\n");
    // console.log(wordArray);

    // Use random word
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholders(word);
};

// Get random word
getWord ();

// Function to add placeholders for each letter
const placeholders = function (guessWord) {
    const placeholderArr = []; 
    for(let letter of guessWord) {
        placeholderArr.push("●");
    }
    // Merge circles to one "word"
    wordInProgress.innerText = placeholderArr.join("");
};

// Event listener for Guess button
guessButton.addEventListener("click", function (e) {
    // Prevent default action of form submitting, then reloading page
    e.preventDefault();
    // Empty the text of the message element.
    message.innerText = "";
    // Variable to capture the value of the input
    inputValue = input.value;
    // console.log(inputValue);
    // Check input
    const validatedInput = validateInput(inputValue);
    // console.log(`validatedInput: ${validatedInput}`);
    // If it’s a letter, use it to guess
    if (validatedInput) {
        // console.log(`validatedInput: ${validatedInput}`);
        makeGuess(validatedInput);
    }     
    // Clear value of input
    input.value = "";
});

// Validate player's input
const validateInput = function (input) {
    const letter = /[a-zA-Z]/;
    const findMatch = input.match(letter);

    if (!input.length) {
        message.innerText = "Please input a letter"
        return null;
    } else if (input.length > 1) {
        message.innerText = "Must input a single letter only";
        return null;
    } else if (!findMatch) {
        message.innerText = "Must input a letter only";
        return null;
    } else {
        return input;
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";

    // Create a new list item for each letter inside 
    // guessedLetters array and add it to the unordered list
    for (const letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLettersElement.append(listItem);
    }
};

// Update word in progress; replace ● symbols with correct guesses
const updateWordInProgress = function (guessedLetters) {
    // Change to upper case
    const wordUpper = word.toUpperCase();
    // split the word string into an array so that the letter 
    // can appear in the guessedLetters array
    const wordArray = wordUpper.split("");
    // console.log(wordArray);

    // Check if the wordArray contains any letters from the 
    // guessedLetters array. If it does contain any of the 
    // letters, update the circle symbol with the correct letter.
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        }
        else {
            showWord.push("●");
        }
    }
    wordInProgress.innerText = showWord.join("");
        
    // See if player won 
    checkForWin(); 
};

// function to capture input
const makeGuess = function (letter) {
    const upperCaseLetter = letter.toUpperCase();
    // console.log(`Letter: ${upperCaseLetter}`);
    if (guessedLetters.includes(upperCaseLetter)) {
        // console.log(`### ${letter} already guessed ###`);
        message.innerText = 
            "You already guessed that letter - try again";
    } else {
        guessedLetters.push(upperCaseLetter);
        showGuessedLetters();
        countRemainingGuesses(letter);
        updateWordInProgress(guessedLetters);

    }
    // console.log(`Guessed letters: ${guessedLetters}`);
    // console.log(`Word in progress: ${wordInProgress}`);
};

// Count guesses remaining
const countRemainingGuesses = function (guess) {
    let wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess.toUpperCase())) {
        message.innerText = "That letter is in the word. 🙂"
    } else {
        message.innerText = "The word does not contain that letter."

        // The number of guesses only updates when player makes wrong guess.
        remainingGuesses--;
    }

    // Show how many guesses remain
    if (!remainingGuesses) { 
        remaining.innerText = "";
        message.innerText = 
            `### GAME OVER ###\n The word is ${wordUpper}`;

        // Ask player to play again
        startOver();
    } else if (remainingGuesses == 1) {
        // remaining.innerText = "";
        span.innerText = `one guess`;
    } else {
        // remaining.innerText = "";
        span.innerText = `${remainingGuesses} guesses`
    }
};

// Check if player guessed the word and won game
const checkForWin = function () {    
    // Check if word in progress matches word to be guessed
    if (wordInProgress.innerText === word.toUpperCase()) {
        // console.log("### We have a winner! ###");
        message.classList.add("win");
        // message.innerHTML = "";
        message.innerHTML = '<p class="highlight">You guessed ' +
            'the correct word! Congrats!</p>';
        
        // Ask player to play again
        startOver();
    }
};

const startOver = function () {
    // Hide Guess button
    guessButton.classList.add("hide");
    // Hide paragraph which displays remaining guesses
    remaining.classList.add("hide");
    // Hide unordered list where guessed letters apppear
    guessedLettersElement.classList.add("hide");
    // Show the button to play again
    playAgainButton.classList.remove("hide");
};

// Event listener for Play Again button
playAgainButton.addEventListener("click", function () {
    // Remove the class of “win” applied to the message element.
    message.classList.remove("win"); 
    // Empty the message text and the unordered list where the guessed 
    // letters appear.
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    // Set the remaining guess back to 8 or whichever number of guesses 
    // you decided on.
    remainingGuesses = 8; 
    // Set guessedLetter global variable back to an empty array.
    guessedLetters = [];
    // Populate the span text with the new amount of guesses.
    span.innerText = `${remainingGuesses} guesses`;
 
    // Play again
    getWord();
    
    // Show the Guess button, the paragraph with remaining guesses, 
    // and the guessed letters once more. Hide the Play Again button.
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});

// ### Fetch random joke ###
const getJoke = async function () {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json"
        }
  });
  const data = await response.json();
  return data.joke;
};

// ### Event handler for joke button ###
jokeButton.addEventListener("click", async function () {
    // Fetch & display random joke
    joke = await getJoke();
    // console.log(joke);
    jokeElement.innerText = joke;
    // More pun-ishment?
    jokeButton.innerText = "Tell me another joke!"
});