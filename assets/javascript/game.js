var wordBank = ["sasquatch", "nessie", "chupacabra", "bigfoot", "vampire", "unicorn",
"aliens", "bat boy", "poltergeist", "the jersey devil", "yeti", "kraken", "lizard man",
"mothman", "slenderman", "quetzalcoatl", "illuminati", "area 51", "ghost", "greys"];

// Experiment creating a wordBank object holding key/value pairs (wordSelection:hint)
// Not enough time to refactor to implement into game... maybe next time lol
// var wordBank2 = {
//     sasquatch: "Lotsa hair..." ,
//     nessie: "Big lake...",
//     vampire: "Now accepting blood donors..."
// };

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
revealTextLost =        document.getElementById("reveal-text-lost");
revealTextWin =         document.getElementById("reveal-text-win");

//Global variables for sound effects
var gameOverSound = new Audio("assets/sounds/242503__gabrielaraujo__failure-wrong-action.mp3");
var gameWinSound = new Audio("assets/sounds/448274__henryrichard__sfx-success.mp3");
var gameBgSound = new Audio("assets/sounds/130591__keplar__tangible-darkness.mp3");
var guessGood = new Audio("assets/sounds/383593__newagesoup__bicycle-bell-04.mp3");


// GAME OBJECT
var wordGuessGame = {

    // INIT - Game Entry Point --- This is the first function to fire when the page loads
    init: function() {

        // Vars to start tracking wins and losses
        this.wins = 0;
        this.losses = 0;

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

        // Start background music
        gameBgSound.loop = true;
        gameBgSound.play();

        // Game object property setup/reset
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

                    // Play success sound!
                    guessGood.play();
                    
                    // Lastly, check if all letters have been guessed (winner!)
                    if (wordGuessGame.hiddenLetters.includes("_") === false) {
                        wordGuessGame.win();
                    }
        
                }
            }
            // Update lettersGuessed already to the DOM
            lettersGuessedText.textContent = wordGuessGame.lettersGuessed;
        }
    },

    // WINNER! - Executes when all letters guessed before guesses left gets to 0
    win: function() {
        wordGuessGame.wins += 1;
        gameScreen.style.display = "none";
        winScreen.style.display = "block";
        revealTextWin.textContent = wordGuessGame.wordSelection;
        gameBgSound.pause();
        gameWinSound.play();
        wordGuessGame.continue();
    },

    // YOULOSE! - Executes if guessesLeft gets to 0 and array still contains "_" chars
    lost: function() {
        wordGuessGame.losses += 1;
        gameScreen.style.display = "none";
        lostScreen.style.display = "block";
        revealTextLost.textContent = wordGuessGame.wordSelection;
        gameBgSound.pause();
        guessBad.play();
        wordGuessGame.continue();
        
    },

    // CONTINUE? - Press spacebar to begin a new game cycle
    continue: function() {
        document.onkeyup = function(event){

            // Event listener for spacebar
            if(event.keyCode === 32){
                splashScreen.style.display = "none";
                winScreen.style.display = "none";
                lostScreen.style.display = "none";
                // Play continue sound here...
                wordGuessGame.start();
            }
        }
    }
}

wordGuessGame.init();