/*
1. [Watch the demo](https://youtu.be/W-IJcC4tYFI).
2. Choose a theme for your game! In the demo, we picked an 80s theme: 80s questions, 80s sound and an 80s aesthetic. You can choose any subject for your theme, though, so be creative!
3. Use key events to listen for the letters that your players will type.
4. Display the following on the page:
5. Press any key to get started!
6. Wins: (# of times user guessed the word correctly).
   * If the word is `madonna`, display it like this when the game starts: `_ _ _ _ _ _ _`.
   * As the user guesses the correct letters, reveal them: `m a d o _  _ a`.
7. Number of Guesses Remaining: (# of guesses remaining for the user).
8. Letters Already Guessed: (Letters the user has guessed, displayed like `L Z Y H`).
9. After the user wins/loses the game should automatically choose another word and make the user play it.

##### Word Guess Game Bonuses

1. Play a sound or song when the user guesses their word correctly, like in our demo.
2. Write some stylish CSS rules to make a design that fits your game's theme.
3. **HARD MODE:** Organize your game code as an object, except for the key events to get the letter guessed. This will be a challenge if you haven't coded with JavaScript before, but we encourage anyone already familiar with the language to try this out.
4. Save your whole game and its properties in an object.
5. Save any of your game's functions as methods, and call them underneath your object declaration using event listeners.
6. Don't forget to place your global variables and functions above your object.
   * Remember: global variables, then objects, then calls.
7. Definitely talk with a TA or your instructor if you get tripped up during this challenge.

*/

var wordBank = ["sasquatch", "nessie", "chupacabra", "bigfoot", "loch ness", "unicorn",
"aliens", "bat boy", "poltergeist", "the jersey devil", "yeti", "kraken", "lizard man",
"mothman", "slenderman", "quetzalcoatl"];

// Global variables for hooking into DOM elements
splashScreen =          document.getElementById("splash-screen");
gameScreen =            document.getElementById("game-screen");
winScreen =             document.getElementById("win-screen");
lostScreen =            document.getElementById("lost-screen");
winsText =              document.getElementById("wins");
lossesText =            document.getElementById("losses");
guessesLeftText =       document.getElementById("guesses-left");
lettersGuessedText =    document.getElementById("letters-guessed");
hiddenWordText =        document.getElementById("hidden-word");

// GAME OBJECT
var wordGuessGame = {

    // INIT - Game Entry Point --- This is the first function to fire when the page loads
    init: function() {

        // Show div/splash screen
        splashScreen.style.display = "block";
        wordGuessGame.continue();
    },

    // Created helper function to replace single character in a string as strings are immutable in JS
    replaceChar: function (inputStr, inputChar, charPos) {
        var splitArr = inputStr.split("");
        splitArr[charPos] = inputChar;
        return splitArr.join().replace(/,/g, "");
    },

    // START - Game Logic
    start: function() {
        
        // Show game screen
        gameScreen.style.display = "block";

        // Game object property setup
        this.wins = 0;
        this.losses = 0;
        this.guessesLeft = 12;
        this.lettersGuessed = [];
        this.wordSelection = wordBank[Math.floor((Math.random() * wordBank.length))];
        this.hiddenLetters = [];
        this.hiddenWordArray = wordGuessGame.wordSelection.split("");
        
        // Push re-initialized game stats to the DOM
        winsText.textContent =              wordGuessGame.wins;
        lossesText.textContent =            wordGuessGame.losses;
        guessesLeftText.textContent =       wordGuessGame.guessesLeft;
        lettersGuessedText.textContent =    wordGuessGame.lettersGuessed;

        // Push the wordSelection to console for testing purposes
        console.log("Psst! The secret word is: " + wordGuessGame.wordSelection);
        
        // hiddenLetters property now represented as wordSelection with letters replaced by underscores. Used regex...
        wordGuessGame.hiddenLetters = wordGuessGame.wordSelection.replace(/[a-z]/g, "_");
        
        // Send hiddenLetters to DOM, hiddenLetters is currently a string at this point
        hiddenWordText.textContent = wordGuessGame.hiddenLetters;

        // Capture user keypress event
        document.onkeyup = function(event) {

            // User loses game if out of guesses
            if (wordGuessGame.guessesLeft === 0) {
                wordGuessGame.lost();
            }
            
            // If letter pressed was not previously guessed...
            if (wordGuessGame.lettersGuessed.includes(event.key) === false) {
                
                // Add letter to list of lettersGuessed
                wordGuessGame.lettersGuessed.push(event.key);

                // Decrement guessesLeft
                wordGuessGame.guessesLeft--;

                // Push update of guessesLeft to the DOM
                guessesLeftText.textContent = wordGuessGame.guessesLeft;

                // Next, if the letter pressed occurs in the current word selection...
                if (wordGuessGame.wordSelection.includes(event.key)) {

                    // Iterate over the current word selected, and replace the corresponding
                    // character position in the hiddenLetters string...
                    for (var i = 0; i < wordGuessGame.wordSelection.length; i++){
                        // Nested condition to replace "_" character with the user's keypress if occuring in the wordSelection
                        if (wordGuessGame.wordSelection.charAt(i) === event.key){
                            wordGuessGame.hiddenLetters = wordGuessGame.replaceChar(wordGuessGame.hiddenLetters, event.key, i);
                        } 
                    } 

                    // Then, push the updated hiddenLetters to the DOM
                    hiddenWordText.textContent = wordGuessGame.hiddenLetters;
                    
                    // Lastly, check if all letters have been guessed (winner!)
                    if (wordGuessGame.hiddenLetters.includes("_") === false) {
                        wordGuessGame.win();
                    }
        
                }
            }
            // Update lettersGuessed already to the DOM
            wordGuessGame.lettersGuessedText.textContent = wordGuessGame.lettersGuessed;
        }
    },

    // WINNER! - Executes when all letters guessed before guesses left gets to 0
    win: function() {
        wordGuessGame.wins += 1;
        gameScreen.style.display = "none";
        winScreen.style.display = "block";
        // Play win sound here...
        wordGuessGame.continue();
    },

    // YOULOSE! - Executes if guessesLeft gets to 0 and array still contains "_" chars
    lost: function() {
        wordGuessGame.losses += 1;
        gameScreen.style.display = "none";
        lostScreen.style.display = "block";
        // Play lost sound here...
        wordGuessGame.continue();
        
    },

    // CONTINUE? - Press spacebar to begin a new game cycle
    continue: function() {
        document.onkeyup = function(event){

            // Event listener for spacebar
            if(event.keyCode === 32){
                splashScreen.style.display = "none";
                winScreen.style.display = "none";
                lostScreen.style.display = "none"
                // Play continue sound here...
                wordGuessGame.start();
            }
        }
    }
}

wordGuessGame.init();