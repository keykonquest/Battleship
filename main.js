//Declare 3 variables for ship
var bow = Math.floor(Math.random() * 5);
var hull = bow + 1;
var stern = hull + 1;

var guess;
var hits = 0;
var guesses = 0;

var shipSunk = false;

while (!shipSunk) {
    guess = prompt("Enter your launch coordinate (0-6)");
    // Check if guess is valid
    if (guess < 0 || guess > 6) {
        alert("Please enter a number 0-6");
    } else {
        guesses = guesses + 1;
        // Check if guess hits ship
        if (guess == bow || guess == hull || guess == stern) {
            hits = hits + 1;
            alert("Agh! You may have struck me, but you haven't won yet!");
        } else {
            alert("Ha! What are you aiming at?");
        }
        if (hits == 3) {
            shipSunk = true;
            alert("You've sunken my battleship!");
        }

    }
}
var stats = "It took you " + guesses + " shots to sink the ship.\n" + "Accuracy: " + (3/guesses);
alert(stats);
