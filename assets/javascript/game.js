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

/*
--== Pseudocode ==--
1. Display "Press any key to get started" -- div - display: none?
2. On keypress, remove start screen and reveal game screen
3. Get user keypress event
4. Store keypress in variable

wordGuessGame
    .start
        Reset stats, Display start screen, pick random word from array
    .win
        Increment win stat, display win screen
    .lost
        Decrement win stat (if > 0), display lost screen

Vars/Stats:
    Wins (int)
    Number of guesses remaining (int @ 12) 
    Letters already guessed (empty array)
    Possible words (array)
*/
var wordBank = ["sasquatch", "nessie", "chupacabra", "bigfoot", "loch ness", "unicorn",
"aliens", "bat boy", "poltergeist", "the jersey devil", "yeti", "kraken", "lizard man",
"mothman", "slenderman", "quetzalcoatl"];

// Game object
var wordGuessGame = {
    
    // Global variables hooking into DOM elements
    splashScreen:       document.getElementById("splash-screen"),
    gameScreen:         document.getElementById("game-screen"),
    winScreen:          document.getElementById("win-screen"),
    lostScreen:         document.getElementById("lost-screen"),
    winsText:           document.getElementById("wins"),
    guessesLeftText:    document.getElementById("guesses-left"),
    lettersGuessedText: document.getElementById("letters-guessed"),
    hiddenWordText:     document.getElementById("hidden-word"),

    // Init method to begin game logic
    init: function() {
        // Initialize splash screen, spacebar to begin game...
        wordGuessGame.splashScreen.style.display = "block";
        document.onkeyup = function(event){

            if(event.keyCode === 32){
                wordGuessGame.splashScreen.style.display = "none";
                wordGuessGame.gameScreen.style.display = "block";
                wordGuessGame.start();
            }
        }
    },

    // Start method to begin game cycle
    start: function() {
        console.log("Beginning game sequence...");
        
        // Game variable setup
        this.wins = 0;
        this.guessesLeft = 12;
        this.lettersGuessed = [];
        this.wordSelection = wordBank[Math.floor((Math.random() * wordBank.length))];
        this.hiddenWordArray = wordGuessGame.wordSelection.split("");
        
        console.log("Hidden word selection is: " + wordGuessGame.wordSelection);
        
        // Regular expression for letter selection to replace with underscores
        var regex = /[a-z]/;

        // FOR loop to iterate to replace hidden letters with underscores
        for(var i=0; i < wordGuessGame.hiddenWordArray.length; i++) {
            wordGuessGame.hiddenWordArray[i] = wordGuessGame.hiddenWordArray[i].replace(regex, "_");
        }

        // Send hidden word character "_" placeholders to DOM
        wordGuessGame.hiddenWordText.innerText = wordGuessGame.hiddenWordArray;

        // Begin letter keypress & guessing logic
        document.onkeyup = function(event) {
            if (wordGuessGame.guessesLeft == 0) {
                wordGuessGame.lost();
            }
            
            else if (wordGuessGame.lettersGuessed.includes(event.key) === false) {
                wordGuessGame.lettersGuessed.push(event.key);
                wordGuessGame.guessesLeft--;
                wordGuessGame.guessesLeftText.innerText = wordGuessGame.guessesLeft;

                if (wordGuessGame.wordSelection.includes(event.key)) {
                    wordGuessGame.hiddenWordArray[wordGuessGame.wordSelection.indexOf(event.key)] = event.key;
                    wordGuessGame.hiddenWordText.innerText = wordGuessGame.hiddenWordArray;
                }
            }
            wordGuessGame.lettersGuessedText.innerText = wordGuessGame.lettersGuessed;
        }
    },

    win: function() {},
    lost: function() {
        wordGuessGame.gameScreen.display = "none";
        wordGuessGame.lostScreen.display = "static";
    }
}

wordGuessGame.init();