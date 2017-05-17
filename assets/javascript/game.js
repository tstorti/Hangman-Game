

var game = {
	wordLibrary: ["andouille", "bratwurst", "chorizo", "hotdog", "italian", "merguez", "polish", "salami"],
	userInput: null,
	userGuesses: [],
	gameWord: null, 
	gameWordArray: [],
	hiddenWordArray: [],
	incorrectGuessesArray: [],
	guessesLeft: 6,
	wins: 0,
	losses: 0,
	correctCount: 0,
	gameComplete: true,
	validInput: true, 

	//this function resets the document with a new word and prompts the user to guess a new word. Note that the function will not affect the wins, losses count	
	resetDocument: function(){
		this.correctCount=0;
		this.guessesLeft=6;
		this.hiddenWordArray.length=0;
		this.userGuesses.length=0;
		this.incorrectGuessesArray.length=0;
		document.getElementById("gameWord").innerHTML = "";
		//get random word from the library and initialize gameWordArray, hiddenWordArray
		this.randomWord(this.wordLibrary.length);
		//show the hidden word length to user based on the radom word chosen from the library
		this.showHiddenWord();
		//reset document HTML elements to clear old game output
		document.getElementById("isWinner").innerHTML= "";
		document.getElementById("gameStatus").innerHTML ="Guess a letter";
		document.getElementById("lastGuess").innerHTML= "Last Guess: ";
		document.getElementById("sausagePhoto").src= "assets/images/sausages-default.jpg";
	},

	//this function pulls a random word from the word library.  The wordLibrary array length is left as a function argument so addional words can be added flexibly. Note images for new words would need to be added to the library to prevent errors in isWinner function
	randomWord: function(arrayLength){
		//calculate a random index of the wordLibrary to identify a random word for the game
		var randomIndex = Math.floor(Math.random()*arrayLength);
		this.gameWord = this.wordLibrary[randomIndex];
		//initialize array with new word so guesses can be checked against each letter
		this.gameWordArray = this.gameWord.split("");
		//initialize a "hidden word" array with "-" values as placeholders
		//"-" values will be replaced as the user begins to make correct guesses
		for (var i=0;i<this.gameWordArray.length;i++){
			this.hiddenWordArray.push("_");
		}
	},

	//this function checks new user guesses against the current gameword
	checkLetter: function(){
		var matched=0;
		//adds most recent input to the userGuesses array
		this.userGuesses.push(this.userInput);
		//check user input value against all the elements in the game word.
		for (var i=0;i<this.gameWordArray.length;i++){
			if (this.userInput===this.gameWordArray[i]){
				//if matches, replace the '_' with guessed letter
				this.hiddenWordArray[i]=this.userInput;
				//if any letter matches the guess, update the value of matched so that we do not add to the incorrect guesses array
				matched=1;
				//correct count is used to determine when the user has guessed all letters in gameWord
				this.correctCount++;
			}
		}
		//update the array of incorrect guesses with the user input
		if (matched === 0){
			//if guess matches no letters, add a letter to the wrong guesses array to be displayed
			this.incorrectGuessesArray.push(this.userInput + " ");
			//only reduce guess count if an incorrect guess
			this.guessesLeft--;
		}
		//after updating the game word and/or guess count, determine if user is a winner
		this.isWinner();
	},

	//this function checks each user input and compares it will all other elements in the guesses array. if the input has been guessed, prompts user with warning message
	validateInput: function(){
		//if input has not yet been guessed by user, set validInput to true and change game status message
		if (this.userGuesses.indexOf(this.userInput) === -1){
			this.validInput=true;
			document.getElementById("gameStatus").innerHTML ="Guess a Letter";
		}
		//if input has already been guessed during the game prompt user to try another input
		else{
			document.getElementById("gameStatus").innerHTML ="Letter has already been guessed, try a different input";
			this.validInput = false;
		}
	},

	//this function shows whatever letters have been correctly guessed in the game word and where they are in the word
	showHiddenWord: function(){
		var hiddenWordString = "";
		//convert the game word array into a string for display
		//user needs to see how long the word is and what elements have been guessed correctly.
		for (var i=0;i<this.hiddenWordArray.length;i++){
			hiddenWordString += this.hiddenWordArray[i]+ " ";
		}
		document.getElementById("gameWord").innerHTML = hiddenWordString;
	},

	showGuesses: function(){
		//display the incorrect guesses made by the user along with the number of guesses remaining
		var incorrectGuesses=this.incorrectGuessesArray.join("");
		document.getElementById("guesses").innerHTML = "Incorrect guesses: " + incorrectGuesses +" ";
		document.getElementById("guessesLeft").innerHTML = "Guesses left: " + this.guessesLeft;
	},

	//this function checks to see if the user has guessed the word correctly or if they are out of guesses before allowing play to continue
	isWinner: function(){
		//if correct guesses count matches gameWord length, then user is a winner.  update html for new game prompt and add to wins variable.
		if(this.correctCount===this.gameWordArray.length){
			document.getElementById("isWinner").innerHTML = "Winner!";
			document.getElementById("gameStatus").innerHTML ="Press any key to play again";
			this.wins++;
			document.getElementById("winsCount").innerHTML = "wins: "+ this.wins;
			document.getElementById("sausagePhoto").src = "assets/images/"+ this.gameWord +".jpg";
			document.getElementById("winSoundClip").innerHTML ="<audio src=\"assets/audio/sausageking.mp3\" autoplay></audio>";
			this.gameComplete=true;
		}
		//if user runs out of guesses, they lose.  update html for a new game and add to losses count.
		else if(this.guessesLeft===0){
			document.getElementById("isWinner").innerHTML = "Loser!";
			document.getElementById("gameStatus").innerHTML = "Press any key to play again";
			this.gameComplete=true;
			this.losses++;
			document.getElementById("lossesCount").innerHTML = "losses: " + this.losses;
		}
		//if user still has guesses and has not correctly identified word
		else{
		    document.getElementById("lastGuess").innerHTML = "Last Guess: " + this.userInput;
		}
	}

};

//listen for user inputs
document.onkeyup = function(event) {
    //for each input, set userInput variable and run game functions.
    game.userInput = event.key;
    //if game in progress
    if (game.gameComplete===false){
    	//check to see if user input has been guessed in this game.
    	game.validateInput();
     	if(game.validInput){
    		game.checkLetter();
	    	//show hidden word to user with any letters that have been guessed correctly.
	    	game.showHiddenWord();
	    	//update guesses with last guessed value, guesses left, and any incorrect values
	    	game.showGuesses();
    	}
    }
    //if game over and user requests new game reset the document and change gameComplete status to false so a key input is needed to start a new game
    else{
    	game.gameComplete=false;
    	//set up document with new random word
    	game.resetDocument();
    }
}

