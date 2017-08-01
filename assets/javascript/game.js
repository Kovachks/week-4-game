$(document).ready(function(){

/*
generate random number for computer guess between 19 - 120 - Done
create a div for the player score - Done
create a div which counts total losses/wins and log each win/loss
create if statement related to onclick events associated with each image
generate a random number for each image and give it that attribute - done
create on click events for each image with a random number generator between 1-12
*/

//*****Variables

//Container to hold computers score
var computerGuess = 0;

//contains image array
var urls = ["assets/images/donatello.jpg", "assets/images/leonardo.jpg", "assets/images/michelangelo.jpg", "assets/images/raphael.jpg"]

//Array for all image values
var imageValues = [];

//Container to hold wins
var wins = 0;

//Container to hold losses
var losses = 0;

//Counter to hold user score
var userScore = 0;

//*****Functions

//Generating computers guess.
function computerGuessGen() {
	return Math.floor(Math.random() * 101) + 19;
};

//Generating values for each image
function imageValue() {
	return Math.floor(Math.random() * 12) + 1;
}

//Initiates loop for image creation and value assigning
function imageGen() {
	for (var i = 0; i < 4; i += 1) {
		
		//Generates values for image array
		imageValues[i] = imageValue();
		console.log(imageValues)
		//Creates image container for new image
		var turtleImg = $("<img>");

		//adds turtle_image class for formating
		turtleImg.addClass("turtle_image");

		//adds url for each individual image from url array
		turtleImg.attr("src", urls[i]);

		//assigning each individual data attribue
		turtleImg.attr("data", imageValues[i]);

		//adding image to container designatted for game
		$("#imageContainer").append(turtleImg);
	}
}

//Reset images for next game
function imageReset () {
	$(".turtle_image").remove();
}


//*****Start of code Execution

//Generating computer guess on page load
computerGuessValue = computerGuessGen();
console.log(computerGuessValue);

//Posting computer guess to computer guess div
$("#computerGuess").html(computerGuessValue);

//Generating images
imageGen();

	$(document).ready(function mainGame(){

		//Start of onclick function for game execution
		$(".turtle_image").on("click", function (){
			
			//ripping out the value of the data attribute as a string value
			var turtleValue = ($(this).attr("data"));

			//changing that string value to a numerical value
			turtleValue = parseInt(turtleValue);

			//updating the userscore with the value taken from above
			userScore += turtleValue;

			//posting that updated score to the html of the page
			$("#userScore").html(userScore);

			//check to see if the user won the game
			if (userScore === computerGuessValue) {
				wins = wins + 1;
				
				$("#alert").html("You win!")

				//Reset the game after a win
				computerGuessValue = computerGuessGen();
				userScore = 0;
				$("#userScore").html(userScore)
				$("#computerGuess").html(computerGuessValue);
				imageReset();		
				imageGen();
				mainGame();

			//check to see if the user won the game
			} else if (userScore >= computerGuessValue) {
				losses = losses + 1;
				
				$("#alert").html("You lose!")

				//Reset the game after a loss
				computerGuessValue = computerGuessGen();
				userScore = 0;
				$("#userScore").html(userScore)
				$("#computerGuess").html(computerGuessValue);
				imageValues = [];
				imageReset();
				imageGen();
				mainGame();
			}

		})
			$("#win").html("Wins: " + wins);
			$("#lose").html("Losses: " + losses);
	})
})