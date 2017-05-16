

var wordLibrary=["andouille", "bratwurst", "chorizo", "hotdog", "italian", "merguez", "polish", "salami"];
var userInput = null;
var userGuesses=[];
var newWord;
var newWordArray=[];
var hiddenWordArray=[];
var incorrectGuessesArray=[];
var guessesLeft=5;
var wins=0;
var losses=0;
var correctCount=0;
var gameComplete=true;
var validInput=true;


//listen for user inputs
document.onkeyup = function(event) {
    userInput = event.key;
    //validate input before running game functions.
    validateInput();
    //if game in progress
    if (gameComplete===false){
    	//check to see if user input has been guessed in this game.
    	if(validInput){
    		checkLetter();
	    	//show hidden word to user with any letters that have been guessed correctly.
	    	showHiddenWord();
	    	showGuesses();
    	}
    }
    //if game over and user requests new game
    else{
    	gameComplete=false;
    	//set up document with new random word
    	resetDocument();
    }
}

//this function resets the document and variables for a fresh game.
function resetDocument(){
	correctCount=0;
	guessesLeft=5;
	hiddenWordArray.length=0;
	userGuesses.length=0;
	incorrectGuessesArray.length=0;
	document.getElementById("mysteryWord2").innerHTML = "";
	//get random word from the library and initialize newWordArray, hiddenWordArray
	randomWord(wordLibrary.length);
	//show the hidden word length to user based on the radom word chosen from the library
	showHiddenWord();
	document.getElementById("isWinner").innerHTML= "";
	document.getElementById("gameStatus").innerHTML ="Guess a letter";
	document.getElementById("lastGuess").innerHTML= "";
	document.getElementById("sausagePhoto").src= "assets/images/sausages-default.jpg";
}

function randomWord(arrayLength){
	//calculate a random index of the wordLibrary to identify a random word for the game
	var randomIndex = Math.floor(Math.random()*arrayLength);
	newWord = wordLibrary[randomIndex];
	newWordArray = newWord.split("");
	//document.getElementById("mysteryWord").innerHTML = "mystery word is: " + wordLibrary[randomIndex];
	//initialize a "hidden word" array with "-" values as placeholders
	//"-" values will be replaced as the user begins to make correct guesses
	for (var i=0;i<newWordArray.length;i++){
		hiddenWordArray.push("_");
	}
}

function checkLetter(input){

	var matched=0;
	userGuesses.push(userInput);
	

	//check user input value against all the elements in the mystery word.
	for (var i=0;i<newWordArray.length;i++){
		if (userInput===newWordArray[i]){
			hiddenWordArray[i]=userInput;
			//if any letter matches the guess, update the value of matched so that we do not add to the incorrect guesses array
			matched=1;
			correctCount++;
		}

	}
	//update the array of incorrect guesses with the user input
	if (matched === 0){
		incorrectGuessesArray.push(userInput + " ");
		guessesLeft--;
	}
	//after updating the mystery word and/or guess count, determine if user is a winner
	isWinner();
}

//this function checks each user input and compares it will all other elements in the guesses array.
//if the input has been guessed, prompts user with warning message
function validateInput(){
	//if input has not been entered.
	if (userGuesses.indexOf(userInput) === -1){
		validInput=true;
		document.getElementById("gameStatus").innerHTML ="Guess a Letter";
	}
	//if input has already been guessed during the game.
	else{
		document.getElementById("gameStatus").innerHTML ="Letter has already been guessed, try a different input";
		validInput = false;
	}
}

//this function shows whatever letters have been correctly guessed in the mystery word and where they are in the word
function showHiddenWord(){
	var hiddenWordString = "";
	//convert the hidden word array into a string so that the user knows how long the word is and what elements have been guessed correctly.
	for (var i=0;i<hiddenWordArray.length;i++){
		hiddenWordString += hiddenWordArray[i]+ " ";
	}
	document.getElementById("mysteryWord2").innerHTML = hiddenWordString;
}


function showGuesses(){
	//display the incorrect guesses made by the user along with the number of guesses remaining
	var incorrectGuesses=incorrectGuessesArray.join("");
	document.getElementById("guesses").innerHTML = "Incorrect guesses: " + incorrectGuesses +" ";
	document.getElementById("guessesLeft").innerHTML = "Guesses left: " + guessesLeft;
}

//this function checks to see if the user has guessed the word correctly or if they are out of guesses before allowing play to continue
function isWinner(){
	if(correctCount===newWordArray.length){
		document.getElementById("isWinner").innerHTML= "Winner!";
		document.getElementById("gameStatus").innerHTML ="Press any key to play again";
		wins++;
		document.getElementById("winsCount").innerHTML= "wins: "+ wins;
		document.getElementById("sausagePhoto").src= "assets/images/"+ newWord +".jpg";
		gameComplete=true;
	}
	else if(guessesLeft===0){
		document.getElementById("isWinner").innerHTML= "Loser!";
		document.getElementById("gameStatus").innerHTML ="Press any key to play again";
		gameComplete=true;
		losses++;
		document.getElementById("lossesCount").innerHTML= "losses: "+ losses;
	}
	else{
	    document.getElementById("lastGuess").innerHTML= userInput;
	}
}