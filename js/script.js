// Unordered list where player’s guessed letters appear
const guessedLetters = document.querySelector(".guessed-letters");
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

// Function to add placeholders for each letter
const placeholders = function (guessWord) {
    let placeArr = []; 
    for(let i = 0; i < guessWord.length; i++) {
        placeArr[i] = "●";
    }
    // console.log(placeArr);
    
    // Merge circles to one "word"
    circleWord = placeArr.join("");
    return circleWord;
}
wordInProgress = placeholders(word);
// console.log(wordInProgress);

// Event listener for Guess button
guessButton.addEventListener("click", function (e) {
    // Prevent default action of form submitting, then reloading page
    e.preventDefault();

    // Variable to capture the value of the input
    inputValue = input.value;
    console.log(inputValue);

    // Clear value of input
    input.value = "";
    // inputValue = input.value;
    // console.log(inputValue);
});