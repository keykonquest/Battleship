//Declare 3 variables for ship

var guess;
var hits = 0;
var guesses = 0;

var shipSunk = false;

while (shipSunk == false) {
    guess = prompt("Enter your launch coordinate (0-6)");
    // Check if guess is valid
    if (guess != valid) {
        alert("Please enter a number 0-6");
    } else {
        guesses = guesses + 1;
        // Check if guess hits ship
        if (guess == hit) {
            hits = hits + 1;
        }
        if (hits == 3) {
            shipSunk = True;
            alert("You've sunken my battleship!")
        }
    }
}