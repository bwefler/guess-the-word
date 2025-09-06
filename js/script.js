// Unordered list where player’s guessed letters appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// Button with the text “Guess!” in it
const guessButton = document.querySelector(".guess");
// Text input where player guesses a letter
const input = document.querySelector("input");
// Empty paragraph where word in progress appears
let wordInProgress = document.querySelector("word-in-progress");
// Paragraph where remaining guesses display
const remaining = document.querySelector(".remaining");
// Span inside paragraph where remaining guesses display
const span = document.querySelector("span");
// Empty paragraph where messages appear when player guesses a letter
const message = document.querySelector(".message");
// Hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");
// Starting word to test game
const word = "magnolia";
// Array to contain all the letters the player guesses
const guessedLetters = [];

// Function to add placeholders for each letter
const placeholders = function (guessWord) {
    let placeArr = []; 
    for(let letter of guessWord) {
        placeArr.push("●");
    }
    // console.log(placeArr);
    
    // Merge circles to one "word"
    circleWord = placeArr.join("");
    return circleWord;
}
// wordInProgress.innerText = placeArr.join("");
// console.log(wordInProgress);

// Event listener for Guess button
guessButton.addEventListener("click", function (e) {
    // Prevent default action of form submitting, then reloading page
    e.preventDefault();

    // Inside the event handler function for the Guess button,
    // empty the text of the message element.
    message.innerText = "";
    
    // Variable to capture the value of the input
    inputValue = input.value;
    console.log(inputValue);

    // Clear value of input
    input.value = "";
    // inputValue = input.value;
    // console.log(inputValue);

    // At the bottom of the event handler, call the function you 
    // made that checks the input, and pass it the input value as 
    // an argument. 
    // Save the result of this function call to a variable and 
    // log it out to the console.
    let validatedInput = validateInput(inputValue);
    //   console.log(`validatedInput: ${validatedInput}`);

    // Make sure that the variable mapped to the result of the 
    // function validates that the player’s input is returning a 
    // letter (as opposed to “undefined”). 
    // If it’s returning a letter, pass it as an argument to your 
    // makeGuess function.
    if (validatedInput) {
        console.log(`validatedInput: ${validatedInput}`);
        makeGuess(validatedInput);
    } else {
        console.log("### Not validated input -- not guessing ###")
    }
        
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
}
// console.log(`"" : ${validateInput("")}`);
// console.log(`aa : ${validateInput("aa")}`);
// console.log(`9 : ${validateInput("9")}`);
// console.log(`a : ${validateInput("a")}`);
// console.log(`Z : ${validateInput("Z")}`);

// function to capture input
const makeGuess = function (letter) {
    let upperCaseLetter = letter.toUpperCase();
    console.log(`Letter: ${upperCaseLetter}`);
    if (guessedLetters.includes(upperCaseLetter)) {
        console.log(`### ${letter} already guessed ###`);
        message.innerText = 
            "You already guessed that letter - try again";
    } else {
        guessedLetters.push(upperCaseLetter);
    }
    console.log(`Guessed letters: ${guessedLetters}`);
}
