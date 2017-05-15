

var wordLibrary=["bratwurst", "hotdog", "knockwurst", "polish", "andouille", "italian", "chorizo"];
var userInput = null;
var userGuesses=[];
var newWordArray=[];
var hiddenWordArray=[];
var incorrectGuessesArray=[];
var guessesLeft=10;
var wins=0;

//get random word from the library and initialize newWordArray, hiddenWordArray
randomWord(wordLibrary.length);
//show the hidden word length to user based on the radom word chosen from the library
showHiddenWord();

//get user input
document.onkeyup = function(event) {
    userInput = event.key;
    userGuesses.push(userInput);
    document.getElementById("lastGuess").innerHTML= userInput;
    //check user guess and update hidden wordArray
    checkLetter(userInput);
    //show hidden word to user with any letters that have been guessed correctly.
    showHiddenWord();
    showGuesses();
    guessesLeft--;
}

function randomWord(arrayLength){
	//calculate a random index of the wordLibrary to identify a random word for the game
	var randomIndex = Math.floor(Math.random()*arrayLength);
	var newWord = wordLibrary[randomIndex];
	newWordArray = newWord.split("");
	document.getElementById("mysteryWord").innerHTML = "mystery word is: " + wordLibrary[randomIndex];
	//initialize a "hidden word" array with "-" values as placeholders
	//"-" values will be replaced as the user begins to make correct guesses
	for (var i=0;i<newWordArray.length;i++){
		console.log(newWordArray[i]);
		hiddenWordArray.push("-");
	}
}

function checkLetter(input){
	var matched=0;
	//check user input value against all the elements in the mystery word.
	for (var i=0;i<newWordArray.length;i++){
		if (userInput===newWordArray[i]){
			hiddenWordArray[i]=userInput;
			//if any letter matches the guess, update the value of matched so that we do not add to the incorrect guesses array
			matched=1;
		}
	}
	console.log(matched);
	//update the array of incorrect guesses with the user input
	if (matched === 0){
		incorrectGuessesArray.push(userInput + " ");
	}	
}


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