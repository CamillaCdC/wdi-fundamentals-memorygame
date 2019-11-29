var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];

var cardsInPlay = [];

// Array to store card Id's to check if the user is clicking the same card twice
var cardDataId = [];

// win and loss arrays used to track score
var win = [];
var loss = [];

function createBoard () {
	for (var i = 0; i < cards.length; i ++) {
		var cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", i);
		cardElement.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(cardElement);
	}
	// Reset
	var resetButton = document.getElementById("reset");
	resetButton.addEventListener("click", reset);
}

function checkForMatch () {
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0] === cardsInPlay[1]) {
			alert("You found a match!");
			// push win result to win array
			win.push("1");
		} else {
			alert("Sorry, try again.");
			// push loss result to loss array
			loss.push("1");
		}
	}
	// Calculate score
	score();
}



function flipCard () {
	// add rule so ony two cards can be flipped
	if (cardsInPlay.length === 2) {
		alert("You've already flipped two cards. Please reset the game.");
	} else {
		var cardId = this.getAttribute("data-id");
		// Check whether the user is clicking the same card twice
		for (var i = 0; i < cardDataId.length; i ++) {
			if (cardId === cardDataId[i]) {
				alert("You can't select the same card twice");
				return;
			}
		}
		cardDataId.push(cardId);
		console.log("User flipped " + cards[cardId].rank);
		console.log(cards[cardId].cardImage);
		console.log(cards[cardId].suit);
		cardsInPlay.push(cards[cardId].rank);
		this.setAttribute("src", cards[cardId].cardImage);
		checkForMatch();
	}
}

// Function to calculate score
function score () {
	var winNo = win.length;
	var lossNo = loss.length;
	document.getElementById("win").innerHTML = winNo;
	document.getElementById("loss").innerHTML = lossNo;
}

// Function to reset game
function reset () {
	// Reset cardsInPlay & cardDataId array
	cardsInPlay.length = 0;
	cardDataId.length = 0;
	// Reset card image to be back.ng
	var cardReset = document.querySelectorAll("img");
	for (var i = 0; i < cardReset.length; i++) {
		cardReset[i].setAttribute("src", "images/back.png")
	}
	console.log("RESET");
}

createBoard();